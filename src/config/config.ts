import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const MONGO_URL_LOCAL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.nqrpt47.mongodb.net/repos`;

const config = {
    mongo: {
        url: MONGO_URL_LOCAL,
    },
    server: {
        port: SERVER_PORT,
    },
};

export default config;