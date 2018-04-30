var express = require('express');
var router = express.Router();
var Phonebook = require('../models/phonebook')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/phonebooks', (req, res) => {
  Phonebook.find({}).exec((err, val) => {
    res.json(val)
  })
})

router.post('/api/phonebooks/search', (req, res) => {
  let data = {
    name: req.body.name,
    phone: req.body.phone
  }
  if(data.name && data.phone){
    Phonebook.find(data).exec((err, val) => {
      res.json(val)
    })
  }else{
  Phonebook.find({ $or: [ { name: new RegExp('^'+data.name+'$', "i") }, { phone: new RegExp('^'+data.phone+'$', "i") } ] }).exec((err, val) => {
      res.json(val)
    })
  }
})

router.get('/api/phonebooks/:id', (req, res)=>{
  Phonebook.findById(req.params.id, (err, val)=>{
    res.json(val)
  })
})

router.post('/api/phonebooks', (req, res) => {
  var data = {
    name: req.body.name,
    phone: req.body.phone
  }
  var phonebook = new Phonebook(data)
  phonebook.save((err, val) => {
    res.json({
      status: 'SUCCESS',
      data: val
    })
  })
})

router.put('/api/phonebooks/:id', (req, res) => {
  let data = {
    name: req.body.name,
    phone: req.body.phone
  }

  Phonebook.findById(req.params.id, (err, phonebook) => {
    phonebook.set(data)
    phonebook.save((err, updated)=>{
      res.json({
        status: 'SUCCESS',
        data: updated
      })
    })
  })
})

router.delete('/api/phonebooks/:id', (req, res) => {
  Phonebook.findByIdAndRemove({_id: req.params.id}, (err, val) => {
    res.json({
      status: 'SUCCESS',
      data: val
    })
  })  
})

module.exports = router;
