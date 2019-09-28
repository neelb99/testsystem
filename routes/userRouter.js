const router = require('express').Router();
const user = require('../models/user.model');
const bcrypt = require('bcrypt');

// Registration route
router.route('/register').post((req,res)=>{
    user.findOne({username:req.body.username})
        .then(foundUser=>{
            if(foundUser!==null){
                res.json("found");
            }
            else{
                // Encryption
                bcrypt.hash(req.body.password,10)
                    .then(encrypted=>{
                        const password = encrypted;
                        const username = req.body.username;
                        const role=req.body.role;
                        if(role===null)
                            role="student"
                        const newUser = new user({username,password,role});
                        newUser.save()
                            .then(()=>res.json("User Added"))
                            .catch(()=>res.json("error"));
                    })
                    .catch(()=>res.json("error"));
            }
        })
})

// Login verification
router.route('/login').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    user.findOne({username:username})
        .then(foundUser=>{
            if(foundUser===null)
                res.json(foundUser)
            else{
                bcrypt.compare(password,foundUser.password)
                    .then(same=>{
                        if(same)
                            res.json(foundUser);
                        else
                            res.json("wrong");
                    })
                    .catch(()=>res.json("error"));
            }
        })
        .catch(()=>{res.json("error")});
})

router.route('/view').get((req,res)=>{
    user.find()
        .then(found=>res.json(found))
})

// Route to delete individual user
router.route('/delete/:id').get((req,res)=>{
    user.findByIdAndDelete(req.params.id)
        .then(()=>res.json("deleted"))
        .catch(()=>res.json("error"));
})

module.exports = router;