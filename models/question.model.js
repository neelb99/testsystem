const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    text: {type:String, required:true},
    answer: {type:String, required:true},
    options: {type:Array, required:true},
    difficulty: {type:Number, required:true}
})

const question = mongoose.model('question',questionSchema)
module.exports = question;