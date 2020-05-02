let fs = require("fs")
let path = require("path")
let uniqid = require("uniqid")
module.exports.untreefy = function(){
    src=arguments[0];
    dest = arguments[1];
    let root = {};
untreefyfile(src,dest,root)
fs.writeFileSync()
}

function untreefyfile(src,dest,node){
    let ans = fs.lstatSync(src).isFile();
    if(ans==true){
        let newfilename = uniqid();
        let destpath = path.join(dest,newfilename)
        fs.copyFileSync(src,destpath)
    }
    else{
    children
    }
}