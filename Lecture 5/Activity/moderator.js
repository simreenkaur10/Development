// let fs = require("fs");
// require("chromedriver");
// let swd = require("selenium-webdriver");
// let bldr = new swd.Builder();
// let driver = bldr.forBrowser("chrome").build();
// let credentialsFile = process.argv[2];
// (async function(){
//     try{
//     let data = await fs.promises.readFile(credentialsFile);
//     let {user,pwd,url} = JSON.parse(data);
//     // await driver.manage().setTimeouts({
//     //     implicit:10000 ,
//     //     pageLoad:10000
//     // })
//     await driver.get(url)
//     let userEmailWillBeFound = driver.findElement(swd.By.css("#input-1"));
//     let userPasswordWillBeFound = driver.findElement(swd.By.css("#input-2"));
//     let emailAndPasswordElements = await Promise.all([userEmailWillBeFound,userPasswordWillBeFound])
//               let emailWillBeFilled = emailAndPasswordElements[0].sendKeys(user);
//               let passwordWillBeFilled = emailAndPasswordElements[1].sendKeys(pwd);
//               await Promise.all([emailWillBeFilled,passwordWillBeFilled])
//     let submitButtonIsFound = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"));
//     await submitButtonIsFound.click();
//     console.log("We are logged in.");
// }
// catch(err){
// console.log(err);
// }
// })()










let fs = require("fs");
require("chromedriver");
let swd = require("selenium-webdriver");
let bldr =new swd.Builder();
let driver = bldr.forBrowser("chrome").build();
let credentials = process.argv[2];
(async function(){
    try{
           await driver.manage().setTimeouts({
                implicit:30000,
                pageLoad:30000
            })
let data = await fs.promises.readFile(credentials);
let {url,user,pwd} = JSON.parse(data);
   await driver.get(url);
     let emmailWillBeFound =  driver.findElement(swd.By.css("#input-1"));
     let passWillBeFound = driver.findElement(swd.By.css("#input-2"));
      let emAndPassElements = await Promise.all([emmailWillBeFound,passWillBeFound])
      let emailWillBeFilled = emAndPassElements[0].sendKeys(user)
      let passwordWillBeFilled = emAndPassElements[1].sendKeys(pwd)
      await Promise.all([emailWillBeFilled,passwordWillBeFilled])
      let submitButtonIsFound =  await driver.wait(swd.until.elementLocated(swd.By.css("button[data-analytics=LoginPassword]")))
       await submitButtonIsFound.click();
    let adminAnchor = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"))
     let adminAnchorLink = await adminAnchor.getAttribute("href")
     await driver.get(adminAnchorLink)
    //    let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"));
    //    await manageTabs[1].click();
 let manageTabs = await driver.findElement(swd.By.css("#content > div > div > div > section > header > ul > li:nth-child(2) > a"));
       await manageTabs.click();


    }
    catch(err){
        console.log(err);
    }
})()