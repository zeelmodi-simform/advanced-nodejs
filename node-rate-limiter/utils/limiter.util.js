const { rateLimit } = require("express-rate-limit");
// for ESM users -> import { rateLimit } from "express-rate-limit";

const { default: slowDown } = require("express-slow-down");
// import * as rateLimiter from 'express-rate-limit';
// for ESM users -> import { rateLimit } from "express-slow-down";


const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
    standardHeaders: true, // add the `RateLimit-*` headers to the response
    legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
  });
  

  const slowDownLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 5 minutes
    delayAfter: 10, // allow 10 requests per `windowMs` (5 minutes) without slowing them down
    delayMs: (hits) => hits * 200, // add 200 ms of delay to every request after the 10th
    maxDelayMs: 5000, // max global delay of 5 seconds
  });
  

module.exports = {slowDownLimiter, rateLimiter}

