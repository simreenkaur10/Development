// let fs = require("fs")
// let path = require("path")

// function treefyfile(src,dest,node){
//     if(node.isFile==true){
//      let srcpath = path.join(src,node.newname)
//      let destpath = path.join(dest,node.oldname)
//      fs.copyFileSync(srcpath,destpath);
//     }
//     else{
//         let dirPath = path.join(dest,node.name);
//         fs.mkdirSync(dirPath); 
//         let childrens = node.children;
//         for(let i=0;i<childrens.length;i++){
//             let child = childrens[i]
//             treefyfile(src,dirPath,child);
//         }
//     }
// }

// let root = require(path.join(process.argv[2],"metadata.json"))
//  treefyfile(process.argv[2],process.argv[3],root);







let fs = require("fs");
let path = require("path")
function treefyfile(src,dest,node){
    if(node.isfile==true){
        let filePath = path.join(dest,node.oldname);
        let fileTobecopied = path.join(src,node.newname);
 fs.copyFileSync(fileTobecopied,filePath);
    }
    else{
        let dirName = node.name;
        let dirPath = path.join(dest,dirName)
        fs.mkdirSync(dirPath);
        for(let i=0;i<node.children.length;i++){
            let child = node.children[i];
            treefyfile(src,dirPath,child)
        }
    }
}
let root = require(path.join(process.argv[2],"metadata.json"))
treefyfile(process.argv[2],process.argv[3],root)