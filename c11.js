const readline = require('readline');
const fs = require('fs')
const { URL } = require('url');
 
const rl = readline.createInterface({
  			input: process.stdin,
  			output: process.stdout,
  			prompt: "Selamat datang di Tebak Kata!" 
		});

// rl.prompt();

var content = JSON.parse(fs.readFileSync('jawaban.json','utf8'));
	// console.log(content[0].definition)


var recursiveAnswer = (num) => {
	if(num == content.length){
		rl.close();
		console.log('thanks for playing!')
	}else {
			rl.question(content[num].definition, (answer) => {
			if (answer == content[num].term) {
				console.log('Hore Kamu Benar!')
				recursiveAnswer(num+1);
			}else {
				console.log('wkwkwk, Kamu Kurang Beruntung!')
				recursiveAnswer(num);
			}
			
		})
	}
}
recursiveAnswer(0)