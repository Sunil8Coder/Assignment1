const express = require('express');
const morgan  = require('morgan');
const signup =  require('./routes/api/signup');
const login = require('./routes/api/login');
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/signup',signup);
app.use('/login',login);
app.get('/',(req,res,next)=>{
    res.sendFile("D:/VSCodeGitExample/indorseAssignment1/views/index.html");
});
module.exports = app;
