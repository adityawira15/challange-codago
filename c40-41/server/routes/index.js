var express = require('express');
var router = express.Router();
let path = require('path')
let Ecommerce = require('../models/ecommerce')
var fs = require("fs")
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/ecommerce', (req, res, next) => {
  Ecommerce.find({}).limit(4).skip(parseInt(req.query.offset)).exec((err, val) => {
    res.json(val)
    res.end()
  })
})

router.get('/api/ecommerce/count', (req, res) => {
  Ecommerce.find({}).exec((err, val) => {
    res.json({ count: val.length })
    res.end()
  })
})

router.get('/api/ecommerce/:id', (req, res) => {
  Ecommerce.findById(req.params.id, (err, val) => {
    res.json(val)
    res.end()
  })
})

router.post('/api/ecommerce', (req, res) => {
  let imageUri = []
  let uri = ''
  let split = []

  if (req.files.photo.length !== undefined) {
    req.files.photo.forEach((val) => {
      fs.rename(val.path, val.path + '.jpg')
      split = val.path.split('/')
      uri = 'http://192.168.1.3:3000/images/' + split[split.length - 1] + '.jpg'
      imageUri.push(uri)
      split = []
      uri = ''
    });
  } else {
    fs.rename(req.files.photo.path, req.files.photo.path + '.jpg')
    split = req.files.photo.path.split('/')
    uri = 'http://192.168.1.3:3000/images/' + split[split.length - 1] + '.jpg'
    imageUri.push(uri)
    split = []
    uri = ''
  }

  let data = {
    id: req.fields.id,
    title: req.fields.title,
    rate: req.fields.rate,
    image: imageUri,
    description: req.fields.description,
    price: req.fields.price,
    brand: req.fields.brand,
    detail: req.fields.detail
  }

  console.log(data.image)

  let ecommerce = new Ecommerce(data)
  ecommerce.save((err, val) => {
    if (err) throw err
    res.json({
      status: 'Ok',
      message: 'Success Added',
      data: val
    })
    res.end()
  })
})

router.put('/api/ecommerce/:id', (req, res) => {
  let data = {
    id: req.body.id,
    title: req.body.title,
    rate: req.body.rate,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    detail: req.body.detail
  }
  Ecommerce.findById(req.param.id, (err, updated) => {
    updated.set(data)
    updated.save((err, val) => {
      res.json({
        status: 'Ok',
        message: 'Success Updated',
        data: val
      })
    })
  })
})

router.delete('/api/ecommerce/:id', (req, res) => {
  Ecommerce.findById(req.params.id, (err, deleted) => {
    deleted.remove((err, val) => {
      res.json({
        status: 'Ok',
        message: 'Success Removed',
        data: val
      })
    })
  })
})

module.exports = router;
