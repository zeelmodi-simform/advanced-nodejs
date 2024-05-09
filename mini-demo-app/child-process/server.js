import express from 'express'
import { fork } from 'child_process';

const app = express()

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:num', (req, res) => {
    const num = req.params.num

    const child = fork(new URL('./child.js', import.meta.url))

    child.send(num)

    child.on('message', (msg) => {
        console.log(msg);
        res.json(msg)
    })

    child.on('error', (e) => {
        console.log(e);
    })

    child.on('exit', (code) => {
        console.log(`child exited with code ${code}`);
    })

})

app.listen(3000)