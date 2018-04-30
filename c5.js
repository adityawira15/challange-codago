function stringManipulation(word){
    var hasil = ''
    var manipulation = word.split('')
    if(manipulation[0] === 'a' || manipulation[0] === 'i' || manipulation[0] === 'u' || manipulation[0] === 'e' || manipulation[0] === 'o' ){
      hasil = word
    }else {
      hasil = manipulation.splice(1,manipulation.length)
      hasil.push(manipulation[0] + 'nyo')
      hasil = hasil.join('')
    }
    console.log(hasil)
  }
  
  stringManipulation('bebek')
  stringManipulation('ayam')