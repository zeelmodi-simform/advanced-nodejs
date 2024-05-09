import { fork } from 'child_process';
import http from 'http'

const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i
        
    }
    return sum;
}

const server = http.createServer()

server.on('request', (req, res) => {
    if (req.url === '/compute') {
        // const sum = longComputation()
        // return res.end(`Sum is ${sum}`)

        const compute = fork(new URL('./compute.js', import.meta.url))
        compute.send('start');

        compute.on('message', (message) => {
            res.end(`The sum is ${message}`)
        })
    }
    else {
        return res.end('Ok')
    }
})

server.listen(3001)