let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let Ecommerce = new Schema({
    id: String,
    title: String,
    rate: Number,
    image: Array,
    description: String,
    price: Number,
    brand: String,
    detail: String
})

module.exports = mongoose.model('Ecommerce', Ecommerce)