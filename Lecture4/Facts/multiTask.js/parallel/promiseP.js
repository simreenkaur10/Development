let fs=require("fs")
let f2=fs.promises.readFile("../../f2.txt")
.then(function(data){
    console.log("f2 -> "+data)
})
let f3=fs.promises.readFile("../../f3.txt")
.then(function(data){
    console.log("f3 -> "+data)
})
let f1=fs.promises.readFile("../../f1.txt")
.then(function(data){
    console.log("f1 -> "+data)
})






// let fs = require("fs")
// console.log("lets see parallel promises execution.")
// console.log("Now we start reading.")
// let file1WillBeReadPromise = fs.promises.readFile("../../f1.txt")
// let file2WillBeReadPromise = fs.promises.readFile("../../f2.txt")
// let file3WillBeReadPromise = fs.promises.readFile("../../f3.txt")
   
// let allFilesAreReadPromise = Promise.all([file1WillBeReadPromise,file2WillBeReadPromise,file3WillBeReadPromise])
// allFilesAreReadPromise.then(function(allFilesData){
//     console.log("The file 1 data length is :"+ allFilesData[0].byteLength)
//     console.log("The file 2 data length :"+ allFilesData[1].byteLength)
//     console.log("The file 3 data length is :"+ allFilesData[2].byteLength);
// }).catch(function(err){
//     console.log(err);
// })

// console.log("The file reading process got started, but we didnt wait for them to be read ")
// console.log("WE ARE EXECUTING THE MAIN CODE.")
// console.log("now stack is free.")