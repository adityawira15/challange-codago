var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Data = require('../models/data');
let DataDate = require('../models/datadate');
let Maps = require('../models/maps');
let passport = require('passport');
let DataUsers = require('../models/users')

//VIEW

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Dashboard
router.get('/line', (req, res)=>{
  res.render('line')
})

router.get('/pie', (req, res)=>{
  res.render('pie')
})

router.get('/bar', (req, res)=>{
  res.render('bar')
})

router.get('/map', (req, res) => {
  res.render('petamaps')
})

router.get('/login', (req, res) => {
  res.render('login')
})

// Login Form
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/home');
    });
  })(req, res, next);
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})

// Register Form
router.post('/register', (req, res, next) => {
  if(req.body.password == req.body.repassword){
    passport.authenticate('local-register', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/home');
      });
    })(req, res, next);
  }else{
    return res.redirect('/login')
  }
});

//Option Navbar
router.get('/home', (req, res)=> {
  res.render('home',{
    user: req.session.passport.user
  })
})

router.get('/data', (req, res) => {
  Data.find({}).exec((err, val) => {
    res.render('data', {
      data: val
    })
  })
})

router.get('/datadate', (req, res)=>{
  DataDate.find({}).exec((err, val)=>{
    res.render('datadate', {
      data: val
    })
  })
})

router.get('/maps', (req, res)=>{
  Maps.find({}).exec((err, val)=>{
    res.render('maps', {
      data: val
    })
  })
})


//API

//BROWSE
router.post('/api/data/search', (req, res) => {
  if(req.body.letter && req.body.frequency){
    Data.find({ $and: [ { letter: new RegExp( '^'+req.body.letter+'$', 'i') }, { frequency: req.body.frequency } ]}
    ).exec((err, val) => {
      res.json(val)
    })

  }else{
    Data.find({ $or: [ { letter: new RegExp( '^'+req.body.letter+'$', 'i') }, { frequency: req.body.frequency } ]}
    ).exec((err, val) => {
      res.json(val)
    })
  }

})

router.post('/api/datadate/search', (req, res) => {
  DataDate.find(
    { $or: [ { letter: new RegExp( '^'+req.body.letter+'$', 'i') }, { frequency: req.body.frequency } ]}
  ).exec((err, val) => {
    res.json(val)
  })
})

router.post('/api/maps/search', (req, res) => {
  Maps.find( { title: new RegExp( '^'+req.body.title+'$', 'i') } ).exec((err, val) => {
    res.json(val)
  })
})

//READ
router.get('/api/data', (req, res) => {
  Data.find({}).exec((err, val) => {
    res.json(val)
  })
})

router.get('/api/datadate', (req, res) => {
  DataDate.find({}).exec((err, val) => {
    res.json(val)
  })
})

router.get('/api/maps', (req, res) => {
  Maps.find({}).exec((err, val) => {
    res.json(val)
  })
})

//EDIT
router.put('/api/data/:id', (req, res) => {
  let data = {
    letter: req.body.letter,
    frequency: req.body.frequency
  }
  
  Data.findOne({_id: req.params.id}, (err, updated) => {
    updated.set(data)
    updated.save((err, val) => {
      if(val.length != 0){
        res.json({
          success: true,
          message: "data have been updated",
          data: val
        })
      }else{
        res.send('updated failed')
      }
    })
  })
})

router.put('/api/datadate/:id', (req, res) => {
  let data = {
    letter: req.body.letter,
    frequency: req.body.frequency
  }
  
  DataDate.findOne({_id: req.params.id}, (err, updated) => {
    updated.set(data)
    updated.save((err, val) => {
      if(val.length != 0){
        res.json({
          success: true,
          message: "data have been updated",
          data: val[0]
        })
      }else{
        res.send('updated failed')
      }
    })
  })
})

router.put('/api/maps/:id', (req, res) => {
  let data = {
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  }
  
  Maps.findOne({_id: req.params.id}, (err, updated) => {
    updated.set(data)
    updated.save((err, val) => {
      if(val.length != 0){
        res.json({
          success: true,
          message: "data have been updated",
          data: val[0]
        })
      }else{
        res.send('updated failed')
      }
    })
  })
})

//ADD
router.post('/api/data', (req, res) => {
  let data = {
    letter: req.body.letter,
    frequency: req.body.frequency
  }
  let add = new Data(data)
  if(data.letter && data.frequency){
    add.save((err, val) => {
      res.json({
        success: true,
        message: "data have been added",
        data: val
      })
    })
  }else{
    res.send('failed to add')
  }
})

router.post('/api/datadate', (req, res) => {
  let data = {
    letter: req.body.letter,
    frequency: req.body.frequency
  }
  let add = new DataDate(data)
  if(data.letter && data.frequency){
    add.save((err, val) => {
      res.json({
        success: true,
        message: "data have been added",
        data: val[0]
      })
    })
  }else{
    res.send('failed to add')
  }
})

router.post('/api/maps', (req, res) => {
  let data = {
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  }
  console.log(data)
  let add = new Maps(data)
  if(data.title && data.lat && data.lng){
    add.save((err, val) => {
      console.log('success')
      res.json({
        success: true,
        message: "data have been added",
        data: val[0]
      })
    })
  }else{
    res.send('failed to add')
  }
})

//DELETE
router.delete('/api/data/:id', (req, res) => {
  Data.remove({_id: req.params.id}, (err, val) => {
    res.json({
      success: true,
      message: "data have been deleted",
      data: val[0]
    })
  })
})

router.delete('/api/datadate/:id', (req, res) => {
  DataDate.remove({_id: req.params.id}, (err, val) => {
    res.json({
      success: true,
      message: "data have been deleted",
      data: val[0]
    })
  })
})

router.delete('/api/maps/:id', (req, res) => {
  Maps.remove({_id: req.params.id}, (err, val) => {
    res.json({
      success: true,
      message: "data have been deleted",
      data: val[0]
    })
  })
})

//FIND
router.get('/api/data/:id', (req, res) => {
  Data.find({_id: req.params.id}).exec((err, val) => {
    if(val.length != 0){
      res.json({
        _id: val[0]._id,
        letter: val[0].letter,
        frequency: val[0].frequency
      })
    }
  })
})

router.get('/api/datadate/:id', (req, res) => {
  DataDate.find({_id: req.params.id}).exec((err, val) => {
    if(val.length != 0){
      res.json({
        _id: val[0]._id,
        letter: val[0].letter,
        frequency: val[0].frequency
      })
    }
  })
})

router.get('/api/maps/:id', (req, res) => {
  console.log(req.params.id)
  Maps.find({_id: req.params.id}).exec((err, val) => {
    if(val.length != 0){
      res.json({
        _id: val[0]._id,
        title: val[0].title,
        lat: val[0].lat,
        lng: val[0].lng
      })
    }
  })
})

module.exports = router;
