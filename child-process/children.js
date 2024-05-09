process.on('message', (msg) => {
    console.log(`Message from parent: `, msg);
})

let counter = 0;

const interval = setInterval(() => {
    process.send({counter: counter++})
}, 1000);

setTimeout(() => {
    clearInterval(interval)
}, 10000);