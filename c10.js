const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (word) => {
 var hasil = []
  var manipulations = word.split(' ')
  var manipulation = []
  for(var i=0; i<manipulations.length; i++){
    manipulation.push(manipulations[i].split(''))
  }
  for(var i=0; i<manipulation.length;i++){
    if(manipulation[i][0] === 'a' || manipulation[i][0] === 'i' || manipulation[i][0] === 'u' || manipulation[i][0] === 'e' || manipulation[i][0] === 'o' ){
         hasil.push(manipulation[i].join(''))
         
    } else {
         hasil.push(manipulation[i].slice(1,manipulation[i].lentgh).join('') + manipulation[i][0] + 'nyo')
    }
  }
  console.log(hasil.join(' '))

  rl.close();
});