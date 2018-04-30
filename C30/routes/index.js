var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const C30 = require('../models/c30')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/users/register', (req, res) => {
  let user = {
                email: req.body.email,
                password: req.body.password,
              }
  if(user.email && user.password){
    jwt.sign(user, 'secretkey', (err, token) => {
      user.token = token
      let c30 = new C30(user)
      c30.save(function(err, result) {
        C30.find({email: req.body.email}).exec(function(err, val){
          if(err){
            res.send('error has occured')
          }else{
            res.json({
              data: {
                email: result.email
              }, 
              token: token
            })
          }
        })
      })
    })
  }else{
    res.send('data tidak boleh kosong')
  }
})

router.post('/api/users/login', (req, res) => {
  let user = {
    email: req.body.email,
    password: req.body.password
  }
  C30.find({email: req.body.email, password: req.body.password}).exec((err, val) => {
    if(val.length != 0){
      jwt.sign(user, 'secretkey', (err, token) => {
        C30.updateOne({email: user.email},{
          $set: {token: token}
        }, (err, row) => {
          C30.find({email: user.email}).exec((err, value) => {
            res.json({
              data:{
                email: value[0].email
              },
              token: value[0].token
            })
          })
        })
      })
    }else{
      res.send('Email or Password WRONG!!!')
    }
  })
})

function verifyToken(req, res, next){

  const baererHeader = req.headers['authorization'];
  if(typeof baererHeader !== 'undefined'){
    const bearer = baererHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken;
    next()
  }else{
    res.sendStatus(403)
  }
}

router.post('/api/users/check', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        valid: true
      })
    }
  })
})

router.get('/api/users/destroy', (req, res) => {  
  C30.find({token: req.body.token}).exec((err, val) => {
    val[0].set({token: null})
    val[0].save((err, updated) => {
      res.json({
        logout: true
      })
    })
  })
})

module.exports = router;
