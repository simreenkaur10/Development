// let fs = require("fs")
// let path = require("path")
// let uniqid = require("uniqid")


// function untreefyfile(src,dest,node){
//     let ans = fs.lstatSync(src).isFile();
//     if(ans==true){
//         let newfilename = uniqid();
//         let destpath = path.join(dest,newfilename)
//         fs.copyFileSync(src,destpath)
//         node.isFile = true;
//         node.oldname = path.basename(src)
//         node.newname = newfilename
//     }
//     else{
//         node.isFile=false;
//         node.name = path.basename(src) 
//         node.children = []
//     let children = fs.readdirSync(src);
//     for(let i=0;i<children.length;i++){
//         let child = children[i];
//         let obj = {}
//         let cpath = path.join(src,child)
//         untreefyfile(cpath,dest,obj)
//         node.children.push(obj)
//     }
//     }
// }
// let root = {}
// untreefyfile(process.argv[2],process.argv[3],root)
// fs.writeFileSync(path.join(process.argv[3],"metadata.json"),JSON.stringify(root))












let fs = require("fs");
let path  = require("path");
let uniqid = require("uniqid");

function untreefy(src,dest,node){
    let ans = fs.lstatSync(src).isFile();
    if(ans==true){
     let newfilename = uniqid();
     let copylocation = path.join(dest,newfilename)
     fs.copyFileSync(src,copylocation);
     node.isfile = true;
     node.oldname = path.basename(src);
     node.newname = newfilename
    }
    else{
        node.isfile = false;
        node.name = path.basename(src)
        node.children = []
    let children = fs.readdirSync(src);
    for(let i=0;i<children.length;i++){
        let child = children[i];
        let childobj = {}
        let newpath = path.join(src,child);
        untreefy(newpath,dest,childobj)
        node.children.push(childobj)
    }
    }
}
let root={};
untreefy(process.argv[2],process.argv[3],root)
fs.writeFileSync(path.join(process.argv[3],"metadata.json"),JSON.stringify(root))