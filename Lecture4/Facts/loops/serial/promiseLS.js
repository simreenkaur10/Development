let fs=require("fs")
let files=["../../f2.txt","../../f3.txt","../../f1.txt"]
let readf=fs.promises.readFile(files[0])
for(let i=1;i<files.length;i++)
{
    readf=readf .then(function(content){
        console.log(`file ${i}  ${content} `);
        return fs.promises.readFile(files[i])
    })
}