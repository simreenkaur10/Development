let  fs=require("fs")
let path =require("path")
let uniqid =require("uniqid")
module.exports.untreefy=function(){
    let src = arguments[0];
    let dest = arguments[1];
    let root ={};
untreefy1(src,dest,root);
console.log(root)
fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root))
console.log("all files copied")}

function untreefy1(src,dest,node){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
       let uid=uniqid()
       node.isFile = true;
       node.name = path.basename(src)
       node.newname = uid
       fs.copyFileSync(src,path.join(dest,uid)) 
    }
    else{
        node.isFile=false
        node.name=path.basename(src)
        node.children =[];
        let childrens = fs.readdirSync(src);
        for(let i=0;i<childrens.length;i++){
            let childobj ={}
            let child= path.join(src,childrens[i])
            untreefy1(child,dest,childobj)
            node.children.push(childobj)
        }
        
    }
}
