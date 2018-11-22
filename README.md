# Assignment1
Email Verification in Nodejs
First Page is index page from there you can go on either login or signup.
If you try to login without sign up then it will send this message "There is wrong in your password or email"
If you login after sign up then It will show you user detail.

If you sign up then it will send a link to your email for verification of email if you are verify then it will send you user detail.
If you verify with wrong email then it render "Please first Sign Up please." If you verify with properly then it will to take you to user detail.

User Detail Page will render after properly login in.

How to sign in:
1.  Enter "localhost:3000/" 
2.  Click on "sign in" button
3.  Enter your "username" and "email" with unique and create "password" for login
4.  After clicking on a submit button, a link will send in your email inbox.
5.  After clicking link then a page will be open then you have to login
6.  Then you will get user detail

How to login:
1.  Enter "localhost:3000/" 
2.  Click on "login" button
3.  Enter your email and password
4.  You will be on user detail

How To Run:

1.  First Run Database server

i.      First Download Xampp Server which contain mysql server
ii.     Second Download Install Xampp Server
iii.    Start Appche Server and Mysql Server from XAMPP Control Panel
          Database Setting for MariaDB of XAMPP Server:
          host:"localhost",
          port:3306,
          password:"",
          username:"root",
          database:"test"
iv.     Now Creating Table in "test" Database:
        Query: CREATE TABLE users(Id int AUTO_INCREMENT PRIMARY KEY, Username varchar(50) NOT NULL UNIQUE, Email varchar(50) NOT NULL           UNIQUE, Password varchar(100) NOT NULL, Status bool);


2.  How to Run Nodejs Server
i.  Make sure your directory should be like below
  -D:
     ->
