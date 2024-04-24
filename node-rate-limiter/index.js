const express = require('express')
const cors = require('cors');
const PORT = 3000;

const {rateLimiter, slowDownLimiter} = require('./utils/limiter.util')

const app = express();

app.use(cors());

// app.use(rateLimiter)
app.use(slowDownLimiter)

app.use("/public", rateLimiter);

app.get('/hello', (req, res,next) => {
    res.status(200).json({data: 'Hello World'});
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})