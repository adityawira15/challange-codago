var express = require('express');
var fs = require('fs')
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'C22';


// Use connect method to connect to the server


/* GET home page. */
router.get('/', function(req, res, next) {
  var page = req.query.page ? req.query.page : 0;
  var query = {}

  if(req.query.cid && req.query.id){
    query._id = req.query.id    
  }
  if(req.query.cstring && req.query.string){
    query.string = req.query.string
  }
  if(req.query.cinteger && req.query.integer){
    query.integer = req.query.integer    
  }
  if(req.query.cfloat && req.query.float){
    query.float = req.query.float
  }
  if(req.query.cdate && req.query.sdate && req.query.edate){
    query.date = { $gte: req.query.sdate, $lte: req.query.edate }    
  }
  if(req.query.cboolean && req.query.boolean){
    query.boolean = req.query.boolean
  }
  
  if(req.url == '/'){
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);

      const db = client.db(dbName);
      const collection = db.collection('bread')
      
      collection.find({}).limit(3).skip(page*3).toArray((err, row) => {
        collection.find({}).toArray((err, leng) => {
          res.render('index', {
              data: row,
              leng: leng.length,
              url: req.url,
              page: 0,
              query: req.query
            })
          })
        })
      })
    }else if(req.query.cid || req.query.cstring || req.query.cinteger || req.query.float || req.query.cdate || req.query.boolean){
      MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection('bread')

        collection.find(query).limit(3).skip(page*3).toArray((err, val)=>{
          collection.find(query).toArray((err, leng)=>{
            res.render('index', {
              data: val,
              leng: leng.length,
              url: req.url,
              page: page,
              query: req.query
            })
          })
        })
      })
    }else{
      MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection('bread')

        collection.find({}).limit(3).skip(page*3).toArray((err, val)=> {
          collection.find({}).toArray((err, leng) => {
            res.render('index', {
              data: val,
              leng: leng.length,
              url: req.url,
              page: page,
              query: req.query
            })
          })
        })
      })
    }
  });
  
  router.post('/save', function(req, res){
    MongoClient.connect(url, (err,client) => {
      assert.equal(null, err);

      const db = client.db(dbName);
      const collection = db.collection('bread')

      collection.insertOne(
        { 
        string: req.body.string != '' ? req.body.string : "kosong",
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
        }
      )
      res.redirect('/')
    })
  })
    
  router.get('/delete/:id', function(req, res){
    MongoClient.connect(url, (err,client) => {
      assert.equal(null, err);

      const db = client.db(dbName);
      const collection = db.collection('bread')
    // console.log(req.params.id)
      collection.deleteMany( { _id: ObjectId(req.params.id) } )
      res.redirect('/')
    })
  })
  
  router.get('/edit/:id', function(req, res){
    MongoClient.connect(url, (err,client) => {
      assert.equal(null, err);

      const db = client.db(dbName);
      const collection = db.collection('bread')

      collection.find({ _id: req.params.id }).toArray((err, val)=>{
        res.render('edit', {data:val})
      })
    })
  })
  
  router.post('/edit2/:id', function(req, res){
    MongoClient.connect(url, (err,client) => {
      assert.equal(null, err);

      const db = client.db(dbName);
      const collection = db.collection('bread')

      collection.updateMany(
        { _id: ObjectId(req.params.id) },
        { $set: { string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean } }
      )
      res.redirect('/')
    })
  })

router.get('/add', function(req, res){
  res.render('add')
})
module.exports = router;

