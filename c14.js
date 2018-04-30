var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('university.db');
 
db.serialize(function() {
    db.run("CREATE TABLE mahasiswa(nim integer PRIMARY KEY UNIQUE, nama text NOT NULL UNIQUE, alamat text NOT NULL, jurusan text NOT NULL UNIQUE)");
    db.run("CREATE TABLE jurusan(id integer PRIMARY KEY UNIQUE, namajurusan text NOT NULL UNIQUE)")
    db.run("CREATE TABLE dosen(id integer PRIMARY KEY UNIQUE, nama text NOT NULL UNIQUE)")
    db.run("CREATE TABLE matakuliah(id integer PRIMARY KEY UNIQUE, nama text NOT NULL UNIQUE, sks integer NOT NULL)")
    db.run("INSERT INTO mahasiswa(nim, nama, alamat, jurusan) VALUES(0080676, 'aditya wira nugraha', 'lontar baru', 'tkj')")
    db.run("INSERT INTO mahasiswa(nim, nama, alamat, jurusan) VALUES(0080677, 'agung putra alamsyah', 'lontar baru', 'multimedia')")
    db.run("INSERT INTO jurusan(id, namajurusan) VALUES(1,'tkj')")
    db.run("INSERT INTO jurusan(id, namajurusan) VALUES(2,'multimedia')")
    db.run("INSERT INTO dosen(id, nama) VALUES(1,'ruby')")
    db.run("INSERT INTO dosen(id, nama) VALUES(2,'reky')")
    db.run("INSERT INTO matakuliah(id, nama, sks) VALUES(1,'operating system', 3.40)")
    db.each("SELECT * FROM mahasiswa",(err, val) => {
        if(err) throw err
            console.log('mahasiswa: '+val.toString())
    })
    db.each("SELECT * FROM jurusan",(err, val) => {
        if(err) throw err
            console.log('jurusan: '+val.toString())
    })
    db.each("SELECT * FROM dosen",(err, val) => {
        if(err) throw err
            console.log('dosen: '+val.toString())
    })
    db.each("SELECT * FROM matakuliah",(err, val) => {
        if(err) throw err
            console.log('matakuliah: '+val.toString())
    })
});
db.close();