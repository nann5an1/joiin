// index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";
import session from 'express-session';
import path from "path";

const app = express();
const port = process.env.port || 3000;
dotenv.config();

const router = express.Router(); //create a router object
const jsonMiddleWare = express.json();


// const subscriber = ["admin", "user"];

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
  }
));
app.use(jsonMiddleWare); //middleware for converting to the json type
app.use(router); //use the router in the express

async function main() {

  //the cookie for the session is include as default with name(connect.sid), which has the same session id as the server side session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,   // true in production
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000
  }
}));

app.use("/api/v0.1/events", eventRoute); //event main page
app.use("/api/v0.1/user", userRoute);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); 


  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});
