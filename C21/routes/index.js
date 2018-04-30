var express = require('express');
var fs = require('fs')
var sqlite3 = require('sqlite3').verbose()
var { Pool } = require('pg')
var router = express.Router();
var db = new sqlite3.Database('data.db')
var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'C21',
  password: 'AdItYa15:)',
  port: 5432
});

/* GET home page. */


router.get('/', function(req, res, next) {
  var page = req.query.page ? req.query.page : 0;
  var data = ['SELECT * FROM bread WHERE ']
  var limit = [` LIMIT 3 OFFSET ${page*3}`]
  var sdate = new Date(req.query.sdate)
  var edate = new Date(req.query.edate)
  var slice = []
  var query = []
  if(req.query.cid && req.query.id){
    data.push(`id = ${req.query.id} AND `)    
  }
  if(req.query.cstring && req.query.string){
    data.push(`string = "${req.query.string}" AND `)
  }
  if(req.query.cinteger && req.query.integer){
    data.push(`integer = ${req.query.integer} AND `)    
  }
  if(req.query.cfloat && req.query.float){
    data.push(`float = ${req.query.float} AND `)
  }
  if(req.query.cdate && req.query.sdate && req.query.edate){
    data.push(`date >= ${sdate} AND date <= ${edate} AND `)    
  }
  if(req.query.cboolean && req.query.boolean){
    data.push(`boolean = "${req.query.boolean}" AND `)
  }
  slice = data[data.length-1].split(' ') 
  data[data.length-1] = slice.slice(0, slice.length-2).join(' ')
  query = data.concat(limit).join('')
  // console.log('console: '+req.query.boolean)

  if(req.url == '/'){
    pool.query('SELECT * FROM bread LIMIT 3 OFFSET 0', (err, row) => {
      pool.query('SELECT * FROM bread', (err, leng) => {
        res.render('index', {
          data: row.rows,
          leng: leng.rows.length,
          url: req.url,
          page: 0,
          query: req.query
        })
      })
    })
  }else if(req.query.cid || req.query.cstring || req.query.cinteger || req.query.float || req.query.cdate || req.query.boolean){
    console.log(query)
    pool.query(query, (err, row) => {
      pool.query(data.join(''), (err, leng) => {
        res.render('index', {
          data: row.rows,
          leng: leng.rows.length,
          url: req.url,
          page: page,
          query: req.query
        })
      })
    })
  }else{
    pool.query(`SELECT * FROM bread LIMIT 3 OFFSET ${req.query.page*3}`, (err, row) => {
      pool.query('SELECT * FROM bread', (err, leng) => {
        res.render('index', {
          data: row.rows,
          leng: leng.rows.length,
          url: req.url,
          page: page,
          query: req.query
        })
      })
    })
  }
});

router.post('/search', function(req, res){
  
})

router.post('/save', function(req, res){
  db.run(`INSERT INTO bread(string, integer, float, date, boolean) VALUES("${req.body.string == "" ? "kosong" : req.body.string}", ${req.body.integer}, ${req.body.float}, "${req.body.date}", ${req.body.boolean})`)
  res.redirect('/')
})
  
router.get('/delete/:id', function(req, res){
  db.run(`DELETE FROM bread WHERE id=${req.params.id}`)
  res.redirect('/')
})

router.get('/edit/:id', function(req, res){
  pool.query(`SELECT * FROM bread WHERE id = ${req.params.id}`, (err, row)=>{
    res.render('edit', {data:row.rows})
  })
})

router.post('/edit2/:id', function(req, res){
  db.run(`UPDATE bread SET string = "${req.body.string}", integer = ${req.body.integer}, float = ${req.body.float}, date = "${req.body.date}", boolean = ${req.body.boolean} WHERE id = ${req.params.id}`)
  res.redirect('/')
})

router.get('/add', function(req, res){
  res.render('add')
})
module.exports = router;

