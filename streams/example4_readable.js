import { Readable } from 'node:stream'

const inStream = new Readable({
    read() {
    
    }
})

inStream.push('Zeel')
inStream.push('Modi\n')

inStream.push(null) // to signify no more data

inStream.pipe(process.stdout)