let puppeteer = require("puppeteer");
let url = process.argv[2];
let item = process.argv[3];
let fs = require("fs");
(async function(){
    try{
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args :["--disable-notifications"]
    })
    let pages = await browser.pages();
    let page =  pages[0];
    await page.goto(url,{waitUntil:"networkidle2"})
    await page.click("._2AkmmA._29YdH8")

    await page.waitForSelector(".O8ZS_U .LM6RPg",{visible:true})
    await page.type(".O8ZS_U .LM6RPg",item)
    await page.keyboard.press("Enter")
    }
    catch(err){
        console.log(err);
    }
})()




