import { rateLimit } from "express-rate-limit"

// Add rate limiting middleware
export const limiter = rateLimit({
    windowMs: 10 * 1000, // define number for 10 sec
    limit: 10, // Limit each IP to 10 requests
    standardHeaders: "draft-8", // Use the last headers format
    legacyHeaders: false, // disable the older headers format
    message: {
        status: 429,
        error: "Too many requests, please try again later",
    },
})
