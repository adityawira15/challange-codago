function weirdMultiply(num){
    var tampung = num.toString().split('')
    var hasil = 1
    
    for(var i = 0; i < tampung.length; i++){
        hasil *= tampung[i]
        console.log(tampung[i])
      }
    
    if(hasil < 0){
      console.log(-1)
    }else if (hasil < 10){
      console.log(hasil)
    }else {
      weirdMultiply(hasil)
    }
  }
  
  weirdMultiply(999)