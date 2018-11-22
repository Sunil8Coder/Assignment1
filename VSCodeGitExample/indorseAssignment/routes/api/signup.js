const express = require('express');
const signupRouter = express.Router();
const nodemailer = require('nodemailer');
const md5 = require('md5');
const mysql = require('mysql');

const connection = mysql.createConnection({
host:"localhost",
port:3306,
password:"",
username:"root",
database:"test"
});

connection.connect((err,success)=>{
    if(err){
        console.log(err);
    }else{
   console.log("Succeeded!"+success);
    }
});


  signupRouter.get('/',(req,res,next)=>{
    res.sendFile('D:/VSCodeGitExample/indorseAssignment/views/signup.html');
  })

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'emailSenderGmail@gmail.com',
        pass: 'password'
    }
  });

signupRouter.post('/',(req,res,next)=>{
    console.log(req.body);
    let password = md5(req.body.password); 

      var mailOptions = {
        from: 'yadavsunilg8898@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        html: '<a href = "http://localhost:3000/login/'+password+'">This is verification link !!</a>'
      };

      transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log("Sending Email:"+err);
        }else{
            console.log(info);
            console.log(req.body);
            let query = "INSERT INTO users(username,email,password) values('"+req.body.username+"','"+req.body.email+"','"+password+"')";
            connection.query(query,function(err,result){
                if(err){
                 console.log(err);
                 res.send(err);
                }else{
                    res.send("You have created account please verify your account just go to email and click email link and then login");
                 console.log(result);
                }
            });
        }
      });
});

module.exports = signupRouter;
