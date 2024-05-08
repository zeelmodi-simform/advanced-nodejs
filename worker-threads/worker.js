const { parentPort, workerData } = require('node:worker_threads')

const timeTakingFunction = (valueRequired) => {
    return 'Executed in the worker thread'
}

parentPort.postMessage(timeTakingFunction(workerData.valueRequired))