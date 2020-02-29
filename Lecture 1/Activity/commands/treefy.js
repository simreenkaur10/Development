let fs = require("fs")
let path = require("path")
module.exports.treefy=function(){
    let src = arguments[0];
    let root=require(path.join(src,"metadata.json"))
    let dest = arguments[1];
    treefy1(src,dest,root)
    console.log("treefy command has been called");
}


function treefy1(src,dest,node){
    
    if(node.isFile==true){
       let oldFile=path.join(src,node.newname)
       let newFile=path.join(dest,node.name)
       fs.copyFileSync(oldFile,newFile)
    
    }
    else{
        let dirName = path.join(dest,node.name)
        fs.mkdirSync(dirName)
        for(let i=0;i<node.children.length;i++){
            
            treefy1(src,dirName,node.children[i])
            
        }
        
    }
}
