let puppeteer = require("puppeteer");
let fs = require("fs");
let cFile = process.argv[2];
let infoFile = process.argv[3];
(async function(){
 let browser = await puppeteer.launch({
     headless: false,
     defaultViewport : null,
     args :["--start-maximized","--disable-notifications"]
 })
 let pages = await browser.pages();
 let page = pages[0];
await login(page,cFile)
let info = await fs.promises.readFile(infoFile)
let {name,comments} = JSON.parse(info)
await page.waitForSelector("#js_4p",{visible: true})
await page.type("#js_4p",name,{delay:400})
await page.keyboard.press("Enter",{delay:50})
}
)()
async function login(page,cFile){
     let data = await fs.promises.readFile(cFile)
     let {url,pwd,user} = JSON.parse(data);
     await page.goto(url,{waitUntil : "networkidle2" })
     await page.waitForSelector("#email",{visible : "true"})
     await page.type("#email",user,{delay : 400})
     await page.waitForSelector("#pass",{visible:true})
     await page.type("#pass",pwd,{delay:400})
     await page.waitForSelector("#u_0_b",{visible:true})
     await Promise.all([page.waitForNavigation({waitUntil:"networkidle2"},10000)],
     page.click("#u_0_b",{delay:300}) )
 }