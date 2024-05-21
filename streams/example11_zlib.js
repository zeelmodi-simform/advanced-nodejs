import fs from 'fs'
import zlib from 'zlib'
import {Transform} from 'node:stream'

const file = process.argv[2];

export const reportProgress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write('.');
        callback(null, chunk)
    }
})

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(reportProgress)
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => console.log('Done'))