const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cors_options = require("./config/cors_options");
const { logger } = require("./middleware/log_events");
const error_handler = require("./middleware/error_handler");
const verify_JWT = require("./middleware/verify_JWT");
const cookie_parser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(credentials);
app.use(cors(cors_options));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookie_parser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verify_JWT);
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
