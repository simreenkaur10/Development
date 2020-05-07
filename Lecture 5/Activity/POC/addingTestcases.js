let fs = require("fs")
let cFile = process.argv[2];
let qFile = process.argv[3];

require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

(async function(){
    try{

        await driver.manage().setTimeouts({
            implicit:30000,
            pageLoad:30000
        })
        
    await login(cFile);
    
    //************WELCOME TO DASHBOARD**************/
let element = await driver.wait(swd.until.elementLocated(swd.By.css(".dropdown.profile-menu.cursor")))
    await element.click()
    let administration = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"))
    await administration.click();
    await removeLoader()
    let manageTabs = await driver.findElement(swd.By.css("#content > div > div > div > section > header > ul > li:nth-child(2) > a"));
    await manageTabs.click();
    await removeLoader();
    let challangeUrl =await driver.getCurrentUrl();
    let questions = require(qFile);
    for(let i=0;i<questions.length;i++){
        let qindex = i;
        let question = await getMeTheElement(qindex,challangeUrl);
        await addTests(question,questions[i]);
    }
}
catch(err){
    console.log(err);
    }
}
)();
async function getMeTheElement(ques,challangeUrl){
    let pageNo = Math.floor(ques/10);
    let questionIndexonTheFoundPage = ques%10;
    await driver.get(challangeUrl)
    await removeLoader();
    let paginations = await driver.findElements(swd.By.css(".pagination li"))
    let nextButton = paginations[paginations.length-2]
    let className = nextButton.getAttribute("class")
    for(let i=0; i<pageNo;i++){
        if(className=="disabled"){
            return null;
        }
        await nextButton.click();
        removeLoader();
        paginations = (await driver).findElements(swd.By.css(".pagination li"))
        nextButton = paginations[paginations.length-2]
        className = nextButton.getAttribute("class");
    }
    let  listOfQuestions = await (await driver).findElements(swd.By.css(".backbone.block-center"))
    if(listOfQuestions.length>questionIndexonTheFoundPage){
        return listOfQuestions[questionIndexonTheFoundPage];
    }
else{
    return null;
}
}

async function removeLoader(){
    loader = await driver.findElement(swd.By.css("#ajax-msg"))
    await driver.wait(swd.until.elementIsNotVisible(loader))
}
async function addTests(qElement,question){
    let tests = question["Testcases"];
    await qElement.click();
    await removeLoader();
    await driver.wait(swd.until.elementLocated(swd.By.css("span.tag")))
    await removeLoader();
    let testsTab = await driver.wait(swd.until.elementLocated(swd.By.css("li[data-tab=testcases]")))
   await testsTab.click();
   await removeLoader();
   for(let i=0;i<tests.length;i++){
   await driver.wait(swd.until.elementLocated(swd.By.css(".btn.add-testcase.btn-green")))
   let addingtest = await driver.findElement(swd.By.css(".btn.add-testcase.btn-green"));
   await addingtest.click();
   let inputelement = await driver.findElement(swd.By.css(".input-testcase-row .CodeMirror-wrap div textarea"))
  await handleEditorial(".input-testcase-row .CodeMirror-wrap div",inputelement,tests[i].Input)
   let outputelement = await driver.findElement(swd.By.css(".output-testcase-row .CodeMirror-wrap div textarea"))
   await handleEditorial(".output-testcase-row .CodeMirror-wrap div",outputelement,tests[i].Output)
  let button = await driver.findElement(swd.By.css(".save-testcase"))
  await button.click();
  
   let ctime=Date.now();
 while(Date.now()<=ctime+4000){
     
 }
}
let saveButton = await driver.findElement(swd.By.css(".save-challenge.btn"))
 await saveButton.click();
}
async function handleEditorial(parent,element,data){
    let parentElement = await driver.findElement(swd.By.css(parent))
    await driver.executeScript("arguments[0].style.height='10px'",parentElement)
await element.sendKeys(data)
}

async function login(cFile){
    let data = await fs.promises.readFile(cFile);
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

}