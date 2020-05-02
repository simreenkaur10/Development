let request=require("request")
let fs=require("fs")
let cheerio=require("cheerio")
request("https://www.espncricinfo.com/scores/series/19322",function(){
    if(err==null&&res.statusCode==200){
        parseHtml(html)
    }
    else if(res.statusCode == 404){
        console.log("Page not found");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }
})
function parseHtml(html){
    let co=
}

