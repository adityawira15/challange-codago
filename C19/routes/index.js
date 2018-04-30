var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readFile('./data.json','utf8', function(err, val){
      if (err) throw err
        var data = JSON.parse(val)
        res.render('index', { data: data });
      })
  });
  
  // router.get('/search', function(req, res){
  //   var tes = req.query.string;
  //   res.render('index', { data: tes});
  // })
  
  router.post('/save', function(req, res){
    fs.readFile('./data.json','utf8', function(err, val){
      if (err) throw err
        var data = JSON.parse(val)
        var save = {
          "id":data.length == 0 ? "1" : parseInt(data[data.length-1].id)+1,
          "string":req.body.string == "" ? "kosong" : req.body.string,
          "integer":req.body.integer == "" ? "kosong" : req.body.integer,
          "float":req.body.float == "" ? "kosong" : req.body.float,
          "date":req.body.date == "" ? "kosong" : req.body.date,
          "boolean":req.body.boolean == "" ? "kosong" : req.body.boolean
        }
        data.push(save)
        fs.writeFile('./data.json', JSON.stringify(data),function(err){
            if(err) throw err
              console.log('data saved')
              res.redirect('/')
        })
      })
  })

  router.get('/delete/:id', function(req, res){
    fs.readFile('./data.json', 'utf8', function(err, val){
      if(err) throw err
        var data = JSON.parse(val)
        data.forEach((val, index)=> {
          if(val.id == req.params.id){
            data.splice(index, 1)
          }
        })
        fs.writeFile('./data.json', JSON.stringify(data), function(err){
          if(err) throw err
            console.log('data deleted')
            res.redirect('/')
        })
    })
  })

  router.get('/edit/:id', function(req, res){
    fs.readFile('./data.json', 'utf8', function(err, val){
      if(err) throw err
        var data = JSON.parse(val)
        var edit = {
          "id":req.params.id,
          "string":"",
          "integer":0,
          "float":0.0,
          "date":"",
          "boolean":true
        }
        data.forEach((val, index)=> {
          if(val.id == req.params.id){
            edit.string = val.string
            edit.integer = val.integer
            edit.float = val.float
            edit.date = val.date
            edit.boolean = val.boolean
          }
        })
        res.render('edit', {data:edit})
      })
      // console.log(edit)
    })
    
    router.post('/edit2/:id', function(req, res){
      fs.readFile('./data.json', 'utf8', function(err, val){
        if(err) throw err
        var data = JSON.parse(val)
        var edit = {
          "id":req.params.id,
          "string":req.body.string == "" ? "kosong" : req.body.string,
          "integer":req.body.integer == "" ? "kosong" : req.body.integer,
          "float":req.body.float == "" ? "kosong" : req.body.float,
          "date":req.body.date == "" ? "kosong" : req.body.date,
          "boolean":req.body.boolean == "" ? "kosong" : req.body.boolean
        }
        data.forEach((val, index)=>{
          if(val.id == req.params.id){
            data.splice(index, 1, edit)
          }
        })
        fs.writeFile('./data.json', JSON.stringify(data), function(err){
          if(err) throw err
            console.log('data edited')
            res.redirect('/')
        })
    })
  })
  
  router.get('/add', function(req, res){
    res.render('add')
  })
  module.exports = router;
  