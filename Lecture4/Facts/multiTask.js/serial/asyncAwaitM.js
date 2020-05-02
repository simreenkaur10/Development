let fs = require("fs")
console.log("lets see serial Async Await execution.")
console.log("Now we start reading.")
console.log("Async fn will be called next");
(async function(){
    try{
    let data1 =await fs.promises.readFile("../../f1.txt")
    await console.log("The file 1 data length is :"+ data1.byteLength)
    let data2 =await fs.promises.readFile("../../f2.txt")
    await console.log("The file 2 data length :"+ data2.byteLength)
    let data3 =await fs.promises.readFile("../../f3.txt")
    await console.log("The file 3 data length is :"+ data3.byteLength);
    }
    catch(err){
        console.log(err);
    }
})()
console.log("I am the code after async function.")
console.log("The file reading process got started, but we didnt wait for them to be read ")
console.log("WE ARE EXECUTING THE MAIN CODE.")
console.log("now stack is free.")