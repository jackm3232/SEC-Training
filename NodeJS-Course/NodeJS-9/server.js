const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cors_options = require("./config/cors_options");
const { logger } = require("./middleware/log_events");
const error_handler = require("./middleware/error_handler");
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(cors_options));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

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
