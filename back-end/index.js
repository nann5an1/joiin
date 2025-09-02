// index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";
import session from 'express-session';
import path from "path";
import cookieParser from "cookie-parser";

// Load environment variables first
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
// app.use(cors({
//     origin: "http://localhost:3001",
//     credentials: true
// }));

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware setup in correct order
app.use(cookieParser()); // Cookie parser must come before routes
app.use(express.json()); // JSON middleware

// Session middleware (if you're using sessions alongside JWT)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,   // true in production with HTTPS
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000
  }
}));

// Static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes - these should come after all middleware
app.use("/api/v0.1/events", eventRoute);
app.use("/api/v0.1/user", userRoute);

async function main() {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});