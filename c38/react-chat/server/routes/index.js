var express = require('express');
var router = express.Router();
const Chat = require('../models/react-chat')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', (req, res) => {
  let data = {
    name: req.body.name,
    message: req.body.message
  }
  let chat = new Chat(data)
  chat.save((err)=>{
    Chat.find({}).exec((err, val)=>{
      res.json(val)
    })
  })
})

router.get('/test', (req, res) => {
  Chat.find({}).exec((err, val) => {
    res.json(val)
  })
})

module.exports = router;
