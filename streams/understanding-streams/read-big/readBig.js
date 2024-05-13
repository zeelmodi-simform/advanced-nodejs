import fs from 'node:fs/promises'

(async () => {

    console.time('readBig')

    const fileHandleRead = await fs.open(new URL('../test.txt', import.meta.url), 'r')
    const fileHandleWrite = await fs.open('dest.txt', 'w')

    const streamRead = fileHandleRead.createReadStream({
        highWaterMark: 64 * 1024 // Default one
    });
    const streamWrite = fileHandleWrite.createWriteStream()

    let split= ''

    streamRead.on('data', (chunk) => {
        // console.log('---------');
        // console.log(chunk.length);
        const numbers = chunk.toString('utf-8').split('  ')
        // console.log('------------------');
        // console.log(numbers[numbers.length - 2]);
        // console.log(numbers[numbers.length - 1]);
        // console.log('------------------');

        if (Number(numbers[0]) !== Number(numbers[1] - 1)) {
            if (split) {
                numbers[0] = split.trim() + numbers[0].trim()
            }
        }

        if (Number(numbers[numbers.length - 2] + 1) !== Number(numbers[numbers.length - 1])) {
            split = numbers.pop()   
        }

        // console.log(numbers);

        numbers.forEach((num) => {
            let n = Number(num)
            if (n % 10 === 0) {
                if (!streamWrite.write(` ${n} `)) {
                    streamRead.pause()
                }
            }
        });


        // console.log(numbers);
        // if (!streamWrite.write(chunk)) {
        //     streamRead.pause()
        // }
    })

    streamWrite.on('drain', () => {
        console.log('resuming');
        streamRead.resume()
    })

    streamRead.on('end', () => {
        console.timeEnd('readBig')
        console.log('Done reading!');
    })
    
    // fileHandleRead.close()

})();