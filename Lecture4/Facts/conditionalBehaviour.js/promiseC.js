
let fs = require("fs")
let data1promise = fs.promises.readFile("../f1.txt")
data1promise.then(function(data1){
    console.log("data of f1 :"+ data1.byteLength);
    if(data1.byteLength<10){
    let f2WillBeReadPromise = fs.promises.readFile("../f2.txt")
    f2WillBeReadPromise.then(function(dat2){
    console.log("data of f2 :"+ data2.byteLength);
    if(data2.byteLength<15){
    let f4WillBeReadPromise = fs.promises.readFile("../f4.txt")
    f4WillBeReadPromise.then(function(data){
        console.log("data of f4 :"+ data.byteLength);
    })
    }
    else{
        let f5WillBeReadPromise = fs.promises.readFile("../f5.txt")
        f5WillBeReadPromise.then(function(data5){
            console.log("data of f5 :"+ data5.byteLength);
        })
    }

    })
    }
    else{
        let f3WillBeReadPromise = fs.promises.readFile("../f3.txt")
        f3WillBeReadPromise.then(function(data3){
            console.log("data of f3 :"+ data3.byteLength);
            if(data3.byteLength<20){
            let f6WillBeReadPromise = fs.promises.readFile("../f6.txt")
            f6WillBeReadPromise.then(function(data){
                console.log("data of f6 :"+ data.byteLength);
            })
            }
            else{
                let f7WillBeReadPromise = fs.promises.readFile("../f7.txt")
                f7WillBeReadPromise.then(function(data){
                    console.log("data of f7 :"+ data.byteLength);
                }) 
            }
        })
    }
}).catch(function(err){
console.log(err);
})








// let fs = require("fs")
// let data1promise = fs.promises.readFile("../f1.txt")
// data1promise.then(function(data1){
//     console.log("data of f1 :"+ data1.byteLength);
//     if(data1.byteLength<30){
//    let file2WillBeRead = fs.promises.readFile("../f2.txt")
//    return file2WillBeRead
//     }
//     else{
//         let file3WillBeRead = fs.promises.readFile("../f3.txt")
//         return file3WillBeRead
//          }
// }).then(function(data){
//     if(fs.readFileSync("../f2.txt") == data){
//     console.log("data of f2 :"+ data.byteLength)
//     if(data.byteLength<20){
//         let file4WillBeRead = fs.promises.readFile("../f4.txt")
//         return file4WillBeRead
//          }
//          else{
//              let file5WillBeRead = fs.promises.readFile("../f5.txt")
//              return file5WillBeRead
//               }
    
//     }
//     else{
//       console.log("data of f3 :"+ data.byteLength)
//       if(data.byteLength<15){
//         let file6WillBeRead = fs.promises.readFile("../f6.txt")
//         return file6WillBeRead
//          }
//          else{
//              let file7WillBeRead = fs.promises.readFile("../f7.txt")
//              return file7WillBeRead
//               }
//     }
// }).then(function(data){
//     if(fs.readFileSync("../f4.txt") == data){
//         console.log("data of f4 :"+ data.byteLength)
//     }
//     else if(fs.readFileSync("../f5.txt") == data){
//         console.log("data of f5 :"+ data.byteLength)
//     }
//     else if(fs.readFileSync("../f6.txt") == data){
//         console.log("data of f6 :"+ data.byteLength)
//     }
//     else{
//         console.log("data of f7 :"+ data.byteLength)
//     }
// }).catch(function(err){
//     console.log(err)
// })



// let fs = require("fs")
// let f1 = fs.promises.readFile("../../f1.txt")
//     .then(function (data) {
//         console.log("f1 " + data.byteLength);
//         if (data.byteLength < 20) {
//             let f2 = fs.promises.readFile("../../f2.txt")
//                 .then(function (data) {
//                     console.log("f2 " + data.byteLength)
//                     if (data.byteLength > 40) {
//                         let f4 = fs.promises.readFile("../../f4.txt")
//                             .then(function (data) {
//                                 console.log("f4 " + data.byteLength)
//                             }).catch(function (err) {
//                                 console.log(err);
//                             })
//                     }
//                     else {
//                         let f5 = fs.promises.readFile("../../f5.txt")
//                             .then(function (data) {
//                                 console.log("f5 " + data.byteLength)
//                             }).catch(function (err) {
//                                 console.log(err);
//                             })
//                     }
//                 }).catch(function (err) {
//                     console.log(err);
//                 })
//         }
//         else {
//             let f3 = fs.promises.readFile("../../f3.txt")
//                 .then(function (data) {
//                     console.log("f3 " + data.byteLength)
//                     if (data.byteLength > 50) {
//                         let f6 = fs.promises.readFile("../../f6.txt")
//                             .then(function (data) {
//                                 console.log("f6 " + data.byteLength)
//                             }).catch(function (err) {
//                                 console.log(err);
//                             })
//                     }
//                     else {
//                         let f7 = fs.promises.readFile("../../f7.txt")
//                             .then(function (data) {
//                                 console.log("f7 " + data.byteLength)
//                             }).catch(function (err) {
//                                 console.log(err);
//                             })
//                     }
//                 }).catch(function (err) {
//                     console.log(err);
//                 })
//         }
//     }).catch(function (err) {
//         console.log(err);
//     })








