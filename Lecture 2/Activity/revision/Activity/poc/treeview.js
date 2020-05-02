// let fs = require("fs");
// let path = require("path")
// function viewAsTree(src,indent){
// let ans = fs.lstatSync(src).isDirectory();
//     if(ans==false){
// console.log(indent+path.basename(src)+ " * ")
// }
// else{
//     console.log(indent+path.basename(src));
//     let children = fs.readdirSync(src);
//     for(let i=0;i<children.length;i++){
//         let child = children[i];
//         let newpath = path.join(src,child);
//         viewAsTree(newpath,indent+"\t");
//     }
// }
// }


// viewAsTree(process.argv[2],"");


let fs = require("fs");
let path = require("path");

function treeview(src, indent){
    let ans = fs.lstatSync(src).isFile();
    if(ans==true){
   console.log(indent + path.basename(src));
    }
    else{
         console.log(indent + path.basename(src));
         let children = fs.readdirSync(src);
         for(let i=0;i<children.length;i++){
             let child = children[i];
             let newpath = path.join(src,child);
             treeview(newpath,indent+"\t");
         }
    }
}
treeview(process.argv[2],"");