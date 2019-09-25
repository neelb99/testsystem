const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/userRouter');
const reportRouter = require('./routes/reportRouter');
const questionRouter = require('./routes/questionRouter');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>console.log("DB Connected"))
    .catch(err=>console.log(err));

app.use('/api/users',userRouter);
app.use('/api/reports',reportRouter);
app.use('/api/questions',questionRouter);

if(PORT!==5000){
    app.use(express.static(path.join(__dirname,"client","build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"client","build","index.html"));
    });
}    

app.listen(PORT,()=>console.log("Server Running"));
