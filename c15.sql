SELECT * FROM mahasiswa, jurusan
SELECT nama FROM mahasiswa WHERE nama AND age < 20
SELECT nama FROM mahasiswa WHERE nilai > 'B'
SELECT nama FROM mahasiswa JOIN matakuliah WHERE matakuliah.sks > 10
SELECT nama FROM mahasiswa join matakuliah WHERE matakuliah.nama = 'datamining'
SELECT dosen.nama, COUNT(mahasiswa.namadosen = dosen.nama ) FROM mahasiswa join dosen
SELECT nama FROM mahasiswa ORDER BY umur ASC 