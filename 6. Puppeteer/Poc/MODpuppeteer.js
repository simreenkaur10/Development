let puppeteer = require("puppeteer")
let uName = process.argv[3];
let fs = require("fs")
let credentialsFile = process.argv[2];
(async function(){

    try{
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null
        
    })

let  pages = await browser.pages();
let page = pages[0]
let data =await fs.promises.readFile(credentialsFile)
let {url,user,pwd} = JSON.parse(data)
await page.goto(url,{ waitUntil: "networkidle0" })
await page.type("#input-1",user)
await page.type("#input-2",pwd)

  await Promise.all(
    [page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click("button[data-analytics=LoginPassword]")])

//*****************************DashBoard***************************************//
await page.waitForSelector(".dropdown.dropdown.dropdown-auth",{visible :true})
await page.click(".dropdown.dropdown.dropdown-auth");
await Promise.all([page.waitForNavigation({waitUntil: "networkidle0"}),
page.click("a[data-analytics=NavBarProfileDropDownAdministration]")])
await page.waitForSelector("#content > div > div > div > section > header > ul > li:nth-child(2) > a",{visible:true})
await page.click("#content > div > div > div > section > header > ul > li:nth-child(2) > a");
let challangeurl = page.url();
let qindex = 0;
while(true){
    let question = await getMeTheQuestionElement(page,qindex,challangeurl);
    if(question==null){
        return null;
    }
     
    await handleQuestion(page,question,uName);
 qindex++;
 }
}
catch(err){
    console.log(err)
}
}
)()



async function waitForLoader(page) {
      await page.waitForSelector("#ajax-msg", {
        visible: false
      });
    }

async function getMeTheQuestionElement(page,quest,url){
    let PageNo = Math.floor(quest/10);
    let quesIndexOnTheFoundPage = quest%10;
    console.log(url)
    await page.goto(url,{waitUntil :"networkidle0"})

await page.waitForSelector(".pagination-wrap .pagination li",{visible:true})
let paginationTab = await page.$$(".pagination-wrap .pagination li");
let nextButton = paginationTab[paginationTab.length-2]
let classname = await page.evaluate(function(el){
    return el.getAttribute("class")
},nextButton)
for(let i=0;i<PageNo;i++){
    if(classname=="disabled"){
        return null;
    }
await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),
page.click(nextButton)]);
paginationTab = await page.$$(".pagination-wrap .pagination li");
nextButton = paginationTab[paginationTab.length - 2 ]
classname =  await page.evaluate(function(el){
    return el.getAttribute("class");
},nextButton)

}
await page.waitForSelector(".table-wrap .backbone",{visible:true})
let listOfQuestionsOnThePage = await page.$$(".table-wrap .backbone")
if(listOfQuestionsOnThePage.length>quesIndexOnTheFoundPage){
    return listOfQuestionsOnThePage[quesIndexOnTheFoundPage];
}
else{
    return null;
}
}

async function handleQuestion(page,questElement,uName){
await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),(questElement).click()])
await page.waitForSelector('span.tag',{visible:true})
await page.waitForSelector(".nav-tabs li[data-tab = moderators]",{visible:true})
await page.click(".nav-tabs li[data-tab = moderators]")
await page.waitForSelector("#moderator",{visible:true})
await page.type("#moderator",uName)
await page.keyboard.press("Enter");
page.click(".save-challenge.btn-green");
}













// let puppeteer = require("puppeteer")
// let uName = process.argv[3];
// let fs = require("fs")
// let credentialsFile = process.argv[2];
// (async function(){

//     try{
//     let browser = await puppeteer.launch({
//         headless : false,
//         defaultViewport : null,
        
//     })

// let  pages = await browser.pages();
// let page = pages[0]
// let data =await fs.promises.readFile(credentialsFile)
// let {url,user,pwd} = JSON.parse(data)
// await page.goto(url,{ waitUntil: "networkidle0" })
// await page.type("#input-1",user)
// await page.type("#input-2",pwd)

