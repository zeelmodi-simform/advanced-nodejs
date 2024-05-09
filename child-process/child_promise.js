import util from 'util'
import { exec } from 'child_process';

const execCopy = util.promisify(exec)

async function runCommand(command) {
    try {
        const { stderr, stdout } = await execCopy(command)
        console.log('Output:', stdout);
    } catch (error) {
        console.log('Command Error:', error.message);
    }
}

runCommand('ls -l')