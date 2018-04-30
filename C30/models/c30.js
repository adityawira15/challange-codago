
const mongoose = require('mongoose')
const   Schema = mongoose.Schema;
const C30 = new Schema({
    email: String,
    password: String,
    token: String
})

module.exports = mongoose.model('Crud', C30);