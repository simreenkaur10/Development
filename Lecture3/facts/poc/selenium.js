require("chromedriver");
let metadataFile = process.argv[3]
let fs = require("fs");
let credentialsfile = process.argv[2];
let username,password;
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver  = bldr.forBrowser("chrome").build();
let gmodules,glectures,gquestions,gtabs;

let credentialswillbeReadPromise = fs.promises.readFile(credentialsfile);
driver.manage().setTimeouts({
    implicit:10000,
    pageLoad:10000
})
credentialswillbeReadPromise.then(function(credentials){
    credentials = JSON.parse(credentials)
    username = credentials.username;
    password = credentials.password;
let pepcodingSiteWillBeOpenedPromise = driver.get("https://www.pepcoding.com/login")
return pepcodingSiteWillBeOpenedPromise;
})
.then(function(){
    let emailwillbeFoundPromise = driver.findElement(swd.By.css("input[type=email]"))
    let passwordWillbeFoundPromise = driver.findElement(swd.By.css("input[type=password]"))
let bothfieldsareFound = Promise.all([emailwillbeFoundPromise,passwordWillbeFoundPromise]);
return bothfieldsareFound;
}).then(function(ElementsArray){
    let emailElementWillBeFilled = ElementsArray[0].sendKeys(username);   
    let passwordElementWillBeFilled = ElementsArray[1].sendKeys(password);
let keysWillbeFilledPromise = Promise.all([emailElementWillBeFilled,passwordElementWillBeFilled])
return keysWillbeFilledPromise
}).then(function(){
    let submitbuttonWillbeFound = driver.findElement(swd.By.css("button[type=submit]"))
    return submitbuttonWillbeFound;
}).then(function(submitbutton){
    let submitbuttonWillbePressedPromise = submitbutton.click();
    return submitbuttonWillbePressedPromise;
})
//*****************************login****************************************
.then(function(){
    let willWaitForTheResourcetobeLocatedPromise =driver.wait(swd.until.elementLocated(swd.By.css(".resource a")))

return willWaitForTheResourcetobeLocatedPromise;
}).then(function(resourcePageAnchor){
  let resourceanchorWillBeSelectedPromise = resourcePageAnchor.getAttribute("href");
return resourceanchorWillBeSelectedPromise;
}).then(function(pagelink){
   let pagelinkWillBeOpened = driver.get(pagelink);
   return pagelinkWillBeOpened;
}).then(function(){
    let siteOverlayWillBeFoundPromise = driver.findElement(swd.By.css("#siteOverlay"));
    return siteOverlayWillBeFoundPromise
}).then(function(soelement){
    let waitForOverlayToBeRemovedPromise = driver.wait(swd.until.elementIsNotVisible(soelement),10000);
    return waitForOverlayToBeRemovedPromise;
}).then(function(){
    let courseCardWillBeFoundPromise = driver.findElement(swd.By.css("#courseCard33"))
return courseCardWillBeFoundPromise;
}).then(function(courseCard){
    let courseCardWillBeClickedPromise = courseCard.click();
    return courseCardWillBeClickedPromise;
}).then(readingMetadata)
.catch(function(err){
    console.log(err);
})



