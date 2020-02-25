let arr = [2, 6, 17, 28, 46, 68];

// const map1 = arr.map(function num(n){
//     if(n%2==0){
//        return (n=n+1);
//     }
//     else{
//       return (n=n-1);
//     }
// });
// const prime = map1.filter(function pr(number){
//     var f=0
//     for(let div=2;div*div<=number;div++){
//         if(number%div==0){
//             f=1
//     }
//     }
//     if(f==0)
//     return number


// });
// console.log(prime)
function num(n) {
    if (n % 2 == 0) {
        return (n = n + 1);
    }
    else {
        return (n = n - 1);
    }
}
function mymap(arr, num) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        arr2[i] = num(arr[i]);
    }
    return arr2;
}
let newarr = mymap(arr, num);
console.log(newarr)

function prime(n) {

    for (var i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false
        }
        else
            return true
    }
}

function filter(arr, prime) {
    var arr3 = [], j = 0
    for (var i = 0; i < arr.length; i++) {
        var q = prime(arr[i]);
        if (q == true) {

            arr3[j] = arr[i]
            j++;

        }

    }
    return arr3;
}
var n = filter(newarr, prime)
console.log(n)