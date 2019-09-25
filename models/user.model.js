const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    role: {type:String, required:true},
    maxScore: {type:Number, default:0}
})

const user = mongoose.model('user',userSchema)
module.exports = user;