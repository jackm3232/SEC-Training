const allowed_origins = require("./allowed_origins");

const cors_options = {
  origin: (origin, callback) => {
    if (allowed_origins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  options_success_status: 200
}

module.exports = cors_options;
