let puppeteer = require("puppeteer")
let uName = process.argv[3];
let fs = require("fs")
let credentialsFile = process.argv[2];
(async function(){

    try{
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        
    })

let  tabs = await browser.pages();
let tab = tabs[0]
let data =await fs.promises.readFile(credentialsFile)
let {url,user,pwd} = JSON.parse(data)
await tab.goto(url,{ waitUntil: "networkidle0" })
await tab.type("#input-1",user)
await tab.type("#input-2",pwd)

  await Promise.all(
    [tab.waitForNavigation({ waitUntil: "networkidle0" }),
    tab.click("button[data-analytics=LoginPassword]")])

//*****************************DashBoard***************************************//
await tab.waitForSelector(".dropdown.dropdown.dropdown-auth",{visible :true})
await tab.click(".dropdown.dropdown.dropdown-auth");
await Promise.all([tab.waitForNavigation({waitUntil: "networkidle0"}),
tab.click("a[data-analytics=NavBarProfileDropDownAdministration]")])
await tab.waitForSelector("#content > div > div > div > section > header > ul > li:nth-child(2) > a",{visible:true})
await Promise.all([tab.waitForNavigation({waitUntil:"networkidle0"}), tab.click("#content > div > div > div > section > header > ul > li:nth-child(2) > a")]);
let challangeurl = tab.url();
await handleSinglePageQuestions(tab,browser);
}
catch(err){
    console.log(err)
}
}
)()

async function handleSinglePageQuestions(tab,browser){
    await tab.waitForSelector(".backbone.block-center");
    let quesOnPage = await tab.$$(".backbone.block-center")
let pArr = [];
for(let i=0;i<quesOnPage.length;i++){
    let href = await tab.evaluate(function(el){
        return el.getAttribute("href");
    },quesOnPage[i]);
let newTab = await browser.newPage();
let mWillBeAddedToTheQPromise = addModerator(newTab,"https://www.hackerrank.com"+href,uName);
pArr.push(mWillBeAddedToTheQPromise);
}
await Promise.all(pArr);
await tab.waitForSelector(".pagination ul li");
let paginations = await tab.$$(".pagination ul li")
let nextBtn = paginations[paginations.length-2]
let className = await tab.evaluate(function(nextBtn){
return nextBtn.getAttribute("class");
},nextBtn)

if(className=="disabled"){
    return;
}
else{
    await Promise.all([nextBtn.click(),tab.waitForNavigation({waitUntil:"networkidle0"})])
    handleSinglePageQuestions(tab,browser)
}
}
async function addModerator(tab,url,uName){
    await tab.goto(url,{waitUntil:"networkidle0"})
    await tab.waitForSelector('span.tag',{visible:true})
    await tab.waitForSelector(".nav-tabs li[data-tab = moderators]",{visible:true})
    await tab.click(".nav-tabs li[data-tab = moderators]")
    await tab.waitForSelector("#moderator",{visible:true})
    await tab.type("#moderator",uName)
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn-green");
}
