import { fork } from 'child_process';

const forked = fork(new URL('./children.js', import.meta.url))

forked.on('message', (msg) => {
    console.log(`Message from child: `,msg);
})

forked.send({hello: 'world'})