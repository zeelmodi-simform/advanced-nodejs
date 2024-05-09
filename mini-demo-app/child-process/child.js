console.log('child created!', process.pid);

process.on('message', (msg) => {
    console.log(msg);

    const result = is_prime(msg)

    // throw new Error('This is an error in the child process')

    process.send(result)

    setTimeout(process.exit, 5000);

    process.exit(1);
})


function is_prime(number) {
    const factors = []

    if (number < 1) return factors;

    if (number === 1) return true;

    for (let i = 0; i < number; i++) {

        if (number % i === 0) {
                factors.push(i)
            }
    }
    return {number,factors, is_prime:(factors.length >0 ? false: true)}
}