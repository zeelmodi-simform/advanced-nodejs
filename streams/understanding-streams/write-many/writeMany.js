
import fs from 'node:fs/promises';
import { Writable } from 'node:stream';

// let a = 2 + 2;

// (async () => {
//     console.time('writeMany');
//     const fileHandler = await fs.open('test.txt', 'w')
//     for (let i = 0; i < 1e6; i++) {
//       await  fileHandler.write(` ${i} `)
//     }

//     fileHandler.close()
//     console.timeEnd('writeMany');
// })()

// import fs, {open} from 'node:fs'

// (async () => {
//     console.time('writeMany');
//     open('test.txt', 'w', (error, fd) => {
        
//         for (let i = 0; i < 1e6; i++) {
//             const buff= Buffer.from(` ${i} `, 'utf-8')
//             fs.writeSync(fd, buff)
//         }
//     })

//     console.timeEnd('writeMany');
// })()

// NOTE: not a recommended way
// (async () => {
//     console.time('writeMany');
//     const fileHandler = await fs.open('test.txt', 'w')

//     const stream = fileHandler.createWriteStream()

//     for (let i = 0; i < 1e6; i++) {
//         const buff= Buffer.from(` ${i} `, 'utf-8')
//         stream.write(buff)
//     }

//     fileHandler.close()
//     console.timeEnd('writeMany');
// })()

(async () => {
    console.time('writeMany');
    const fileHandler = await fs.open('test.txt', 'w')

    const stream = fileHandler.createWriteStream()
    console.log({ writableHighWaterMark: stream.writableHighWaterMark });
    console.log({ writableLength: stream.writableLength });

    // const buffer = Buffer.from('string')
    // stream.write(buffer)
    // stream.write(buffer)
    // stream.write(buffer)
    // stream.write(buffer)
    // stream.write(buffer)
    // stream.write(buffer)

    // const buff = Buffer.alloc(1e+8, 10)
    // const buff = Buffer.alloc(16383, 10)
    // const buff = Buffer.alloc(16383, "a")

    // console.log({buff});

    // console.log(stream.write(buff))
    // console.log(stream.write(Buffer.alloc(1, 'a')));
    // console.log(stream.write(Buffer.alloc(1, 'a')));
    // console.log(stream.write(Buffer.alloc(1,'a')));
    
    // console.log({writableLength: stream.writableLength});
    

    // stream.on('drain', () => {
    //     console.log(stream.write(Buffer.alloc(16383, 'b')));
    //     console.log({writableLength: stream.writableLength});
    //     console.log('we are now safe to write more!');
    // })

    // setInterval(() => {
        
    // }, 1000);

    stream.on('close', () => {
        console.log('Stream was closed.');
    })
    

    console.log({ writableLength: stream.writableLength });
    
    const numberOfWrites = 1e6;

    let i = 0
    const writeMany = () => {   
        while (i < numberOfWrites) {
            const buff = Buffer.from(` ${i} `, 'utf-8')
            
            // this is our last write
            if (i === numberOfWrites - 1) {
                return stream.end(buff)
                // stream.write(data) // error
            }

            // if stream.write returns false, stop the loop
            if (!stream.write(buff)) {
                break;
            }

            i++;
        }
    }

    writeMany()

    // resume loop once our internal buffer is empty
    stream.on('drain', () => {
        // console.log('Drained!!', {i});
        writeMany()
    })

    stream.on('finish', () => {
        fileHandler.close()
        console.timeEnd('writeMany');
    })

})()

