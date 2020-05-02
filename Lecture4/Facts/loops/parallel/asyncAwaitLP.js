let fs = require("fs")
let files  = ["../../f1.txt","../../f2.txt","../../f3.txt","../../f4.txt","../../f5.txt"];
async function myfn(i){
    let data = await fs.promises.readFile(files[i]);
    console.log(`${i+1} file data is : ${data} and length of data is : ${data.byteLength}`)
}
 for(let i=0;i<files.length;i++){
     myfn(i);
 }



























// let fs=require("fs");
// let files=["../../f1.txt","../../f2.txt","../../f3.txt"];
// async function Read(i)
// {
//     let data=await fs.promises.readFile(files[i])
//     console.log(`file ${i+1}  :   ${data}`)

// }
// for(let i=0;i<files.length;i++)
// {
//     Read(i);
// }