import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')

// Minimal PNG encoder — 纯 Node.js，零依赖
function createPNG(width, height, r, g, b) {
  // RGBA pixel data
  const pixels = Buffer.alloc(width * height * 4)
  for (let i = 0; i < width * height; i++) {
    const y = Math.floor(i / width)
    const x = i % width
    const cx = width / 2, cy = height / 2, radius = width * 0.42
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    // Rounded rect approximation
    const inRect = x > width * 0.12 && x < width * 0.88 && y > height * 0.12 && y < height * 0.88
    const inCorner = dist < radius
    const fill = inRect || inCorner

    const offset = i * 4
    pixels[offset] = r
    pixels[offset + 1] = g
    pixels[offset + 2] = b
    pixels[offset + 3] = fill ? 255 : 0
  }

  // Deflate-like: store uncompressed with zlib header
  // Each row: filter byte 0 + raw RGBA
  const rawData = []
  for (let row = 0; row < height; row++) {
    rawData.push(0) // filter: none
    for (let col = 0; col < width; col++) {
      const offset = (row * width + col) * 4
      rawData.push(pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3])
    }
  }
  const raw = Buffer.from(rawData)

  // Simple zlib compress (store method)
  const cmf = 0x78  // deflate, 32K window
  const flg = 0x01  // level 0
  const adler = adler32(raw)
  const zlibData = Buffer.concat([
    Buffer.from([cmf, flg]),
    deflateStore(raw),
    Buffer.from([(adler >> 24) & 0xff, (adler >> 16) & 0xff, (adler >> 8) & 0xff, adler & 0xff])
  ])

  return buildPNGFile(width, height, zlibData)
}

function deflateStore(data) {
  const chunks = []
  let offset = 0
  while (offset < data.length) {
    const len = Math.min(data.length - offset, 0xffff)
    const isLast = offset + len >= data.length
    chunks.push(Buffer.from([isLast ? 1 : 0, len & 0xff, (len >> 8) & 0xff, (~len) & 0xff, (~len >> 8) & 0xff]))
    chunks.push(data.slice(offset, offset + len))
    offset += len
  }
  return Buffer.concat(chunks)
}

function adler32(data) {
  let a = 1, b = 0
  for (let i = 0; i < data.length; i++) {
    a = (a + data[i]) % 65521
    b = (b + a) % 65521
  }
  return (b << 16) | a
}

function buildPNGFile(width, height, idat) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  function chunk(type, data) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const typeB = Buffer.from(type, 'ascii')
    const crc = crc32(Buffer.concat([typeB, data]))
    const crcB = Buffer.alloc(4)
    crcB.writeUInt32BE(crc)
    return Buffer.concat([len, typeB, data, crcB])
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 6  // color type: RGBA
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace

  return Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

// Generate icon: purple (#6366F1) rounded square on transparent bg
writeFileSync(resolve(publicDir, 'icon-192.png'), createPNG(192, 192, 99, 102, 241))
writeFileSync(resolve(publicDir, 'icon-512.png'), createPNG(512, 512, 99, 102, 241))
console.log('Icons generated: icon-192.png, icon-512.png')
