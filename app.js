const express = require("express");
const app = express();

let { people } = require("./data");

//static assets
app.use(express.static("./methods-public"));

//parse form data
app.use(express.urlencoded({ extended: false }));
// express.urlencoded is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads
// and is based on body-parser.
//extended -> this option allows to choose between parsing the URL-encoded data with the querystring library (when false)
// or the qs library (when true)

//parse json -> to handle incoming json data
app.use(express.json());

//HTTP Methods
//GET -> Read data (default method that browser performs)
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

//POST method -> insert data
app.post("/api/people", (req, res) => {
  const {
    body: { name },
  } = req;
  if (!name) {
    return res.status(400).json({ success: false, msg: "Please provide name" });
  }
  res.status(201).send({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: "Please provide name" });
  }
  res.status(201).send({ success: true, data: [...people, { name }] });
});
app.post("/login", (req, res) => {
  const {
    body: { name },
  } = req;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide credentials!..");
});

app.listen(3000, () => {
  console.log("Server is listening to 3000...");
});
