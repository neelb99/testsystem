const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/userRouter');
const reportRouter = require('./routes/reportRouter');
const questionRouter = require('./routes/questionRouter');
const googleRouter = require('./routes/google');
const passport = require("passport");
require('dotenv').config();
require("./config/passport");

// sets the port for development/production environment
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); 

//DB Connection
mongoose.connect(process.env.DB_URI, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>console.log("DB Connected"))
    .catch(err=>console.log(err));


// Routers
app.use('/api/users',userRouter);
app.use('/api/reports',reportRouter);
app.use('/api/questions',questionRouter);
app.use('/auth',googleRouter);


//Serve static pages in production
if(PORT!==5000){
    app.use(express.static(path.join(__dirname,"client","build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"client","build","index.html"));
    });
}    

// Start Server
app.listen(PORT,()=>console.log("Server Running"));
