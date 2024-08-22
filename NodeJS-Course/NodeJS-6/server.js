const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("^/$|/index(.html)?", (request, response) => {
  //response.sendFile("./views/index.html", { root : __dirname });
  response.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (request, response) => {
  response.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (request, response) => {
  response.redirect(301, "/new-page.html"); //would send 302 by default
});

app.get("/hello(.html)?", (request, response, next) => {
  console.log("Attempted to load hello.html");
  next();
}, (request, response) => {
  response.send("Hello!");
});

const one = (request, response, next) => {
  console.log("one");
  next();
};
const two = (request, response, next) => {
  console.log("two");
  next();
};
const three = (request, response) => {
  console.log("three");
  response.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (request, response) => {
  response.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
