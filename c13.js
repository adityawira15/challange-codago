var fs = require('fs')
 
 var data = JSON.parse(fs.readFileSync('dataC13.json', 'utf8', (err, data) => {
                if(err) throw err
                    return data
            }))

 var dataBaru = data.belum.concat(data.sudah)
 var split = process.argv[2].split(':')
 var dataTag = Object.values(data.tag)
 var keyTag = Object.keys(data.tag)
 if(split[0] == 'filter'){
    for(var i = 0; i < keyTag.length; i++){
        if(dataTag[i].indexOf(split[1]) != -1){
            console.log(`1. [X] ${dataBaru[keyTag[i]]}`)
        }else{
            console.log('data ini tidak tersedia')
        }
    }
 }else{
    switch(process.argv[2]){
        case 'add':
        var tambah = ''
           for(var i = 3; i < process.argv.length; i++){
               if(i == process.argv.length-1){
                   tambah += process.argv[i]
               }else{
                   tambah += process.argv[i] + ' '
               }
           }
           data.belum[data.jumlah] = tambah
           data.jumlah += 1
           fs.writeFile('dataC13.json', JSON.stringify(data), (err) => {
               if(err) throw err
               console.log(`"${tambah}" telah di tambahkan`)
           })
           break;
        case 'list':
           console.log('Daftar Pekerjaan: ')
           for(var i = 0; i < dataBaru.length; i++){
               if(i < data.belum.length){
                   console.log(`${i+1}. [ ] ${dataBaru[i]}`)
               }else{
                   console.log(`${i+1}. [X] ${dataBaru[i]}`)
               }
           }
   
           break;
        case 'delete':
           var sementara = data.belum[process.argv[3]-1]
           data.jumlah -= 1
           data.belum.splice(process.argv[3]-1, 1)
           fs.writeFile('dataC13.json', JSON.stringify(data), (err) => {
               if(err) throw err
               console.log(`"${sementara}" telah di hapus dari daftar`)
           })
           break;
        case 'task':
           if(process.argv[3] <= data.belum.length){
               console.log(`${process.argv[3]}. [ ] ${dataBaru[process.argv[3]-1]}`)
           }else{
               console.log(`${process.argv[3]}. [X] ${dataBaru[process.argv[3]-1]}`)
           }
           break;
        case 'complete':
           if(process.argv[3] <= data.belum.length){
               console.log(`"${data.belum[process.argv[3]-1]}" telah selesai`)
           data.sudah.push(data.belum[process.argv[3]-1])
           data.belum.splice(process.argv[3]-1, 1)
           fs.writeFile('dataC13.json', JSON.stringify(data), (err) => {
               if(err) throw err
           })
           }else{
               console.log('data ini sudah complete')
           }
           break;
        case 'uncomplete':
           if(process.argv[3] > data.belum.length){
               console.log(`"${dataBaru[process.argv[3]-1]}" Status Selesai dibatalkan`)
               data.belum.push(data.sudah[process.argv[3]-1-data.belum.length])
               data.sudah.splice(process.argv[3]-data.belum.length, 1)
               // console.log(data)
               fs.writeFile('dataC13.json', JSON.stringify(data), (err) => {
                   if(err) throw err
               })
           }else{
               console.log('data ini sudah uncomplete')
           }
           break;
        case'list:outstanding':
           if(process.argv[3] == 'asc'){
               for(var i = 0; i < data.belum.length; i++){
                   console.log(`${i+1}. [ ] ${data.belum[i]}`)
               }
           }else if(process.argv[3] == 'desc'){
               for(var i = data.belum.length-1; i >= 0; i--){
                   console.log(`${i+1}. [ ] ${data.belum[i]}`)
               }
           }else{
               console.log('gunakan command list untuk menampilkan semua daftar list')
           }
           break;
        case 'list:completed':
           if(process.argv[3] == 'asc'){
               for(var i = 0; i < data.sudah.length; i++){
                   console.log(`${i+1}. [X] ${data.sudah[i]}`)
               }
           }else if(process.argv[3] == 'desc'){
               for(var i = data.sudah.length-1; i >= 0; i--){
                   console.log(`${i+1}. [X] ${data.sudah[i]}`)
               }
           }else{
               console.log('gunakan command list untuk menampilkan semua daftar list')
           }
           break;
        case 'tag':
           var hasil = []
           for(var i = 4; i < process.argv.length; i++){
                hasil.push(process.argv[i])
           }
           
           data.tag[process.argv[3]] = hasil
           data.jumlahTag += 1
           fs.writeFile('dataC13.json', JSON.stringify(data), (err) => {
               if(err) throw err
               console.log(`Tag '${hasil}' telah di tambahkan ke daftar '${dataBaru[process.argv[3]-1]}'`)
           })
           break;
        case 'reset':
            data = {"belum":[],"sudah":[],"tag":{},"jumlah":0,"jumlahTag":0}        
            fs.writeFile('dataC13.json', JSON.stringify(data), (err) => {
                if(err) throw err
                console.log('data direset')
            })
            break;
        default:
           console.log('data ini tidak terdaftar')
    }
 }
            