import { spawn } from "child_process";

const child = spawn('ls', ['-l'])
child.stdout.on('data', (data) => {
    console.log(`Child process output:\n ${data}`)
})

child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`)
})