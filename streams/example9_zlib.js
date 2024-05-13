import fs from 'fs'
import zlib from 'zlib'

const file = process.argv[2];

fs.createReadStream(file).pipe(zlib.createGzip()).pipe(fs.createWriteStream(file + '.gz'));