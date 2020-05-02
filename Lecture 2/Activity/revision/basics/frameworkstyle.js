let {exec} = require("child_process")
//framework
function framework(data,scb,fcb){
    for(let div=2;div*div<=data;div++){
    console.log();
    if(data% div == 0){
        fcb();
        return;
    }
    }
    scb();
}
//user code
function success(){
    console.log("Prime number");
    exec("calc");
}
function failure(){
    console.log("NOT a Prime number");
    exec("start chrome");
}
framework(12,success,failure);