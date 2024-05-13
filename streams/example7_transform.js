import { Transform } from 'node:stream';


const upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase())
        callback()
    }
})

process.stdin.pipe(upperCaseTr).pipe(process.stdout)