//   await Promise.all(
//     [page.waitForNavigation({ waitUntil: "networkidle0" }),
//     page.click("button[data-analytics=LoginPassword]")])

// //***DashBoard*****//
// await page.waitForSelector(".dropdown.dropdown.dropdown-auth",{visible :true})
// await page.click(".dropdown.dropdown.dropdown-auth");
// await Promise.all([page.waitForNavigation({waitUntil: "networkidle0"}),
// page.click("a[data-analytics=NavBarProfileDropDownAdministration]")])
// await page.waitForSelector("#content > div > div > div > section > header > ul > li:nth-child(2) > a",{visible:true})
// await page.click("#content > div > div > div > section > header > ul > li:nth-child(2) > a");
// let challangeurl = page.url();
// let qindex = 0;
// while(true){
//     let question = await getMeTheQuestionElement(page,qindex,challangeurl);
//     if(question==null){
//         return null;
//     }
//     await handleQuestion(page,question,uName);
//  qindex++;
//  }
// }
// catch(err){
//     console.log(err)
// }
// }
// )()



// async function waitForLoader(page) {
//       await page.waitForSelector("#ajax-msg", {
//         visible: false
//       });
//     }

// async function getMeTheQuestionElement(page,quest,url){
//     let PageNo = Math.floor(quest/10);
//     let quesIndexOnTheFoundPage = quest%10;
//     console.log(url)
//     await page.goto(url,{waitUntil :"networkidle0"})

// await page.waitForSelector(".pagination-wrap .pagination li",{visible:true})
// let paginationTab = await page.$$(".pagination-wrap .pagination li");
// let nextButton = paginationTab[paginationTab.length-2]
// let classname = await page.evaluate(function(el){
//     return el.getAttribute("class")
// },nextButton)
// for(let i=0;i<PageNo;i++){
//     if(classname=="disabled"){
//         return null;
//     }
// await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),
// page.click(nextButton)]);
// paginationTab = await page.$$(".pagination-wrap .pagination li");
// nextButton = paginationTab[paginationTab.length - 2 ]
// classname =  await page.evaluate(function(el){
//     return el.getAttribute("class");
// },nextButton)

// }
// await page.waitForSelector(".table-wrap .backbone",{visible:true})
// let listOfQuestionsOnThePage = await page.$$(".table-wrap .backbone")
// if(listOfQuestionsOnThePage.length>quesIndexOnTheFoundPage){
//     return listOfQuestionsOnThePage[quesIndexOnTheFoundPage];
// }
// else{
//     return null;
// }
// }



// async function handleQuestion(page,questElement,uName){
//   await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), questElement.click()]);
// // await page.click(questElement)
// // await waitForLoader();
// await page.waitForSelector('span.tag',{visible:true})
// await page.waitForSelector("li[data-tab = moderators]",{visible:true})
// await page.click("li[data-tab = moderators]")
// await page.waitForSelector("#moderator",{visible:true})
// await page.type("#moderator",uName)
// await page.keyboard.press("Enter");
// await page.click(".save-challenge.btn.btn-green")
// // await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click(".save-challenge.btn-green")])
// }



























// let puppeteer = require("puppeteer");
// let cFile = process.argv[2];
// let fs = require("fs");
// (async function () {
//   // browser open => visible 
//   try{
//   let browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,

//     args: ["--start-maximized"]
//   });
//   // let page = await browser.newPage();
//   let pages = await browser.pages();
//   let page = pages[0];

//   let data = await fs.promises.readFile(cFile);
//   let { url, pwd, user } = JSON.parse(data);
//   // Login page
//   //  normal websites 
//   //  SPA => scoket maintain-> networkidle2
//   await page.goto(url, { waitUntil: "networkidle0" });
//   // let unInputWillBeFoundPromise = page.$("#input-1");
//   // let psInputWillBeFoundPromise = page.$("#input-2");
//   // let unNpsEl = await Promise.all([unInputWillBeFoundPromise, psInputWillBeFoundPromise]);
//   await page.type("#input-1", user);
//   await page.type("#input-2", pwd);

