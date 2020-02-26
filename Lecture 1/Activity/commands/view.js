let  fs=require("fs")
let path =require("path")
module.exports.view=function(){

    let src = arguments[0];
    let mode = arguments[1];
    if(mode == "-t"){
        viewAsTree(" ",src)
    }
    else if(mode == "-f"){
        viewAsFlatFiles(src)
    }
    else{
        console.log("Wrong parameters")
    }
   
}
function viewAsTree(indent,src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(indent + path.basename(src),"*");
    }
    else{
        console.log(indent + path.basename(src))
        
        let children = fs.readdirSync(src)
        for(let i=0;i<children.length;i++){
           let child = path.join(src,children[i])
            viewAsTree(indent + "\t",child);
        }
    }

}
function viewAsFlatFiles(){
    console.log("View as Flat files is working.")
}