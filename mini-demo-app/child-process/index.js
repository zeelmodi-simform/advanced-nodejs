import {exec,execFile,spawn, fork} from 'child_process'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'


const __dirname = dirname(fileURLToPath(import.meta.url))

exec('ls -lh', (error,stdout,stderr) => {
    if(error) {
        console.log(`error: ${error.message}`);
        return;
    }

    if(stderr) {
        console.log(`stderr: ${stderr}`);
        return
    }

    console.log(`stdout: \n ${stdout}`);
})