//   await Promise.all(
//     [page.waitForNavigation({ waitUntil: "networkidle0" }),
//     page.click("button[data-analytics=LoginPassword]")])
//   // ********************DashBoard*************************

//   await page.waitForSelector("a[data-analytics=NavBarProfileDropDown]", { visible: true });
//   await page.click("a[data-analytics=NavBarProfileDropDown]");
//   await Promise.all(
//     [page.waitForNavigation({ waitUntil: "networkidle0" }),
//     page.click("a[data-analytics=NavBarProfileDropDownAdministration]"),])

//   await page.waitForSelector(".administration header", { visible: true })
//   let tabs = await page.$$(".administration header ul li a");

//   let href = await page.evaluate(function (el) {
//     return el.getAttribute("href");
//   }, tabs[1])
//   let mpUrl = "https://www.hackerrank.com" + href;
//   // console.log("Line number number " + mpUrl);
//   await page.goto(mpUrl, { waitUntil: "networkidle0" });
//   // get question

//   let qidx = 0;
//   while (true) {
//     //  => qnumber => question
//     let question = await getMeQuestionElement(page, qidx, mpUrl);
//     if (question == null) {
//       console.log("All Question processed");
//       return;
//     }
//     await handleQuestion(page, question, process.argv[3]);
//     qidx++;
//   }
//   }
//   catch(err){
// console.log(err);
//   }
// })();
// async function getMeQuestionElement(page, qidx, mpUrl) {
//   let pidx = Math.floor(qidx / 10);
//   let pQidx = qidx % 10;
//   //  pageVisit 
//   console.log(pidx + " " + pQidx);
//   // go to manage challenges page => pidx=0
//   await page.goto(mpUrl);
//   await page.waitForNavigation({ waitUntil: "networkidle0" });
//   // await waitForLoader(page);
//   // you will wait for pagination 
//   await page.waitForSelector(".pagination ul li", { visible: true });
//   let paginations = await page.$$(".pagination ul li");
//   let nxtBtn = paginations[paginations.length - 2];
//   //  attribute
//   // class => 
//   let className = await page.evaluate(function (el) {
//     return el.getAttribute("class")
//   }, nxtBtn);
//   for (let i = 0; i < pidx; i++) {
//     if (className == "disabled") {
//       return null;
//     }
//     await nxtBtn.click();
//     //  wait page visible 
//     await page.waitForSelector(".pagination ul li", { visible: true });
//     //  findElements
//     paginations = await page.$$(".pagination ul li");
//     nxtBtn = paginations[paginations.length - 2];
//     //  attribute
//     className = await page.evaluate(function (el) {
//       return el.getAttribute("class")
//     }, nxtBtn);
//   }// pageQuestion
//   let challengeList = await page.$$(".backbone.block-center");
//   if (challengeList.length > pQidx) {
//     return challengeList[pQidx];
//   } else {
//     return null;
//   }
// }
// // wait until
// //  wait for selector
// // async function waitForLoader(page) {
// //   await page.waitForSelector("#ajax-msg", {
// //     visible: false
// //   });
// // }
// async function handleQuestion(page, question, uToAdd) {
//   // let qUrl = await page.evaluate(function (el) {
//   //   return el.getAttribute("href");
//   // }, question);
//   // console.log(qUrl);
//   // await page.goto(qUrl);
  
//   //  backend data 
//   // await waitForLoader(page);
//   await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), question.click()]);
//   await page.waitForSelector("li[data-tab=moderators]", { visible: true })
//   await page.click("li[data-tab=moderators]");
//   await page.waitForSelector("input[id=moderator]", { visible: true });
//   await page.type("#moderator", uToAdd);
//   await page.keyboard.press("Enter");
//   await page.click(".save-challenge.btn.btn-green")
// }

// // wait ?? 
// // goto wait for navigation ??








