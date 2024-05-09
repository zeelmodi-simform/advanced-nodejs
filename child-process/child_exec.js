// By default, the spawn function does not create a shell to execute the command we pass into it. 
// This makes it slightly more efficient than the exec function, which does create a shell.
// The exec function has one other major difference.
// It buffers the command’s generated output and passes the whole output value to a callback function (instead of using streams, 
// which is what spawn does).

import { exec } from 'child_process';

exec('find . -type f | wc -l', (error, stdout, stderr) => {
    if (error) {
        console.log(`exec error: ${error}`);
        return
    }

    console.log(`Number of files ${stdout}`);
})