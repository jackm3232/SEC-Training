const whitelist = ["https://www.yoursite.com", "http://localhost:3500"];

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

module.exports = cors_options;
