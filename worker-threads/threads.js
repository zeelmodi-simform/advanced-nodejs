const { Worker, isMainThread, workerData } = require('node:worker_threads')

if(isMainThread) {
    console.log(`Main Thread - Process ID: ${process.pid}`);
    new Worker(__filename, {
        workerData: [5,9,3,16,0.9]
    });
    new Worker(__filename, {
        workerData: [15,2.3,-56,25]
    });
}
else {
    console.log(`We are in Worker Thread! - Process ID: ${process.pid}`);
    console.log(`${workerData} sorted is ${workerData?.sort()}`);
}