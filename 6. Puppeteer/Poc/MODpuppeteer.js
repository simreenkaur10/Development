// let puppeteer = require("puppeteer")
// let fs = require("fs")
// let credentialsFile = process.argv[2];
// (function(){
// let browser = await puppeteer.launch({
//     headless : false ,
//     defaultViewport:null
// })
// let pages =await browser.pages();
// })()



let puppeteer = require("puppeteer");
let fs = require("fs")
let cFile =  process.argv[2];
(async function(){
let browser = await puppeteer.launch({
    headless:false,
    defaultViewport: null,
    args :["--incognito","--start-maximized"]
});
let pages = await browser.pages();
let page = pages[0];

let data = await fs.promises.readFile(cFile)
let {url,pwd,user} = JSON.parse(data);
await page.goto(url,{waitUntil:"networkidle0"})
await page.type("#input-1",user)
await page.type("#input-2",pwd)
await page.click("button[data-analytics=LoginPassword]")
})();