import express from "express";
import bcrypt from 'bcrypt';
import {getStudent, insertNewStudent,getStudentByEmail  , getSchoolByState} from './database.js';
import pool from './connection.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import session from 'express-session';
import passport from 'passport';

import.meta.url;
const app = express();
const PORT = 3000 || process.env.PORT;
//middleware
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Serve static files from the same directory as server.js
const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));
// adding session 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized : false,
  //cookie??
}));

// using express-falsh for flash messages 

// Route for serving the student registration HTML file
/*app.get("/student_regist.html", (req, res) => {
  res.sendFile(path.join(publicPath, "student_regist.html"));
});*/
// ___________________<3________________________
// get /student route ?!
app.get("/student", async(req, res) => {
    try{
        const student = await getStudent(pool);
        res.json(student);
      // console.log(student);
    }catch{
        console.error(error);
        res.status(500).send("Something broke!")
    }
});
// Search for school by their State
app.get("/school" , async(req, res) => {
  const state = req.query.state_sch;
  try{
    const schools = await getSchoolByState(pool , state)
     res.status(201).send("School is found successfully!");
     res.json(schools);
  }catch(error){
    console.error(error);
     res.status(500).send("Error retreiving School.");
  }
})
// User registration 
app.post("/student/register",checkNotAuthenticated, async (req, res) => {
    try {
      const { name, email, password, gender, birthdate } = req.body; 
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const insertedId = await insertNewStudent(pool, name, email, gender, birthdate, hashedPassword); // Pass additional data
       
     //res.status(201).send("User created successfully!");
      console.log(name);
      res.redirect("/student/login");
      console.log(insertedId);
    } catch (error) {
      console.error(error);
     // res.status(400).send("An error occurred during user registration."); 
      res.redirect("/student/register")
    }
  });
  
  // User login 
  app.post("/student/login",checkNotAuthenticated, async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send("Missing Password or email, both are required!");
      }
  
      const student = await getStudentByEmail(pool, email);
      if (!student) {
        return res.status(401).send("Invalid credentials."); // Avoid revealing non-existence
      }
      const isPasswordValid = await bcrypt.compare(password, student[0].password_s);
  
      if (!isPasswordValid) {
        return res.status(401).send("Invalid credentials , password invalid."); // Avoid revealing specific details
      }
      req.session.user = {
        email: student[0].email, // or any other user data you want to store
        // You can add more user data here if needed
    };

    // Redirect to homepage after successful login
    //res.redirect("/");
    console.log(req.session.user)
      // Login successful (optional: generate session token , will be reconsiderated later!!)
     res.status(200).send( {message: "Login successful!"});
    }catch (error) {
      console.error(error);
     // res.status(500).send("Internal server error.");
      res.redirect("/student/login");
    }
  });  
 //routes

 app.get('/', checkAuthenticated, (req, res) => {
  res.render("index.html", {name: req.user.name}, { root: __dirname })
  
})
 app.get('/student/login', checkNotAuthenticated, (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/student/register', checkNotAuthenticated, (req, res) => {
  res.sendFile('index.html', { root: __dirname }); 
});

// function to check authentication
// if authenticated , go to login page
function checkAuthenticated(req, res, next){
  if (req.session && req.session.user){
      return next();
  }
  res.redirect("/student/login");
}
// if not authenticated return to homepage
function checkNotAuthenticated(req, res, next){
  if (req.session && req.session.user){
      return res.redirect("/");
  }
  next();
}

  // more to go!!
  
  
app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) ;
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 