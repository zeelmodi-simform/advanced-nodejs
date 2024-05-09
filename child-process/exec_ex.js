import { exec } from "child_process";

exec('echo Hello, Developer!', (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error.message}`);
        return
    }

    console.log(`Child Process output:\n${stdout}`);
})