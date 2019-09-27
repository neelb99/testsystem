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

router.route('/view/:id').post((req,res)=>{
    const username = req.params.id;
    report.find({user:username})
        .then(found=>res.json(found))
        .catch(()=>res.json("error"));
})

module.exports = router;