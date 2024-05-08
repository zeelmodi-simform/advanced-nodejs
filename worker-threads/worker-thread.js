const { parentPort } = require("worker_threads");

let j = 0
for (let i = 0; i < 6e8; i++) {
    j++;
}

parentPort.postMessage(j)