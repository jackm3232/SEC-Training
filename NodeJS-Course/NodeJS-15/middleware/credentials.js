const allowed_origins = require("../config/allowed_origins");

const credentials = (request, response, next) => {
  const origin = request.headers.origin;
  if (allowed_origins.includes(origin)) {
      response.header('Access-Control-Allow-Credentials', true);
  }
  next();
}

module.exports = credentials;
