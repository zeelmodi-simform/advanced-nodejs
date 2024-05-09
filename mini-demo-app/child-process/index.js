import {exec,execFile,spawn, fork} from 'child_process'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'


const __dirname = dirname(fileURLToPath(import.meta.url))

// exec
// exec('ls -lh', (error,stdout,stderr) => {
//     if(error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }

//     if(stderr) {
//         console.log(`stderr: ${stderr}`);
//         return
//     }

//     console.log(`stdout: \n ${stdout}`);
// })

// execFile
// const fileProcessorPath = path.resolve(__dirname, './execFileProcessor.js')
// execFile('node', [fileProcessorPath], (error, stdout, stderr) => {
//     if(error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }

//     if(stderr) {
//         console.log(`stderr: ${stderr}`);
//         return
//     }

//     console.log(`stdout: \n ${stdout}`);
// })


// spawn
// const spawnedChild = spawn('find', ['.']);
// spawnedChild.stdout.on('data', (data) => {
//     console.log(`stdout:\n ${data}`);
// })

// spawnedChild.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// })

// spawnedChild.on('error', (err) => {
//     console.log(`error: ${err.message}`);
// })

// spawnedChild.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// })

// fork
const forkedProcessorPath = path.resolve(__dirname, './forkProcessor.js')
const forkedChild = fork(forkedProcessorPath);
forkedChild.on('message', (message) => {
    console.log(`Message from data processor exchange `, message);
})

forkedChild.send({hello: 'world'})