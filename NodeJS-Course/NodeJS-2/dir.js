const fs = require("fs");

if (!fs.existsSync("./new_dir")) {
  fs.mkdir("./new_dir", (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
};
