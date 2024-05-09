import { spawn } from "child_process";

const child = spawn('node', ['./child.js'], {
    stdio: ['pipe', 'pipe','pipe']
})

child.stdin.write('Hello from parent')
child.stdin.end()