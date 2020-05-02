let fs = require("fs");
console.log("we have started reading the file.")
let fileWillBeReadPromise = fs.promises.readFile("../f1.txt");
console.log("The file reading process has initiated.")
console.log("But we didnt wait for the file to be read.")
console.log("We started executing th next lines of code.")
console.log("Lets see what is the status of file reading process.")
console.log(fileWillBeReadPromise)
fileWillBeReadPromise.then(function(data){
    console.log("The file reading process has been completed.")
    console.log("Heres the data."+data)
    console.log(data.byteLength);

})
console.log("We are done executing the main code.")
console.log("Now the stack is free for the async operations.")
