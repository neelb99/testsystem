const router = require('express').Router();
const report = require('../models/report.model');

router.route('/create').post((req,res)=>{
    const user = req.body.user;
    const score = req.body.score;
    const date = req.body.date;
    const suggestion = req.body.suggestion;
    const newReport = new report({user,score,date,suggestion});
    newReport.save()
        .then(()=>{
            res.json("success")
        })
        .catch(()=>{
            res.json("error")
        });
})

router.route('/view/:username').get((req,res)=>{
    const username = req.params.username;
    report.find({user:username})
        .then(found=>res.json(found))
        .catch(()=>res.json("error"));
})

router.route('/viewall').get((req,res)=>{
    report.find()
        .then(found=>res.json(found));
})

module.exports = router;