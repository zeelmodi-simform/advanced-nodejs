import fs from 'fs'
import zlib from 'zlib'

const file = process.argv[2];

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .on('data', () => process.stdout.write('.'))
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => console.log('Done'))