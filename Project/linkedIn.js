let puppeteer = require("puppeteer");
let x=0,y=0,z=0;
let name,name2,name3;
let fs = require("fs")
let path = require("path")
let cFile = process.argv[2];
let jobFolder = process.argv[3];
let nPosts = process.argv[4];
let state1= process.argv[5];
let state2=process.argv[6];
(async function(){
    try{
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args :["--start-maximized","--disable-notifications"]
    })
    let pages = await browser.pages();
    let page =  pages[0];
    await login(page,cFile);
    await page.waitForSelector("#jobs-tab-icon")
    await Promise.all([page.waitForNavigation({ waitUntil:"networkidle2"}),
    page.click("#jobs-tab-icon")])
    //  await page.type(".jobs-search-box__input--keyword div div > input","    web development",{delay:300})
    //  await page.keyboard.press("Enter")
    //  await page.type(".jobs-search-box__input--location div div > input","India",{delay:300})
    //  await page.keyboard.press("Enter")
    await page.waitForSelector("ul li div.artdeco-carousel__item-container div a")
    let recents = await page.$$("ul li div.artdeco-carousel__item-container div a")
    let pUrl = await page.evaluate(function(el){
        return el.getAttribute("href");
    },recents[0])

    await page.goto("https://www.linkedin.com"+pUrl,{waitUntil:"networkidle2"})
    await singlePage(page,nPosts,0,0);
    
}
    catch(err){
        console.log(err);
    }
})()
async function login(page,cFile){
   let data = await fs.promises.readFile(cFile);
   let {url,user,pwd} = JSON.parse(data);
await page.goto(url,{waitUntil:"networkidle2"})
// await page.waitForSelector("#loader-wrapper.hidden",{visible:true})
await page.waitForSelector("#username",{visible:true})
await page.type("#username",user,{delay:300})
await page.waitForSelector("#password",{visible:true})
await page.type("#password",pwd,{delay:300})
await Promise.all([page.waitForNavigation({ waitUntil:"networkidle2"}),page.click(".login__form_action_container ",{delay:100})])
}
async function singlePage(page,nPosts,opened,pageNo){
    await page.waitForSelector(`li[data-test-pagination-page-btn= "${pageNo+2}"]`)
    let button = await page.$(`li[data-test-pagination-page-btn="${pageNo+2}"]`)
    if(button===undefined || opened===nPosts){
        return;
    }
    let idx = 0;
    while(idx<25 && opened!=nPosts){
    if((idx===7 || idx>7) && !(idx>22)){
        await page.waitForSelector(".jobs-search-results__job-card-search--generic-occludable-area")
        let loads = await page.$$(".jobs-search-results__job-card-search--generic-occludable-area")
    }
    await page.waitForSelector("li.occludable-update div > div.artdeco-entity-lockup > div h3 a")
    let jobs = await page.$$("li.occludable-update div > div.artdeco-entity-lockup > div h3 a")
    let job = jobs[idx]
    await singleJobWok(page,job);
    idx++;
    opened++;
}
if(opened===nPosts){
    return;
}
if(idx == 25){
await page.waitForSelector(`li[data-test-pagination-page-btn="${pageNo+2}"]`)
await Promise.all([button.click(),page.waitForNavigation({waitUntil:"networkidle2"})])
await singlePage(page,nPosts,opened,pageNo+1)
}
}
async function singleJobWok(page,job){
    await job.click();
    await page.click(".jobs-save-button",{delay:50})
    await page.waitFor(1000)
    let jobInfo = await page.evaluate(() => {
    let url = "https://www.linkedin.com" + document.querySelector(".jobs-details-top-card__content-container > a").getAttribute("href");
    let selects = document.querySelectorAll(".jobs-details-top-card__company-info .jobs-details-top-card__bullet")
    let location = selects[selects.length-1].innerText;
    let company = document.querySelector(".jobs-details-top-card__company-info >a");
if(company ==undefined){
   let text = document.querySelector(".jobs-details-top-card__company-info").innerText;
  text = text.replace("Company Name","");
  text = text.replace("Company Location","");
  text = text.replace(location,"")
   company = text;
}
else{
      company = company.innerText;
}
      return {url , company , location}
    })
    console.log(JSON.stringify(jobInfo),null,2)
    console.log(jobInfo.location)
    if(jobInfo.location.includes(state1)==true){
        if(x==0){
         name = path.join(jobFolder,state1)
         fs.mkdirSync(name)
        }
       let filePath = path.join(name,`job-${x+1}.json`)
      fs.writeFile(filePath,JSON.stringify(jobInfo,null,2),
     (err) => err ? console.log("Data not written !",err) :console.log("Data written !")
      )
      x++;   
    }
    else if(jobInfo.location.includes(state2)==true){
        if(y==0){
         name2 = path.join(jobFolder,state2)
        fs.mkdirSync(name2)
        }
      let filePath2 = path.join(name2,`job-${y+1}.json`)
      fs.writeFile(filePath2,JSON.stringify(jobInfo,null,2),
     (err) => err? console.log("Data not written !",err) :console.log("Data written !")
      )   
      y++;
    }
    else{
        if(z==0){
       name3 = path.join(jobFolder,"Other")
      fs.mkdirSync(name3)
        }
      let filePath3 = path.join(name3,`job-${z+1}.json`)
      fs.writeFile(filePath3,JSON.stringify(jobInfo,null,2),
     (err) => err? console.log("Data not written !",err) :console.log("Data written !")
      )
      z++;   
    }
}