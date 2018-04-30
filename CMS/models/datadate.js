let mongoose = require('mongoose')
let Schema = mongoose.Schema

let DataDate = new Schema({
    letter: String,
    frequency: Number
})

module.exports = mongoose.model('DataDate', DataDate)