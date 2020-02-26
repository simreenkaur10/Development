let  fs=require("fs")
let path =require("path")
let uniqid =require("uniqid")
module.exports.untreefy=function(){
    let src = arguments[0];
    let dest = arguments[1];
untreefy1(src,dest)
console.log("all files copied")}

function untreefy1(src,dest){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
       let uid=uniqid()
       fs.copyFileSync(src,path.join(dest,uid)) 
    }
    else{
        
        let children = fs.readdirSync(src);
        for(let i=0;i<children.length;i++){
            let child= path.join(src,children[i])
            untreefy1(child,dest)
        }
        
    }
}
