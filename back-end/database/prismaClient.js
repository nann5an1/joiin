import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL);

const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.slice(1),
    connectionLimit: 10,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
