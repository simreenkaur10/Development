// let fs = require("fs");
// let path = require("path")
// function viewAsFlatFile(src){
// let ans = fs.lstatSync(src).isDirectory();
//     if(ans==false){
// console.log(src + " * ")
// }
// else{
//     console.log(src);
//     let children = fs.readdirSync(src);
//     for(let i=0;i<children.length;i++){
//         let child = children[i];
//         let newpath = path.join(src,child);
//         viewAsFlatFile(newpath);
//     }
// }
// }


// viewAsFlatFile(process.argv[2]);


let  fs = require("fs");
let path = require("path")

function flatfile(src,target){
let ans  = fs.lstatSync(src).isDirectory();
if(ans==false){
console.log( target + " * ");
}
else{
console.log(target);
let children = fs.readdirSync(src)
for(let i=0;i<children.length;i++){
    let child = children[i];
    let newpath = path.join(src,child)
    flatfile(newpath,target + " " + child);
}

}
}
flatfile(process.argv[2],path.basename(process.argv[2]))