const express = require('express');
const md5 = require('md5');
const loginRoute = express.Router();
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

loginRoute.post('/',(req,res,next)=>{
   let email = req.body.email;
   let password = md5(req.body.password);
   let sql = "SELECT * FROM users WHERE Email = '"+email+"' AND Password = '"+password+"';";
   connection.query(sql,(err,result)=>{
      if(err){
         res.status(500).json(err);
      }else{
         if(result.length>=1){
            let html = `<h2>User Detail:</h2><table border = "1" style ="border-collapse:collapse">
            <tr><td>Id</td><td>${result[0].Id}</td></tr>
            <tr><td>Username</td><td>${result[0].Username}</td></tr>
            <tr><td>Email</td><td>${result[0].Email}</td></tr>
        </table>`
        if(result[0].Status==0){
           res.send("Please Verify You Email Then Login");
        }else{
         res.send(html);
        }
        
         }else{
            res.send("There is wrong in your password or email");
            console.log(result);
         }
      }
   });
});

loginRoute.post('/:passwordCode',(req,res,next)=>{
   let email = req.body.email;
   let password = md5(req.body.password);
   let sql = "SELECT * FROM users WHERE Email = '"+email+"' AND Password = '"+password+"';";
   connection.query(sql,(err,result)=>{
      if(err){
         res.status(500).json(err);
      }else{
         if(password==req.params.passwordCode){

            connection.query("UPDATE users SET Status = 1 WHERE Email = '"+email+"';",(err,result)=>{
               if(err){
                  console.log(err);
                  res.status(500).json(err);
               }else{
                  res.send("Welcome to WebSite");
               }
            });
         }else{
            res.send("Please first <a href = '/signup'>Sign Up</a> please.");
         }
      }
   });
   
});

loginRoute.get('/',(req,res,next)=>{
   res.sendFile("D:/VSCodeGitExample/indorseAssignment/views/login.html");
 });

 loginRoute.get('/:passwordCode',(req,res,next)=>{
   
   let html = `<!DOCTYPE html>
   <html>
       <head>
           <title>Indorse</title>
           <!-- Latest compiled and minified CSS -->
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
   
   <!-- jQuery library -->
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   
   <!-- Latest compiled JavaScript -->
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
       </head>
   <body>
       <div>
           <form  action = "/login/${req.params.passwordCode}" method="POST">
           <div class = "row">
                   <div class = "col-sm-1 ">
                       <label >Enter Your Email</label>
                   </div>
                   <div class = "col-sm-2">
                           <input name = "email" class= "form-control" type = "email" placeholder=" Enter your Email" required>
                   </div>
               </div>
               <div class = "row">
                       <div class = "col-sm-1">
                               <label >Enter Your Password</label>
                       </div>
                       <div class = "col-sm-2 ">
                               <input  name = "password" class= "form-control" type = "password" placeholder="Enter Your Password" required>
                       </div>
               </div>
               <div class = "row">
                       <div class = "col-sm-1">
                               <input class = "btn btn-danger" type = "reset" value = "Reset">
                       </div>
                       <div class = "col-sm-2">
                               <input class = "btn btn-submit" type = "submit" value = "submit">
                       </div>
               </div>
           </form>
       </div>
   </body>`
   res.send(html);
});

module.exports = loginRoute;
