const { log_events } = require("./log_events");

const error_handler = (err, request, response, next) => {
  log_events(`${err.name}: ${err.message}`, "err_log.txt");
  console.error(err.stack);
  response.status(500).send(err.message);
};

module.exports = error_handler;
