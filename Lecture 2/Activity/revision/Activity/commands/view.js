// module.exports.view = function (){
//     src=arguments[0];
//     mode=arguments[1];
//     if(mode=="-t"){
//         viewAsTree(src);
//     }
//     else if(mode=="-f"){
//         viewAsFlatFile(src);
//     }
//     else{
//         console.log("wrong input");
//     }
// }  

// function viewAsTree(src){
//     console.log("Tree view is implemented.")
// }
// function viewAsFlatFile(src){
//     console.log("File view is implemented.")
// }

let fs = require("fs");
let path= require("path")
module.exports.view=function (){
    src=arguments[0];
    mode = arguments[1];
    if(mode=="-t"){
        viewAsTree(src,"");
    }
    else if(mode=="-f"){
        viewAsFlatFile(src);
    }
    else{
        console.log("wrong command");
    }
}
   function viewAsTree(src,indent){
    let ans = fs.lstatSync(src).isDirectory();
            if(ans==false){
        console.log(indent+path.basename(src)+ " * ")
        }
        else{
            console.log(indent+path.basename(src));
            let children = fs.readdirSync(src);
            for(let i=0;i<children.length;i++){
                let child = children[i];
                let newpath = path.join(src,child);
                viewAsTree(newpath,indent+"\t");
            }
        }
        }
        

function viewAsFlatFile(src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
console.log(src + " * ")
}
else{
    console.log(src);
    let children = fs.readdirSync(src);
    for(let i=0;i<children.length;i++){
        let child = children[i];
        let newpath = path.join(src,child);
        viewAsFlatFile(newpath);
    }
}
}