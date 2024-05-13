import { Duplex } from 'node:stream'

const inputStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback()
    },
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.fromCharCode > 90) {
            this.push('\n')
            this.push(null)
        }
    },

    
})

inputStream.currentCharCode = 65;

process.stdin.pipe(inputStream).pipe(process.stdout)