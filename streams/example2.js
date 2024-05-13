import http from 'http'
import fs from 'fs'

const server = http.createServer()

server.on('request', (req, res) => {
    const src = fs.createReadStream(new URL('./big.file', import.meta.url))
    src.pipe(res)
})

server.listen(3000)