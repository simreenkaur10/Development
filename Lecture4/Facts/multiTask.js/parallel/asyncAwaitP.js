let fs=require("fs");
(async function(){
    let f1=await fs.promises.readFile("../../f1.txt")
    console.log("f1: "+f1)
})();
(async function(){
    let f2=await fs.promises.readFile("../../f2.txt")
    console.log("f2: "+f2)
})();
(async function(){
    let f3=await fs.promises.readFile("../../f3.txt")
    console.log("f3: "+f3)
})();




// let fs = require("fs")
// console.log("lets see serial Async Await execution.")
// console.log("Now we start reading.")
// console.log("Async fn will be called next");
// (async function(){
//     try{
//     let data1 = fs.promises.readFile("../../f1.txt")
//     let data2 = fs.promises.readFile("../../f2.txt")
//     let data3 = fs.promises.readFile("../../f3.txt")
//     let allFilesData = await Promise.all([data1,data2,data3]);

//      console.log("The file 1 data length is :"+ allFilesData[0].byteLength)
//      console.log("The file 2 data length :"+ allFilesData[1].byteLength)
//      console.log("The file 3 data length is :"+ allFilesData[2].byteLength);
    
//     }
//     catch(err){
//         console.log(err);
//     }
// })()
// console.log("I am the code after async function.")
// console.log("The file reading process got started, but we didnt wait for them to be read ")
// console.log("WE ARE EXECUTING THE MAIN CODE.")
// console.log("now stack is free.")