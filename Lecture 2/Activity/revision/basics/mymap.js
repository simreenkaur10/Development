Array.prototype.mymap=function mapp(cb){
let arr=[];
    for(let i=0;i<this.length;i++){
        arr.push(cb(this[i]));
    }
    return arr;
} 
Array.prototype.myfilter = function (cb){
    let a= [];
    for(let i=0;i<this.length;i++){
        if(cb(this[i])){
            a.push(this[i]);
        }
    }
    return a;
}
function printEven(ele){
  if(ele%2==0){
      return true;
  }
  else{
      return false;
  }
}
function oddeven(arr){
    if(arr%2==0){
     return    arr=arr+1;
    }
    else{
           return arr=arr-1;   
    }

}
let a2=[2,4,5,6,7,3];

console.log(a2.mymap(oddeven));
let a3 = a2.mymap(oddeven);
let a4 = a3.myfilter(printEven);
console.log(a4);