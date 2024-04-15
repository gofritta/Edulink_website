import express from "express";
import bcrypt from 'bcrypt';
import {getStudent, insertNewStudent,getStudentName , getSchoolByState} from './database.js';
import pool from './connection.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
import { error } from "console";
import.meta.url
const app = express();
const PORT = 3000 || process.env.PORT;
//middleware
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Serve static files from the same directory as server.js
const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));

// Route for serving the student registration HTML file
app.get("/student_regist.html", (req, res) => {
  res.sendFile(path.join(publicPath, "student_regist.html"));
});
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
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.json(schools);
  }catch(error){
    console.error(error);
     res.status(500).send("Error retreiving School.");
  }
})
// User registration 
app.post("/student", async (req, res) => {
    try {
      const { name, email, password, gender, birthdate } = req.body; 
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const insertedId = await insertNewStudent(pool, name, email, gender, birthdate, hashedPassword); // Pass additional data
  
      res.status(201).send("User created successfully!");
    } catch (error) {
      console.error(error);
      res.status(400).send("An error occurred during user registration."); 
    }
  });
  // User login
  app.post("/student/login", async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.status(400).send("Missing Password or name, both are required!");
      }
      const student = await getStudentName(pool, name);
      if (!student) {
        return res.status(401).send("Invalid credentials."); // Avoid revealing non-existence
      }
      const isPasswordValid = await bcrypt.compare(password, student[0].password_s);
  
      if (!isPasswordValid) {
        return res.status(401).send("Invalid credentials , password invalid."); // Avoid revealing specific details
      }
  
      // Login successful (optional: generate session token , will be reconsiderated later!!)
      res.status(200).send( {message: "Login successful!"});
  
    }catch (error) {
      console.error(error);
      res.status(500).send("Internal server error."); // Generic error message
    }
  });  

  // more to go!!

  
app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) ;
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 