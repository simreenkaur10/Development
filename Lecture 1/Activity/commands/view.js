module.exports.view=function(){
    let src = arguments[0];
    let mode = arguments[1];
    if(mode == "-t"){
        viewAsTree(src)
    }
    else if(mode == "-f"){
        viewAsFlatFiles(src)
    }
    else{
        console.log("Wrong parameters")
    }
   
}
function viewAsTree(){
    console.log("View as tree is working.")
}
function viewAsFlatFiles(){
    console.log("View as Flat files is working.")
}