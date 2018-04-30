function spiral(num){
    var matrix = []
    var tampung = []
    var hasil = []
    var i = 0
    while(i < num*num){
        if(tampung.length < num){
            if(matrix.length == num-1){
                matrix.push(tampung)
            }
            tampung.push(i)
        }else{
            matrix.push(tampung)
            tampung = []
            tampung.push(i)
        }
        i++
    }

    let atas = 0, kiri = 0, bawah = num, kanan = num, arah = 'kanan';
    while(atas<=bawah && kiri<=bawah){
        if(arah == 'kanan'){
            for(var i = atas; i < kanan; i++){
                hasil.push(matrix[atas][i])
            }
            atas+=1
            arah='bawah'
        }else if(arah == 'bawah'){
            for(var i = atas; i < kanan; i++){
                hasil.push(matrix[i][kanan-1])
            }
            kanan-=1
            arah = 'kiri'
        }else if(arah == 'kiri'){
            for(var i = bawah-2; i >= kiri; i--){
                hasil.push(matrix[bawah-1][i])
            }
            bawah-=1
            arah='atas'
        }else if(arah == 'atas'){
            for(var i = bawah-1; i > kiri; i--){
                hasil.push(matrix[i][kiri])
            }
            kiri+=1
            arah='kanan'
        }
    }

    console.log(hasil.toString())
}
spiral(5)