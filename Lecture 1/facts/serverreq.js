const{exec} = require("child_process")
function takeRequest(data,success,failure){
if(data%2==0){
    success();
}
else{
    failure();
}
}
function success(){
    console.log("your request was completed.");
    exec("code");
}
function failure(){
    console.log("some error ocurred.");
    window.open('https://www.facebook.com/latechnologies', '_system','location=yes');
}
takeRequest(17,success,failure);
takeRequest(18,success,failure);
