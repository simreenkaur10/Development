let cheerio = require("cheerio");
let request = require("request");
console.log("before");
request("https://www.espncricinfo.com/series/19322/commentary/1187683",function(err,res,html){
    if(err == null && res.statusCode==200){
        parsehtml(html);
    }
    else if (res.statusCode===404){
        console.log("invalid page");
    }
else{
    console.log(err);
    console.log(res.statusCode);
}
})

function parsehtml(html){
    console.log("--------------------------------------------");
    let d = cheerio.load(html);
    let item = d(".item-wrapper .description");
    let text = d(item[0]).text();
    console.log(text);
}
console.log("After");