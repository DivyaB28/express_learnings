//Middleware are functions that execute during the request to the server
//Each middleware functions has access to request and response objects

const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
const morgan = require("morgan");

// req => middleware => res

// 1. use vs route
// 2. options - our own middleware / express / third party
// morgan npm
// run $npm i morgan

// Add all the middleware functions at the top
// app.use("/api", logger); //for any path that's after /api

//app.use([logger, authorize]);

app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.status(200).send("About page");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  console.log(req.user);
  //We can access middleware params anywhere within the application
  res.send("Items");
});
app.listen(3000, () => {
  console.log("Server is listening to 3000...");
});
