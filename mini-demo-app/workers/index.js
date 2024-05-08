import express from 'express'

import { Worker } from 'node:worker_threads'


const app = express();

const port = process.env.PORT || 3000;

app.get('/non-blocking', (req, res) => {
    res.status(200).send('This page is non-blocking')
})

app.get('/blocking', async (req, res) => {
    const worker = new Worker(new URL('./worker.js', import.meta.url))

    worker.on('message', (result) => {
        res.status(200).send(`Result is ${result}`)
    })

    worker.on('error', (err) => {
        res.status(404).send(`An error occurred ${err}`)
    })

})

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})