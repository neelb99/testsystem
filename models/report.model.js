const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    user: {type:String, required:true},
    score: {type:Number, required:true},
    date: {type:String, required:true},
    suggestion: {type:String}
})

const report = mongoose.model('report',reportSchema)
module.exports = report;