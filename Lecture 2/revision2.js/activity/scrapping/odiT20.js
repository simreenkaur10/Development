let leaderBoard = [];
let count =0;
let request =require("request");
let cheerio = require("cheerio");
request("https://www.espncricinfo.com/scores/series/19322",function(err,res,html){
    if(err==null && res.statusCode == 200){
     parseHtml(html);
    }
    else if(res.statusCode==404){
console.log("Page not found.")
    }
    else{
console.log("Invalid input.")
    }
})
function parseHtml(html){
    let d = cheerio.load(html);
    let cards = d(".cscore.cscore--final")
    for(let i=0;i<cards.length;i++){
        let matchType = d(cards[i]).find(".cscore_overview").text();
        if(matchType.includes("ODI")|| matchType.includes("T20")){
           let matchLink = d(cards[i]).find(".cscore_buttonGroup ul li a").attr("href")
           matchLink =`https://www.espncricinfo.com${matchLink}`
           goToPage(matchLink);
        }
    }
}

function goToPage(matchLink){
    count ++;
    request(matchLink,function(err,res,html){
        if(err == null && res.statusCode==200){
            handlePage(html);
            count--;
            if(count==0){
                console.table(leaderBoard);
            }
        }
        else if(res.statusCode==404){
        console.log("Page not found.")
        }
        else{
        console.log("Invalid input.");
        }
    })
}
function handlePage(html){
    let d = cheerio.load(html);
    //type of match
    let type = d(".cscore_info-overview").text();
    type = (type.includes("ODI"))? "ODI": "T20";
    //innings 
    let innings = d(".sub-module.scorecard")
    for(let i=0;i<innings.length;i++){
        let teamName = d(innings[i]).find("ul li a h2").text()
       let batsmaninfo = d(innings[i]).find(".flex-row .wrap.batsmen");
       for(let j=0;j<batsmaninfo.length;j++){
        //batsmen name 
        //batsmen runs  
        let batsmanName =d(batsmaninfo[j]).find(".cell.batsmen").text();
        let batsmanRuns =d(batsmaninfo[j]).find(".cell.runs").html();
        storeToLeaderBoard(batsmanName,batsmanRuns,type,teamName);
       }

    }
}
 
function storeToLeaderBoard(batsmanName,batsmanRuns,typeofMatch,teamName){
    batsmanRuns=Number(batsmanRuns);
    for(let i=0;i<leaderBoard.length;i++){
        if(leaderBoard[i].name==batsmanName && leaderBoard[i].type ==typeofMatch && leaderBoard[i].team==teamName){
            leaderBoard[i].runs+=batsmanRuns;
            return;
        }
    }
    let newBatsman ={};
    newBatsman.name = batsmanName;
    newBatsman.runs = batsmanRuns;
    newBatsman.type = typeofMatch;
    newBatsman.team = teamName;
    leaderBoard.push(newBatsman)
}
//store these values into an object
    //design a leaderboard[array] made up of objects and then display it as a table  }












// let request=require("request")
// let fs=require("fs")
// let cheerio=require("cheerio")
// let count=0;
// let leaderBoard=[]
// request("https://www.espncricinfo.com/scores/series/19322",
// function(err,res,html){
//     if(err==null&&res.statusCode==200)
//     {    
//        parsehtml(html)
//       }
//       else if(res.statusCode==404)
//       {
//           console.log("Page Not Found")
//       }
//       else{
//           console.log(err)
//       }
//   })
// function parsehtml(html)
// {
//     let d=cheerio.load(html)
//     let cards=d(".cscore.cscore--final.cricket.cscore--watchNotes")
//     for(let i=0;i<cards.length;i++)
//     {
//         let matchType=d(cards[i]).find(".cscore_info-overview").html()
//         let test= matchType.includes("T20I")||matchType.includes("ODI")
//         if(test==true)
//         {
//             let anchor=d(cards[i]).find(".cscore_buttonGroup ul li a").attr("href")
//             let matchLink=`https://www.espncricinfo.com${anchor}`
//             goToMatch(matchLink)
//         }
//     }
// }
// function goToMatch(matchLink)
// {   count++;
//     request(matchLink,function(err,res,html)
//     {
//         if(err==null&&res.statusCode==200)
//         { 
//            newPage(html)
//            count--;
//            if(count==0)
//            {
//                console.table(leaderBoard);
//            }
//           }
//           else if(res.statusCode==404)
//           {
//               console.log("Page Not Found")
//           }
//           else{
//               console.log(err)
//           }
//     })
// }
// function newPage(html)
// {
//     const d=cheerio.load(html);
//     let format=d(".cscore.cscore--final.cricket .cscore_info-overview").html();
// format=format.includes("ODI")?"ODI":"T20";
//     let teams=d(".sub-module.scorecard h2");
//     let innings=d(".sub-module.scorecard")
//     for(let i=0;i<innings.length;i++)
//     {
//         let players=d(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen ")
//         let team=(d(teams[i]).text());
//         for(let br=0;br<players.length;br++)
//         {
//             let batsmaninfo=d(players[br]);
//             let batsmanRun=batsmaninfo.find(".cell.runs").html();
//             let batsmanName=batsmaninfo.find(".cell.batsmen").text();
//             handleplayer(format, team, batsmanName, batsmanRun);
//         }
//     }
// }
// function handleplayer(format, team, batsmanName, batsmanRun)
// {
//     let runs=Number(batsmanRun);
//     for(let i=0;i<leaderBoard.length;i++)
//     {
//         let pobj=leaderBoard[i];
//         if(pobj.name==batsmanName&&pobj.team==team&&pobj.format==format)
//         {
//             pobj.runs+=runs;
//             return;
//         }
//     }
//     let obj={
//         runs:runs,
//         format:format,
//         team: team,
//         name: batsmanName
//     }
//     leaderBoard.push(obj);

// }