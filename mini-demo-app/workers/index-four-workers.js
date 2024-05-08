import express from 'express'

import { Worker } from 'node:worker_threads'


const app = express();

const port = process.env.PORT || 3000;

const THREAD_COUNT = 4;

function createWorker() {
    return new Promise((resolve,reject) => {
        const worker = new Worker(new URL('./four-workers.js', import.meta.url), {workerData: {thread_count: THREAD_COUNT}})

        worker.on('message', (result) => {
            resolve(result)
        })
    
        worker.on('error', (err) => {
            reject(`An error occurred ${err}`)
        })
    })
}

app.get('/non-blocking', (req, res) => {
    res.status(200).send('This page is non-blocking')
})

app.get('/blocking', async (req, res) => {
   const workerPromises = [];

   for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
   }

   const thread_results = await Promise.all(workerPromises)

   const total = thread_results.reduce((acc, curr) => acc + curr, 0)

   res.status(200).send(`Total is ${total}`)
})

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})