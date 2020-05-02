let fs = require("fs");
console.log("Before");
console.log("start");
let filewillbereadpromise = fs.promises.readFile("f1.html");
console.log("After")
filewillbereadpromise.then(function(content){
    console.log(content+" ")
    console.log("finish");
})
filewillbereadpromise.catch(function(err){
console.log(err);
})
console.log("i will be printed");