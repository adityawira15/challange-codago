let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt-nodejs')
let Users = new Schema({
    email: String,
    password: String
})

Users.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

Users.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('Users', Users)