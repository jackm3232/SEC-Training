const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/log_events");
const error_handler = require("./middleware/error_handler");
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ["https://www.google.com", "http://localhost:3500"];
const cors_options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  options_success_status: 200
}

app.use(cors(cors_options));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (request, response) => {
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

app.all("*", (request, response) => {
  response.status(404);
  if (request.accepts("html")) {
    response.sendFile(path.join(__dirname, "views", "404.html"));
  }
  else if (request.accepts("json")) {
    response.json({ error: "404 Not Found" });
  }
  else {
    response.type("txt").send("404 Not Found");
  }
});

app.use(error_handler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
