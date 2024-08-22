const fs = require("fs");
const rs = fs.createReadStream("./files/many_contents.txt", { encoding: "utf8" });
const ws = fs.createWriteStream("./files/new_many_contents.txt");

rs.pipe(ws);
