import { execFile } from "child_process";

execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`)
        return
    }

    console.log(`Node.js version: ${stdout}`);
})