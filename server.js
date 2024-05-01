import express from "express";
import bcrypt from 'bcrypt';
import {getStudent, insertNewStudent,getStudentByEmail  , getSchoolByState, insertSubject, getSchoolById} from './database.js';
import pool from './connection.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import session from 'express-session';
import passport from './auth.js';
import.meta.url;
import bodyParser from "body-parser";
import cors from 'cors';
import ejs, { name } from 'ejs';

const app = express();
const PORT = 3000 || process.env.PORT;
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//app.use(express.urlencoded({ extended: true }));
// Serve static files from the same directory as server.js
const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'signin'),
  path.join(__dirname, 'projet-p')
]);

app.set('view engine', 'ejs');

// adding session 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized : false,
  //cookie??
}));
app.use(passport.initialize());
app.use(passport.session());
 const router = express.Router();
// using express-falsh for flash messages 

// Route for serving the student registration HTML file
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
/*app.get('/school', (req, res) => {
  const state = req.query.state;

  
  const sql = `SELECT * FROM school WHERE state_sch = ?`;

  
  db.query(sql, [state], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});*/

// Search for school by their State
app.get('/student/homepage/school', async (req, res) => {
  const state = req.query.state;

  try {
      const schools = await getSchoolByState(pool, state);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(schools);
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
  }
});

// User registration 
app.post("/student/register",checkNotAuthenticated, async (req, res) => {
    try {
      const { name, email, password, gender, birthdate } = req.body; 
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const insertedId = await insertNewStudent(pool, name, email, gender, birthdate, hashedPassword); // Pass additional data
      req.session.user = {
        email: email,
        name : name
    };
     //res.status(201).send("User created successfully!");
     //console.log(`User ${name} registered successfully `);
      res.redirect("/student/homepage");
      
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
    
      if (!student || student.length === 0) {
        return res.status(401).send("Invalid credentials."); // Avoid revealing non-existence
      }
      const isPasswordValid = await bcrypt.compare(password, student[0].password_s);
  
      if (!isPasswordValid) {
        return res.status(401).send("Invalid credentials , password invalid."); // Avoid revealing specific details
      }req.session.user = {
        email: student[0].email_s,
        name : student[0].name_s
    };
    // Redirect to homepage after successful login
    res.redirect("/student/homepage");
    }catch (error) {
      console.error(error);
      res.redirect("/student/login");
    }
  });  
  //google authentication
 // Route for Google authentication
app.get('/auth/google',
passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google authentication
app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/student/login' }),
(req, res) => {
  req.session.user = {
    id: req.user.id,
    name: req.user.name
  };
  res.redirect('/student/homepage');
});
//facebook authentication
app.get('/auth/facebook',
passport.authenticate('facebook', { scope: ['profile', 'email'] })
);

// Callback route after Facebook authentication
app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/student/login' }),
(req, res) => {
  // Successful authentication
  req.session.user = {
    id: req.user.id,
    name: req.user.name
  };
  res.redirect('/student/homepage');
});

//LinkedIn authentication
app.get('/auth/linkedin',
passport.authenticate('linkedin', { scope: ['profile', 'email'] })
);

// Callback route after LinkedIn authentication
app.get('/auth/linkedin/callback',
passport.authenticate('linkedin', { failureRedirect: '/student/login' }),
(req, res) => {
  // Successful authentication
  req.session.user = {
    id: req.user.id,
    name: req.user.name
  };
  res.redirect('/student/homepage');
});
app.get('/projet-p/school/profile', checkAuthenticated, async (req, res) => {
  try {
      const schoolId = req.query.id;
      const school = await getSchoolById(pool, schoolId);
      console.log( school)
      if (school) {
        const absolutePath = path.resolve(__dirname, 'projet-p', 'ecole-profile.html');
         res.sendFile(absolutePath);
         //res.sendFile('ecole-profile')
         //res.setHeader('Access-Control-Allow-Origin', '*');
      } else {
          res.status(404).send('School not found');
      }
  } catch (error) {
      console.error('Error fetching school details:', error);
      res.status(500).send('Error fetching school details');
  }
});
app.get('/school/get', checkAuthenticated,  async (req, res) =>{
  try {
    const schoolId = req.query.id;
    const school = await getSchoolById(pool, schoolId);
    console.log( school)
    if (school) {
      res.json(school)
      
    } else {
        res.status(404).send('School not found');
    }
} catch (error) {
    console.error('Error fetching school details:', error);
    res.status(500).send('Error fetching school details');
}
})
//student registration to school
app.post('/school/enroll', checkAuthenticated, async (req, res) => {
  const student = req.session.user.name;
  const subject = req.body.subject;
  const school = req.body.school; 
  try {
    let result;
    if (subject) {
      result = await insertSubject(pool, subject, student, school);
    } else {
      throw new Error("Your enrollment attempt was unsuccessful.");
    }
    
    if (result === 1) {
      res.send('your enrollement was succesfull ')
    //  res.redirect('/student/homepage');
    } else {
      throw new Error("Unfortunately, your enrollment wasn't successful.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
//logout
app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session obv
  res.redirect('/');
});

  //routes
 app.get('/', checkAuthenticated, (req, res) => {
  res.sendFile('index.html', { root: __dirname});
});
app.get('/student/homepage', checkAuthenticated, (req, res) => {
  res.render('student_search', { studentName: req.session.user.name });
});
app.get('/student/login', checkNotAuthenticated, (req, res) => {
  res.render('index');
});
app.get('/student/register', checkNotAuthenticated, (req, res) => {
  res.render('index'); 
});

/*app.get('/student/homepage/school', checkAuthenticated, (req, res) =>{
  res.render('student_search')
})*/
app.get('/school/enroll', checkAuthenticated, (req, res) => {
  res.render('ecole-profile')
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