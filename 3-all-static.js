const express = require("express");
const app = express();
const path = require("path");

//setup static and middleware
//static means -> its a file that server doesn't have to change it
//simply place it in designated folder, even if we have to add 20000 images
app.use(express.static("./public"));

// app.get("/", (req, res) => {
// you can still add this index.html file to static assets
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000, () => {
  console.log("Server is listerning on port 3000...");
});
