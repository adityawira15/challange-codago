function deretKaskus(n){
    var hasil = []
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i]%5 === 0 && arguments[i]%6 === 0){
        hasil.push('KASKUS')
      }else if(arguments[i]%5 === 0){
        hasil.push('KAS')
      }else if(arguments[i]%6 === 0){
        hasil.push('KUS')
      }else{
        hasil.push(arguments[i])
        }
    }
    return hasil
  }
  
  console.log(deretKaskus(5,6,60,1))