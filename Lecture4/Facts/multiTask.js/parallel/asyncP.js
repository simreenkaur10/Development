// parallel
// f1 => read 
// f2 => read
let fs = require("fs");
fs.readFile("../../f1.txt", function (err, data1) {
    if(err==null){
  console.log(data1.byteLength);
    }
    else{
        console.log(err);
    }
})
fs.readFile("../../f2.txt", function (err, data2) {
    if(err==null){
  console.log(data2.byteLength);
    }
  else{
    console.log(err);
}
})
fs.readFile("../../f3.txt", function (err, data3) {
    if(err==null){
  console.log(data3.byteLength);
    }
  else{
    console.log(err);
}
})