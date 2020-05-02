let cheerio = require("cheerio")
let request = require("request")
let fs = require("fs")
console.log("before")
request("https://www.espncricinfo.com/series/19322/scorecard/1187683",function(err,res,html){
    if(err==null){
        parsehtml(html);
    }
    else if (res.statusCode==404){
        console.log("invalid page");
    }
    else{
        console.log(err);
    }
})

function parsehtml(html){
    let d = cheerio.load(html);
    let bowlers = d(".scorecard-section.bowling table tbody tr");
    for(let i=0;i<bowlers.length;i++){
        let bowlersName = d(d(bowlers[i]).find("td")[0]).text();
        let wickets = d(d(bowlers[i]).find("td")[4]).text();
      console.log(bowlersName + " "+wickets);
      
    }
}
//     for(let i=0;i<tables.length;i++){
//    let trArry =d(tables[i]).find("table tbody tr");
//    console.log("Bowlers of team"+ (i+1));
//    for(let j=0;j<trArry.length;j++){
//        console.log(d(trArry[j]).text());
//    }
//    console.log("-----------------------------------")
//     }
// }















// let cheerio=require("cheerio");
// let request=require("request")
// let fs=require("fs")
// request("https://www.espncricinfo.com/series/19322/scorecard/1187683",function(err,res,html){
//     if(err==null&&res.statusCode==200)
//     {
//         parseHtml(html);
//     }
//     else
//     {
//         console.log(err)
//     }
// })
// function parseHtml(html)
// {
//     let d=cheerio.load(html);
//     let bowlingScoreCard=d(".scorecard-section.bowling table tbody tr")
//     let maxWName=""
//     let maxWic=0;
//     for(let i=0;i<bowlingScoreCard.length;i++)
//     {
//         let name=d(d(bowlingScoreCard[i]).find("td")[0]).text();
//         let wicket=d(d(bowlingScoreCard[i]).find("td")[5]).text()
//         if(wicket>maxWic)
//         {
//             maxWic=wicket
//             maxWName=name

//         }
//     }
//     console.log(maxWName+"\t"+maxWic)
// }