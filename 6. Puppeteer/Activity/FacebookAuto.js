let puppeteer = require("puppeteer");
let fs = require("fs");
let cFile = process.argv[2];
let pageUrl = process.argv[3];
let noOfPosts = process.argv[4];
(async function(){
    try{
 let browser = await puppeteer.launch({
     headless : false ,
     defaultViewport :null,
     slowMo: 100,
     args:["--disable-notifications"]

 })
 let tabs=await browser.pages();
 let tab = tabs[0];
await login(tab,cFile);
await tab.goto(pageUrl,{waitUntil:"networkidle2"})
await tab.waitForSelector("div[data-key=tab_posts]")
await Promise.all([tab.waitForNavigation({waitUntil:"networkidle2"}),
tab.click("div[data-key=tab_posts]")])
await tab.waitForNavigation({waitUntil:"networkidle2"})
let idx = 0;
do{
//wait for the first seven questions to get loaded
await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager")
//then select the present 7 posts
let allPosts = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8")
//select each post turn by turn
let post = allPosts[idx];
//search for like
await tab.waitForSelector("._666k ._8c74")
let like =await post.$("._666k ._8c74")
await like.click({delay:100})
console.log(idx)
if(idx ===7 ||( idx-1)%7===0){
   await tab.$(".uiMorePagerLoader")
  //let loader = await tab.$(".uiMorePagerLoader")
  await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
  let chain = await tab.$("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
await tab.evaluate(function(el){
    console.log("executing")
    el.scrollIntoView();
},chain)
await tab.waitForSelector(".uiMorePagerLoader",{hidden : true})
}
idx++;
}
while(idx<noOfPosts);
await browser.close();
}
catch(err){
        console.log(err)
    }
})();
async function login(tab,cFile){
    let data = await fs.promises.readFile(cFile)
    let {url,user,pwd} = JSON.parse(data);
    await tab.goto(url,{waitUntil : "networkidle2"})
    await tab.waitForSelector("#email",{visible:true})
    await tab.type("#email",user,{delay : 300})
    await tab.type("#pass",pwd,{delay : 300})
    await Promise.all([tab.waitForNavigation({waitUntil : "networkidle2"}),
   tab.click("#loginbutton")])
  }











// let puppeteer = require("puppeteer");
// let cFile = process.argv[2];
// let fs = require("fs");
// let pUrl = process.argv[3];
// let nPost = process.argv[4];
// (async function () {
//   // browser create => icognito mode,fullscreen
//   try {
//     let data = await fs.promises.readFile(cFile);
//     let { url, pwd, user } = JSON.parse(data)[1];
//     // launch browser
//     let browser = await puppeteer.launch({
//       headless: false,
//       defaultViewport: null,
//       args: ["--start-maximized", "--disable-notifications"]
//     });
//     // tab
//     let tabs = await browser.pages();
//     let tab = tabs[0];
//     // dom => html 
//     //  browser=> 500ms request 
//     // hk login page
//     await tab.goto(url, { waitUntil: "networkidle2" });
//     await tab.waitForSelector("input[type=email]");
//     await tab.type("input[type=email]", user, { delay: 120 });
//     await tab.type("input[type=password]", pwd, { delay: 120 });
//     //  _1xnd => group of post 
//     // _4-u2 _4-u8=> particular post
//     //  inside ._1xnd
//     // descendent => select 
//     // 1xnd => last
//     await Promise.all([
//       tab.click(".login_form_login_button"), tab.waitForNavigation({
//         waitUntil: "networkidle2"
//       })
//     ])
//     await tab.goto(pUrl, { waitUntil: "networkidle2" });
//     await tab.waitForSelector("div[data-key=tab_posts]");
//     //  post => click => reroute=> 2 times=> 2 times (wait for navigation)
//     await Promise.all([
//       tab.click("div[data-key=tab_posts]"),
//       tab.waitForNavigation({waitUntil:"networkidle2"})
//     ])
//     await tab.waitForNavigation({waitUntil:"networkidle2"});
     
//     let idx = 0;
//     do {
//       //  post => 7 post => are loaded 
//       await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
//       // children selector

//       let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8") 
//       // saftey
// // console.log(elements.length);
//       let post = elements[idx];
// // like -> selector
//       await tab.waitForSelector("._666k ._8c74");
//       let like = await post.$("._666k ._8c74");
//       await like.click({delay:100});
//       idx++;
//       await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
//       //  wait for loader => visible => content load =>
//       // hidden=> may post => wait for loader 
//       //  loader  hide wait 
//       // immediate child
//       //  descendent 
//     } while (idx < nPost)
//     // await browser.close();
//   } catch (err) {
//     console.log(err)
//   }
// })()


// // div class="1xnd"
// //     div 
// //       ul
// //         li
// //           div class="_4-u2 4-u8"



// // div class="1xnd"
// //   div class="_4-u2 4-u8"