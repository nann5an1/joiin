// index.js
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.port || 3000;
// const mysql = require('mysql2/promise');
// const authenticateToken = require("./middleware/authenticateToken");
// const authorizeRole = require("./middleware/authorizeRole");
const eventRoute = require("./routes/eventRoute");
const router = express.Router(); //create a router object
const jsonMiddleWare = express.json();


const subscriber = ["admin", "user"];

app.use(cors());
app.use(jsonMiddleWare); //middleware for converting to the json type
app.use(router); //use the router in the express

async function main() {
  // Establish the database connection
  // const connection = await mysql.createConnection({
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: process.env.DB_DATABASE,
  // });
  
app.use("/api/v0.1/events", eventRoute); //event main page
app.use("/api/v0.1/", home);


  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});
