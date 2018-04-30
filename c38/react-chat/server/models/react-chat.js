const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ReactChat = new Schema({
    name: String,
    message: String
})

module.exports  = mongoose.model('Chat', ReactChat);