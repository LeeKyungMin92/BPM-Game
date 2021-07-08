for(var n=5;n<51;n++){
    for(var m=2;m<n;m++){
        if(n%m==0) break
        if(m==n-1) console.log(n+" is a prime number")
    }
}
