const {Worker,} = require('node:worker_threads')

const valueRequired = 1000000;

const worker = new Worker('./worker.js', {workerData: {valueRequired}});

worker.once('message', (result) => {
    console.log(result);
})

worker.once('error', (error) => {
    console.error(error);
})

worker.on('exit', (exitCode) => {
    console.log(exitCode);
})

console.log('executed in main thread');