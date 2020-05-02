let fs=require("fs")
let files = ["../f1.txt","../f2.txt","../f3.txt","../f4.txt","../f5.txt","../f6.txt","../f7.txt"]

fs.readFile(files[0],function(err,data){
console.log("file 1 length :"+ data.byteLength)
    if(data.bytelength<50){
fs.readFile(files[1],function(err,data){
    console.log("file 2 length :"+ data.byteLength)
    if(data.byteLength<40){
        console.log("file 4 length :"+ data.byteLength)
    }
    else{
        console.log("file 5 length :"+ data.byteLength)
    }
})
    }
    else{
fs.readFile(files[2],function(err,data){
    console.log("file 3 length :"+ data.byteLength)
    if(data.byteLength>30){
        console.log("file 6 length :"+ data.byteLength)
    }
    else{
        console.log("file 7 length :"+ data.byteLength)
    }
})
    }
})
// fs.readFile(f1,function(err,data){
//     console.log()
// })