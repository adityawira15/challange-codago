const readline = require('readline')
const Table = require('cli-table')
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('C18.db');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
var table  = new Table({
    head: ['NIM', 'Nama', 'Alamat', 'Jurursan'],
    colWidths: [15,25,50,20]
})
var table1 = new Table({
    head: ['ID', 'Nama'],
    colWidths: [5,10]
})

var tableFor = (callbackadit) => {
    table  = new Table({
                head: ['NIM', 'Nama', 'Alamat', 'Jurursan'],
                colWidths: [15,25,50,20]
            });
    db.all("SELECT * FROM mahasiswa", function(err, rows){
        for(let i = 0; i < rows.length; i++){
            table.push(Object.values(rows[i]));
        }
        callbackadit();
    })

}

var table1For = (callback) => {
    table1 = new Table({
        head: ['ID', 'Nama'],
        colWidths: [5,10]
    })
    db.all("SELECt * FROM dosen", function(err, row){
        for(var i = 0; i < row.length; i++){
            table1.push(Object.values(row[i]))
        }
        callback()        
    })
}

// db.serialize(function() {
    // db.run("CREATE TABLE mahasiswa (NIM integer PRIMARY KEY, Nama text NOT NULL, Alamat text NOT NULL, Jurusan integer NOT NULL)");
    // db.run("CREATE TABLE dosen (ID integer AUTO_INCREMENT PRIMARY KEY , Nama text NOT NULL)");
    // var stmt = db.prepare("INSERT INTO mahasiswa(NIM, Nama, Alamat, Jurusan) VALUES (0080676, 'aditya wira nugraha', 'Jl.trip basuni no28A RT01/04, LontarBaru, Serang', 1)");
    // var stmt = db.prepare("INSERT INTO dosen(ID, Nama) VALUES (2,'reky')");
    // for (var i = 0; i < 10; i++) {
        // stmt.run();
    // }
    // stmt.finalize();
  
    // db.each("SELECT * FROM mahasiswa WHERE NIM = 0080676", function(err, row) {
    //     if (err) throw err
    //         return row
    // });
//   });
  
//   db.close();

var mulai = () => {
    console.log('==============================================================================');
    console.log('Welcome to Universitas Pendidikan Indonesia, jl Setiabudhi No. 25')
    console.log('==============================================================================');

    var userName = () => {
        rl.question('username: ', (user) => {
            if(user == 'aditya'){
                password()
            }else{
                console.log('username salah!')
                userName()
            }
        })
    }

    var password = () => {
        rl.question('password: ', (pass) => {
            if(pass == 123){
                opsi()
            }else{
                console.log('password anda salah')
                password()
            }
        })
    }

    var opsi = () => {
        console.log('==============================================================================');
        console.log('welcome, adit. Your access level is: ADMIN')
        console.log('==============================================================================');
        console.log('silahkan pilih opsi di bawah ini')
        console.log('[1] Mahasiswa')
        console.log('[2] Jurusan')
        console.log('[3] Dosen')
        console.log('[4] Mata Kuliah')
        console.log('[5] Kontak')
        console.log('[6] keluar')
        console.log('==============================================================================');
        rl.question('Masukan salah satu No dari opsi diatas: ', (opsi) => {
            switch(opsi){
                case '1':
                    BREAD();
                    break;
                case '3':
                    dosen();
                    break;
                case '6':
                    console.log('==============================================================================');
                    console.log('Kamu telah keluar.')
                    mulai();
                    break;
                default:
                    console.log('opsi anda tidak tersedia!')
            }
        })
    }

    var dosen = () => {
        console.log('==============================================================================');
        console.log('silahkan pilih opsi di bawah ini')
        console.log('[1] daftar dosen')
        console.log('[2] cari dosen')
        console.log('[3] tambah dosen')
        console.log('[4] hapus dosen')
        console.log('[5] kembali')
        console.log('==============================================================================');
        rl.question('masukan salah satu no. dari opsi diatas: ', (val => {
            switch(val){
                case '1':
                    console.log('==============================================================================');
                    table1For(function(){
                        console.log(table1.toString());
                        dosen();
                    })
                    break;
                case '5':
                    opsi();
                    break;
            }
        }))
    }

    var BREAD = () => {
        console.log('==============================================================================');
        console.log('silahkan pilih opsi di bawah ini')
        console.log('[1] daftar murid')
        console.log('[2] cari murid')
        console.log('[3] tambah murid')
        console.log('[4] hapus murid')
        console.log('[5] kembali')
        console.log('==============================================================================');
        rl.question('masukan salah satu no. dari opsi diatas: ', (bread) => {
            switch(bread){
                case '1':
                    console.log('==============================================================================');
                    tableFor(function(){
                        console.log(table.toString())
                        BREAD();
                    })
                    break;
                case '2':
                    cariMahasiswa();
                    break;
                case '3':
                    add();
                    break;
                case '4':
                    hapus();
                    break;
                case '5':
                    opsi();
                    break;
                default:
                    console.log('nomor ini tidak ada!')
                    BREAD();
            }
        })
    }

    var cariMahasiswa = () => {
        console.log('==============================================================================');
        rl.question('Masukan dengan NIM: ', (cari) => {
            db.all(`SELECT * FROM mahasiswa WHERE NIM = ${cari}`, function(err, row) {
                if(row.length != 0){
                    console.log('==============================================================================');
                    console.log('Student details')
                    console.log('==============================================================================');
                    console.log(`NIM       : ${row[0].NIM}`)
                    console.log(`Nama      : ${row[0].Nama}`)
                    console.log(`Alamat    : ${row[0].Alamat}`)
                    console.log(`Jurusan   : ${row[0].Jurusan}`)
                    BREAD()
                }else{
                    console.log(`Mahasiswa Dengan NIM ${cari} tidak terdaftar`)
                    cariMahasiswa();
                }
            });
            
        })
    }

    var add = () => {
        console.log('==============================================================================');
        console.log('Lengkapi data di bawah ini:')
        var values = [] 
        function nim(){
            rl.question('NIM: ', (val) => {
                values.push(val)
                nama();
            })
        }
        function nama(){
            rl.question('Nama: ', (val) => {
                values.push(val)
                alamat();
            })
        }
        function alamat(){
            rl.question('Alamat: ', (val) => {
                values.push(val)
                jurusan();
            })
        }
        function jurusan(){
            rl.question('Jurusan: ', (val) => {
                values.push(val);
                var queri = `INSERT INTO mahasiswa(NIM, Nama, Alamat, Jurusan) VALUES (${parseInt(values[0])}, "${values[1]}", "${values[2]}", ${parseInt(values[3])})`
                db.run(queri)
                console.log('==============================================================================');
                tableFor(function(){
                    console.log(table.toString());
                    BREAD();
                })
            })
        }
        nim();
    }

    var hapus = () => {
        console.log('==============================================================================');
        rl.question('Masukan NIM mahasiswa yang akan di hapus: ', (val) => {
            db.run(`DELETE FROM mahasiswa WHERE NIM = ${val}`)
            console.log(`mahasiswa dengan nim ${val} telah dihapus`)
            console.log('==============================================================================');
            tableFor(function(){
                console.log(table.toString())
                BREAD();
            });
            
                // console.log('tidak ada mahasiswa dengan nim tersebut')
                // hapus();
        })
    }
    userName();
}
mulai();