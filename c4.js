function indexPrime (num){
	var nums = []
	var prima = false
	for(var i = 2; i <= num*num; i++){
		if(i>=2){
			prima = true;
			for(var j = 2; j < i; j++){
				if(i%j == 0){
					prima = false;
				}
			}
		}
		if(prima == true){
			nums.push(i)
		}
	}
	console.log(nums[num-1])
}

indexPrime(4)