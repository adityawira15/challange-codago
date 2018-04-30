function pola(str){
	let num = str.split(' ')
	let tebak = num[0].split('')
	let tebak1 = num[4].split('')
	let change = tebak.indexOf('#')
	let change1 = tebak1.indexOf('#')
	let tampung = []
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 10; j++){
			tebak[change] = i
			tebak1[change1] = j
			if( tebak.join('')*num[2] == tebak1.join('')){
				tampung.push(i,j)
			}
		}
	}
	console.log(tampung)

}

pola("42#3 * 188 = 80#204")
pola("8#61 * 895 = 78410#5")