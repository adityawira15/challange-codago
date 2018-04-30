let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Data = new Schema({
    letter: String,
    frequency: Number
})

module.exports = mongoose.model('Data', Data)