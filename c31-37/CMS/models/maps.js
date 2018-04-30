let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Maps = new Schema({
    title: String,
    lat: Number,
    lng: Number
})

module.exports = mongoose.model('Maps', Maps)