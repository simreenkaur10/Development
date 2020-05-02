let fs = require("fs")
console.log("lets see serial promises execution.")
console.log("Now we start reading.")
let file1WillBeReadPromise = fs.promises.readFile("../../f1.txt")
file1WillBeReadPromise.then(function(data){
    console.log("The file 1 data length is :"+ data.byteLength)
    let file2WillBeReadPromise = fs.promises.readFile("../../f2.txt")
    return file2WillBeReadPromise
}).then(function(data){
    console.log("The file 2 data length :"+ data.byteLength)
    let file3WillBeReadPromise = fs.promises.readFile("../../f3.txt")
    return file3WillBeReadPromise;
}).then(function(data){
    console.log("The file 3 data length is :"+ data.byteLength);
}).catch(function(err){
    console.log(err);
})

console.log("The file reading process got started, but we didnt wait for them to be read ")
console.log("WE ARE EXECUTING THE MAIN CODE.")
console.log("now stack is free.")