const {isMainThread, Worker, parentPort} = require('node:worker_threads')

if(isMainThread) {
    console.log('main thread start...');

    const worker = new Worker(__filename);
    worker.on('message', message => {
        console.log(`Worker: ${message}`);
    });

    console.log('doing some random work in main thread');
}
else {
    parentPort.postMessage('hello from worker thread');

    cpuIntensiveFunction(1000);
    parentPort.postMessage('i am working on something');

    cpuIntensiveFunction(1000);
    parentPort.postMessage('my task is done...!!')
}

function cpuIntensiveFunction(timeInSecond) {
    const end = Date.now() + timeInSecond;
    while(Date.now() < end) {}
}