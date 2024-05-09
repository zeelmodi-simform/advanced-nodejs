import { spawn } from 'child_process';

// const child = spawn('pwd')
// const child = spawn('find', ['.', '-type', 'f']);
const child = spawn('wc')

process.stdin.pipe(child.stdin)


child.stdout.on('data', (data) => {
    console.log(`Child process output: ${data}` );
})


child.on('exit', (code, signal) => {
    console.log(`child process exited with code ${code} and signal ${signal}`);
})