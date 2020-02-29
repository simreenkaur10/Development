let request = require("request")
let fs=require("fs")
let cheerio = require("cheerio")

request("https://www.espncricinfo.com/series/19322/commentary/1187677", function(err,res,html){
    if(err == null &&res.statusCode ==200){
       // fs.writeFileSync("abc.html",html);
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
    console.log("Parsing Html");
    let co = cheerio.load(html);
    let tableArr = co(co(".description")[0]).text();
    console.log(tableArr)

}