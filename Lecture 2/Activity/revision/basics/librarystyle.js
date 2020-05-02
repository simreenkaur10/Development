function lib(number){
    for(let div=2;div*div<=number;div++){
        if(number%div ==0){
            return false;
        }
    }
    return true;
}
let ans = lib(21);
if(ans==true){
    console.log("Number is prime.")
}
else{
    console.log("Number is not prime.")
}