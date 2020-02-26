let  fs=require("fs")
let path =require("path")
function disp(src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(src+"*");
    }
    else{
        console.log(src);
        let children = fs.readdirSync(src);
        for(let i=0;i<children.length;i++){
            let child= path.join(src,children[i])
            disp(child)
        }
        
    }
}
disp("d10")