var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PhoneBook = new Schema({
    name: String,
    phone: String
})

module.exports = mongoose.model('Phonebook', PhoneBook)