let request = require("request")
let fs=require("fs")
let cheerio = require("cheerio")
request("https://www.espncricinfo.com/series/19322/scorecard/1187677" , function(err,res,html){
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
    let tableArr = co(".scorecard-section.bowling table tbody tr");
    let maxWicketTaker="";
    let maxWickets= 0;
    for(let i=0;i<tableArr.length;i++){
        let tdArr = co(tableArr[i]).find("td")
        let wicket = co(tdArr[5]).html()
        let bowlerName = co(tableArr[i]).find("td a").html();

     if(wicket>maxWickets){
         maxWicketTaker=bowlerName;
         maxWickets=wicket
     }
    }
  //  fs.writeFileSync("table.html",tableHtml);
  console.log(maxWicketTaker+" "+ maxWickets);
    console.log("File written to disk");
}