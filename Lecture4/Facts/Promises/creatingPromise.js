let fs = require("fs");
function promisifyfs(path){
    let filewillbereadpromise = new Promise(function(resolve,reject){
        fstat.readFile(path,function(){
            
        })
    })
}