const os = require("os");
const path = require("path");
const math_funcs = require("./math");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));

console.log(math_funcs.add(2, 3));
console.log(math_funcs.subtract(2, 3));
console.log(math_funcs.multiply(2, 3));
console.log(math_funcs.divide(2, 3));
