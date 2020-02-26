let fs=require("fs")
let path = require("path")
function disp(indent,src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(indent + path.basename(src),"*");
    }
    else{
        console.log(indent + path.basename(src))
        
        let children = fs.readdirSync(src)
        for(let i=0;i<children.length;i++){
           let child = path.join(src,children[i])
            disp(indent + "\t",child);
        }
    }

}
disp(" ","d10")