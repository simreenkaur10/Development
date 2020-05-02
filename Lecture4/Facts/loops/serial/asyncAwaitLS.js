let fs=require("fs");
let files=["../../f1.txt","../../f2.txt","../../f3.txt"];
(async function(){
    for(let i=0;i<files.length;i++)
    {
        let f1=await fs.promises.readFile(files[i]);
        console.log(`file ${i+1}  ${f1}`)
    }
    
})()