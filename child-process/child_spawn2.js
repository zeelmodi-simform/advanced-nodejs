import { spawn } from 'child_process';

const find = spawn('find', ['.','-type','f'])
const wc = spawn('wc', ['-l'])

find.stdout.pipe(wc.stdin)

wc.stdout.on('data', (data) => {
    console.log(`Number of files ${data}`);
})

// const child2 = spawn('find . -type f | wc -l', {
//     stdio: 'inherit',
//     shell: true,
//     cwd: '/home/zeel/Downloads',
//     env: {ENVIRONMENT: 'dev'}
// });

// child2.unref()

const child3 = spawn('node', [new URL('./timer.js', import.meta.url)], {
    detached: true,
    stdio: 'ignore',
    env: {ANSWER: 43}
})

child3.unref()

// To find if timer is there
// ps -ef | grep timer