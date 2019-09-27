const router = require('express').Router();
const question = require('../models/question.model');

router.route('/add').post((req,res)=>{
    const text=req.body.text;
    const answer = req.body.answer;
    const options = req.body.options;
    const tag=req.body.tag;
    const difficulty=req.body.difficulty;
    const newQuestion = new question({text,answer,options,tag,difficulty});
    newQuestion.save()
        .then(()=>res.json("success"))
        .catch(err=>res.json(err));
})

router.route('/view').get((req,res)=>{
    question.find()
        .then(found=>res.json(found))
        .catch(()=>res.json("error"));
})

router.route('/delete/:id').get((req,res)=>{
    question.findByIdAndDelete(req.params.id)
        .then(()=>res.json("deleted"))
        .catch(()=>res.json("error"));
})

module.exports = router;