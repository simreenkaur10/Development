let request = require("request");
let fs = require("fs")
console.log("before");
request("https://www.amazon.com/",function(err,res,html){
fs.writeFile("index.html",html,function(err){
    console.log("written file to disk")
})
})
console.log("after");