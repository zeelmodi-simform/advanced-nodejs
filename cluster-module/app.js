const http = require('http');
const cluster = require('cluster');
const os = require('os');

const NUM_CPUS = os.cpus().length;

if(cluster.isMaster) {
    for(let i = 0; i < NUM_CPUS; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        if(req.url === '/') {

            for (let i = 0; i < 1e8; i++) {}

            // cluster.worker.kill();
            res.writeHead(200);
            res.end(`Ok.... ${process.pid}`);
        } else {
            res.writeHead(404);
            res.end('Not found\n');
        }
    }).listen(3000);
}
