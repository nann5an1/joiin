// index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.port || 3000;
dotenv.config();
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";
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

app.use("/api/v0.1/events", eventRoute); //event main page
app.use("/api/v0.1/user", userRoute);


  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});
