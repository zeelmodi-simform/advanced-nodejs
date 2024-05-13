import fs from 'node:fs/promises'

// Memory Usage: 1 GB
// Execution Time: 900ms
// (async () => {
//     console.time('copy')
//     const destFile = await fs.open('text-copy.txt', 'w')

//     const result = await fs.readFile(new URL('../test.txt', import.meta.url));

//     await destFile.write(result)

//     console.timeEnd('copy')

// })();

(async () => {
    console.time('copy')
   
    const srcFile = await fs.open(new URL('../test.txt', import.meta.url), 'r')

    const destFile = await fs.open('text-copy.txt', 'w')

    let bytesRead = -1;

    while (bytesRead !== 0) {
        const readResults = await srcFile.read();
        bytesRead = readResults.bytesRead;
    
        console.log(readResults.buffer, readResults.bytesRead);
        if (bytesRead !== 16384) {
            const indexOfNotFilled = readResults.buffer.indexOf(0)
            const newBuffer = Buffer.alloc(indexOfNotFilled)
            readResults.buffer.copy(newBuffer, 0, 0, indexOfNotFilled)
            destFile.write(newBuffer)
        } 
        else {
            destFile.write(readResults.buffer)
        }
    }

    console.timeEnd('copy')

})();