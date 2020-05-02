function oddeven(arr){
        if(arr%2==0){
         return    arr=arr+1;
        }
        else{
               return arr=arr-1;   
        }
    
}
function prime(ele){
    
        for(let div=2;div*div<=ele;div++){
            if(ele%div==0){
                return false;
            }
    }
    return true;
}
let a=[1,4,5,6,8,34,12];
console.log(a.map(oddeven));
let a1=a.map(oddeven)
a1=a1.filter(prime);
console.log(a1);