function readingMetadata(){
    return new Promise(function(resolve,reject){
         
          let metaDataWillBeReadPromise = fs.promises.readFile(metadataFile);
          metaDataWillBeReadPromise.then(function(metaData){
            metaData =JSON.parse(metaData)
            let question = metaData[0];
            let questionwillbeRead = goToQuestionPage(question)
            return questionwillbeRead;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
function goToQuestionPage(question){
    return new Promise(function(resolve,reject){
        let weClickontheModulePromise = navigationHelper(question.module,".lis.tab");
        weClickontheModulePromise.then(function(){
        let weClickontheLecturePromise = navigationHelper(question.lecture,"li.collection-item");
        return weClickontheLecturePromise;
        }).then(function(){
        let weClickontheQuestionPromise = navigationHelper(question.question,"li.collection-item");
        return weClickontheQuestionPromise;
        }).then(function(){
            let weClickontheEditorPromise = navigationHelper("EDITOR","li.tab.bold.editorTab");
        return weClickontheEditorPromise;
        }).then(function(){
        resolve();
        }).catch(function(){
            reject();
        })
    })
}

function navigationHelper(RequiredElement,selector){
    return new Promise(function(resolve,reject){
        let gelements;   
let willWaitForTheElementToBeFound=driver.wait(swd.until.elementsLocated(swd.By.css(selector)),20000)
willWaitForTheElementToBeFound.then(function(elements){
      gelements = elements
    console.log(elements.length);
    let elementNameWillbeFoundArray =[];
    for(let i=0;i<elements.length;i++){
         let elementNameWillbeFound = elements[i].getText();
         elementNameWillbeFoundArray.push(elementNameWillbeFound);
    }
let allelementNamesPromise =Promise.all(elementNameWillbeFoundArray)
return allelementNamesPromise;
}).then(function(allElementsTextArray){
    let i;
    for(i=0;i<gelements.length;i++){
        if(allElementsTextArray[i].includes(RequiredElement)==true){
         break;
        }
    }
    let elementWillbeClickedPromise = gelements[i].click();
    return elementWillbeClickedPromise;
}).then(function(){
    resolve();
}).then(function(){
    reject();
})
    })

}






// .then(function(){
//     let willWaitForThemodulesToBeFound=driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")),1000)
//     return willWaitForThemodulesToBeFound;
// }).then(function(modules){
//     gmodules = modules
//     console.log(modules.length);
//     let moduleNameWillbeFoundArray =[];
//     for(let i=0;i<modules.length;i++){
//          let moduleNameWillbeFound = modules[i].getText();
//          moduleNameWillbeFoundArray.push(moduleNameWillbeFound);
//     }
// let allModuleNamesPromise =Promise.all(moduleNameWillbeFoundArray)
// return allModuleNamesPromise;
// }).then(function(allModulesTextArray){
//     let i;
//     for(i=0;i<gmodules.length;i++){
//         if(allModulesTextArray[i].includes("Data Structure and Algorithms")==true){
//          break;
//         }
//     }
//     let moduleWillbeClickedPromise = gmodules[i].click();
//     return moduleWillbeClickedPromise;
// })















// .then(function(){
//     let lectureswillBeFoundPromise = driver.findElements(swd.By.css("li.collection-item"));
//     return lectureswillBeFoundPromise;
// }).then(function(lectures){
// glectures = lectures;
// let lecturesNameWillBeLoadedArray=[];
// for(let i=0;i<lectures.length;i++){
//     let lecturesNameWillBeLoaded = lectures[i].getText();
//    lecturesNameWillBeLoadedArray.push(lecturesNameWillBeLoaded);
// }
// let allLectureNamesPromise = Promise.all(lecturesNameWillBeLoadedArray)
// return allLectureNamesPromise;
// }).then(function(lecturesArray){
//     let i;
//     for(i=0;i<glectures.length;i++){
//         if(lecturesArray[i].includes("Recursion")){
//             break;
//         }
//     }
//     let lectureWillBeClicked = glectures[i].click();
//     return lectureWillBeClicked;
// }).then(function(){
// let willWaitForQuestionsToGetLocated = driver.wait(swd.until.elementsLocated(swd.By.css("li.collection-item")),1000);
// return willWaitForQuestionsToGetLocated;
//     }).then(function(questions){
//           console.log(questions.length)
//         gquestions = questions;
//         let questionNamesWillBeLoadedArray = [];
//         for(let i=0;i<questions.length;i++){
//             let questionNamesWillBeLoaded = questions[i].getText();
//             questionNamesWillBeLoadedArray.push(questionNamesWillBeLoaded)
//         }
//         let allQuestionNamesPromise = Promise.all(questionNamesWillBeLoadedArray);
//         return allQuestionNamesPromise;
//     }).then(function(questionsArray){
//         let i;
//         for(i=0;i<gquestions.length;i++){
//             if(questionsArray[i].includes("Factorial")){
//                 break;
//             }
//         }
//         let questionWillBeClicked = gquestions[i].click();
//         return questionWillBeClicked;
//     }).then(function(){
//         let willWaitForEditorToGetLocated= driver.wait(swd.until.elementLocated(swd.By.css("li.tab.bold.editorTab")))
//       return willWaitForEditorToGetLocated;
//     }).then(function(editorElement){
//      let editorWillBeClickedPromise=editorElement.click();
//       return editorWillBeClickedPromise;
//     })









// let fs = require("fs");
// require("chromedriver")
// let swd = require("selenium-webdriver")
// let credentialfile = process.argv[2];
// let username,password;
// let bldr = new swd.Builder();
// let driver = bldr.forBrowser("chrome").build();
// let credentialfilewillbeReadPromise = fs.promises.readFile(credentialfile);
// credentialfilewillbeReadPromise.then(function (credentials){
//     credentials = JSON.parse(credentials);
//     username = credentials.username;
//     password = credentials.password
// let pagewillbeopenedPromise = driver.get("https://www.pepcoding.com/login")
// return pagewillbeopenedPromise;
// })
// .then(function(){
// console.log("abhi tak sirf page open hua hai")
// let emailwillbeselectedPromise = driver.findElement(swd.By.css("input[type=email]"));
// return emailwillbeselectedPromise;
// }).then(function(emailElement){
//     let emailWillBeFilledPromise =emailElement.sendKeys(username);
//     return emailWillBeFilledPromise;
// }).then(function(){
//   let passwordWillbeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
//   return passwordWillbeSelectedPromise
// }).then(function(passwordElement){
//     let passwordWillBeFilledPromise = passwordElement.sendKeys(password);
//     return passwordWillBeFilledPromise;
// }).then(function(){
//     let submitWillbeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
//     return submitWillbeSelectedPromise;
// }).then(function(submitbutton){
//     let submitbuttonWillBeClickedPromise = submitbutton.click();
//     return submitbuttonWillBeClickedPromise;
// })
// //-----------------------login page--------------------------------
// .then(function(){
//     //resource cARd finD
//     let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".resource a")))
//      return willWaitForResourceToLoad
//  })
//  .then(function(){
//      let resourceanchorWillBeSelectedPromise=driver.findElement(swd.By.css(".resource a"))
//      return resourceanchorWillBeSelectedPromise;
//  })
//  .then(function(resourcePageAnchor){
//      let rPageLinkPromise = resourcePageAnchor.getAttribute("href");
//      return rPageLinkPromise;
//      //resourcePage
//  }).then(function(rPageLink){
//      let NavigateToCourseListPage = driver.get(rPageLink);
//      return NavigateToCourseListPage;
//  }).then(function(){
//      let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
//      return siteOverlayWillBeSelectedPromise;

//  }).then(function(soe){
//      let waitForOverlayToRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe),10000);
//      return waitForOverlayToRemovePromise;
//  }).this(function(){
//     let coursewillBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"));
//     return coursewillBeLocatedPromise;
//  })
//  .this(function(courseCard){
//   courseCardWillBeClickedPromise = courseCard.click();
//   return courseCardWillBeClickedPromise;
// })
//  .this(function(){
//      let lisTabToBeLocatedPromise = driver .wait(swd.until.elementsLocated(swd.By.css(".lis.tab")),1000)
 
//  return lisTabToBeLocatedPromise;
//    }).this(function(){
// let modulesWillBeSElectedPromise = driver.findElements(swd.By.css(".lis.tab"));
// return modulesWillBeSElectedPromise;
//    }).then(function(modules){

//    })
// .catch(function(err){
//     console.log(err);
// })














//when i clicked editor by selecting all the tabs

// .then(function(){
//     let willWaitForEditorToGetLocated= driver.wait(swd.until.elementsLocated(swd.By.css("li.tab.bold")))
//   return willWaitForEditorToGetLocated;
// }).then(function(tabs){
//     console.log(tabs.length);
//     gtabs=tabs;
//     let tabsTextWillBeLoadedArray=[];
//     for(let i=0;i<tabs.length;i++){
//         let tabsTextWillBeLoaded = tabs[i].getText();
//         tabsTextWillBeLoadedArray.push(tabsTextWillBeLoaded)
//     }
//     let allTabsTextPromise=Promise.all(tabsTextWillBeLoadedArray)
//     return allTabsTextPromise;
// }).then(function(tabsTextArray){
//     let i;
//     for(i=0;i<tabsTextArray.length;i++){
//         if(tabsTextArray[i].includes("EDITOR")){
//             break;
//         }
//     }
//   let editorWillBeClickedPromise =  gtabs[i].click();
//   return editorWillBeClickedPromise;
// })