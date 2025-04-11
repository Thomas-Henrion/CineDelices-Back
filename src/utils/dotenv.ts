import "dotenv/config";

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    DATABASE: {
        HOST: process.env.DATABASE_HOST,
        USER: process.env.DATABASE_USER,
        PASS: process.env.DATABASE_PASSWORD,
        NAME: process.env.DATABASE_NAME,
        PORT: process.env.DATABASE_PORT,
    }
}