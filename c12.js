const readline = require('readline');
const fs = require('fs')
const { URL } = require('url');
 
const rl = readline.createInterface({
  			input: process.stdin,
  			output: process.stdout,
  			prompt: "Selamat datang di permainan Tebak-Tebakan!,\n" + 
  			"kamu akan di berikan pertanyaan dari file ini 'jawaban.json'.\n" +
  			" Untuk bermain, jawablah dengan jawaban yang sesuai.\n" +
  			" Gunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan di tanya lagi." 
		});

rl.prompt();

var content = JSON.parse(fs.readFileSync('jawaban.json','utf8'));

var salah = 0;
var tampung= [];

var skip = (num) => {
	if (num == tampung.length) {
		rl.close();
		console.log('thanks for playing')
	}else{
		rl.question(tampung[num].definition, (answer) => {
			if (answer == tampung[num].term) {
				console.log('Anda Beruntung!')
				skip(num+1);
			}
			else {
				salah += 1
				console.log(`Anda Kurang Beruntung!, anda telah salah ${salah} kali, silahkan coba lagi`)
				skip(num)
			}
		})
	}
	
}

var recursiveAnswer = (num) => {
	if(num == content.length){
		if(tampung.length == 0){
			rl.close();
			console.log('thanks for playing!')
		}else {
			salah = 0
			skip(0)
		}
	}else {
			rl.question(content[num].definition, (answer) => {
			if (answer == content[num].term) {
				console.log('Anda Beruntung!')
				recursiveAnswer(num+1);

			}else if(answer == 'skip'){
				tampung.push(content[num])
				recursiveAnswer(num+1);
			}else {
				salah += 1;
				console.log(`Anda Kurang Beruntung!, anda telah salah ${salah} kali, silahkan coba lagi.`)
				recursiveAnswer(num);
			}
			
		})
	}
}
recursiveAnswer(0)