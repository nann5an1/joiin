import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();

// mariadb driver rejects mysql:// scheme — parse the URL manually
const dbUrl = new URL(process.env.DATABASE_URL);

const pool = mariadb.createPool({
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.slice(1),
    connectionLimit: 10,
});

const adapter = new PrismaMariaDb(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
