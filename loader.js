const fs = require("fs");

const files = fs.readdirSync("./web");
// console.log(files);
for(let i = 0; i < files.length; i++) {
    require("./web/" + files[i]);
}