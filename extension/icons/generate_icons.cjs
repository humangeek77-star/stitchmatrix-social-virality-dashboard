// Generates minimal valid PNG files for Chrome Extension icons
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function createPng(width, height) {
  const rowBytes = width * 4 + 1;
  const rawData = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowBytes;
    rawData[rowStart] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pixelStart = rowStart + 1 + (x * 4);
      const isCenter = Math.abs(x - width / 2) < width * 0.28 && Math.abs(y - height / 2) < height * 0.28;
      const isEmerald = x > width * 0.65 && y < height * 0.35;
      
      if (isEmerald) {
        rawData[pixelStart] = 0x10;
        rawData[pixelStart + 1] = 0xB9;
        rawData[pixelStart + 2] = 0x81;
        rawData[pixelStart + 3] = 0xFF;
      } else if (isCenter) {
        rawData[pixelStart] = 0xFF;
        rawData[pixelStart + 1] = 0xFF;
        rawData[pixelStart + 2] = 0xFF;
        rawData[pixelStart + 3] = 0xFF;
      } else {
        rawData[pixelStart] = 0x0F;
        rawData[pixelStart + 1] = 0x17;
        rawData[pixelStart + 2] = 0x2A;
        rawData[pixelStart + 3] = 0xFF;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type);
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    typeBuf.copy(buf, 4);
    data.copy(buf, 8);

    const crc = crc32(Buffer.concat([typeBuf, data]));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

for (const size of [16, 48, 128]) {
  const png = createPng(size, size);
  fs.writeFileSync(path.join(__dirname, `icon${size}.png`), png);
}
console.log('Successfully created extension icons: icon16.png, icon48.png, icon128.png');
