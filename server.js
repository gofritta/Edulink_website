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
import bodyParser from "body-parser";
import ejs from 'ejs';

const app = express();
const PORT = 3000 || process.env.PORT;
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//app.use(express.urlencoded({ extended: true }));
// Serve static files from the same directory as server.js
const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'signin')
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

console.log(session)
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
      const insertedStudent = await getStudentByEmail(pool, email);
      req.session.user = {
        id: insertedStudent[0].id_s,
        email: email,
        name : name
    };
    console.log(req.session.user.id); 
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
  app.post("/student/login", checkNotAuthenticated, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Missing Password or email, both are required!");
        }

        const student = await getStudentByEmail(pool, email);

        if (!student || student.length === 0) {
            return res.status(401).send("Invalid credentials.");
        }
        
        console.log(student); // to test ida l objet raho yat3amar 
        
        const isPasswordValid = await bcrypt.compare(password, student[0].password_s);

        if (!isPasswordValid) {
            return res.status(401).send("Invalid credentials , password invalid."); 
        }
        req.session.user = {
            id: student[0].id_s, // bach nasta3malha f l code lta7t 
            email: student[0].email_s,
            name: student[0].name_s
        };
        console.log(req.session.user.id); // Check id_s wila t3amrat fih 
        
        res.redirect("/student/homepage");
    } catch (error) {
        console.error(error);
        res.redirect("/student/login");
    }
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



//****************************************************************** */

app.get('/schools/:schoolId/teachers', async (req, res) => {
  const schoolId = req.params.schoolId;
  try {
      // Fetch teachers associated with the specified school from the database
      const [teachers] = await pool.query(`
          SELECT t.*
          FROM teacher t
          INNER JOIN work_for wf ON t.id_t = wf.id_t
          WHERE wf.id_sch = ?
      `, [schoolId]);
      
      // Pass the fetched teachers data to the EJS template for rendering
      res.render('teachers', { teachers, schoolId });
  } catch (error) {
      console.error('Error fetching teachers data:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.post('/schools/:schoolId/teachers', async (req, res) => {
  const schoolId = req.params.schoolId;
  const { name, gender, birthdate, employment, speciality } = req.body;
  try {
      // Insert the new teacher into the database
      await pool.query(`
          INSERT INTO teacher (name_t, gender_t, birthdate_t, employment_t, speciality)
          VALUES (?, ?, ?, ?, ?)
      `, [name, gender, birthdate, employment, speciality]);

      // Associate the new teacher with the specified school in the work_for table
      await pool.query(`
          INSERT INTO work_for (id_sch, id_t)
          VALUES (?, LAST_INSERT_ID())
      `, [schoolId]);

      // Redirect back to the teachers page after adding the teacher
      res.redirect(`/schools/${schoolId}/teachers`);
  } catch (error) {
      console.error('Error adding new teacher:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/schools/:schoolId/teachers/delete/:teacherId', async (req, res) => {
  const schoolId = req.params.schoolId;
  const teacherId = req.params.teacherId;
  try {
      // Delete the teacher from the work_for table to disassociate them from the school
      await pool.query(`
          DELETE FROM work_for
          WHERE id_t = ? AND id_sch = ?
      `, [teacherId, schoolId]);

      // Redirect back to the teachers page after deleting the teacher
      res.redirect(`/schools/${schoolId}/teachers`);
  } catch (error) {
      console.error('Error deleting teacher:', error);
      res.status(500).send('Internal Server Error');
  }
});

//****************************************************************************** */

app.get('/student/:schoolId/teachers', async (req, res) => {
  const schoolId = req.params.schoolId;
  try {
      // Fetch teachers associated with the specified school from the database
      const [teachers] = await pool.query(`
          SELECT t.*
          FROM teacher t
          INNER JOIN work_for wf ON t.id_t = wf.id_t
          WHERE wf.id_sch = ?
      `, [schoolId]);
      
      // Pass the fetched teachers data to the EJS template for rendering
      res.render('teacher_student', { teachers, schoolId });
  } catch (error) {
      console.error('Error fetching teachers data:', error);
      res.status(500).send('Internal Server Error');
  }
});

//******************************************************************** */

app.get('/comments/:schoolId', async (req, res) => {
  try {
      const { schoolId } = req.params;
      const connection = await pool.getConnection();
      const userId = req.session.user.id ; 
      const [rows] = await connection.query(`
          SELECT r.*, s.name_s AS user_name,
          CASE WHEN l.like_id IS NOT NULL THEN true ELSE false END AS is_liked_by_current_user
          FROM review r 
          INNER JOIN student s ON r.id_s = s.id_s
          LEFT JOIN likes l ON r.comment_id = l.comment_id AND l.id_s = ?
          WHERE r.school_id = ?
      `, [userId, schoolId]); 
      connection.release();
      res.render('comment', { reviews: rows, schoolId: schoolId });
    
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/comments/:schoolId/comment', async (req, res) => {
  const { comment } = req.body;
  const { schoolId } = req.params;
  try {
     
      const connection = await pool.getConnection();
      await connection.query('INSERT INTO review (id_s, comment_text, comment_date, school_id) VALUES (?, ?, NOW(), ?)', [10, comment, schoolId]); // Assuming id_s is 1 for now
      connection.release();
      res.redirect(`/comments/${schoolId}`);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/comments/like/:schoolId', async (req, res) => {
  const { comment_id } = req.body;
  const { schoolId } = req.params;
  const userId = req.session.user.id ; 

  try {
     
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM likes WHERE comment_id = ? AND id_s = ?', [comment_id, userId]);
      if (rows.length > 0) {
          res.status(400).json({ success: false, error: 'You have already liked this comment' });
          return;
      }

      
      await connection.query('INSERT INTO likes (comment_id, id_s) VALUES (?, ?)', [comment_id, userId]);
      await connection.query('UPDATE review SET likes_count = likes_count + 1 WHERE comment_id = ? AND school_id = ?', [comment_id, schoolId]);
      connection.release();
      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to like the comment' });
  }
});

app.post('/comments/comment/delete/:schoolId', async (req, res) => {
  const { commentId } = req.body;
  const userId =req.session.user.id; 
  const { schoolId } = req.params;
  try {
      
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT id_s, school_id FROM review WHERE comment_id = ?', [commentId]);
      if (rows.length === 0) {
          connection.release();
          res.status(404).json({ success: false, error: 'Comment not found' });
          return;
      }
      const commentAuthorId = rows[0].id_s;
      const commentSchoolId = rows[0].school_id;
      if (userId !== commentAuthorId ) {
          connection.release();
          res.status(403).json({ success: false, error: 'Unauthorized to delete this comment' });
          return;
      }
      
      await connection.query('DELETE FROM likes WHERE comment_id = ?', [commentId]);
      
      await connection.query('DELETE FROM review WHERE comment_id = ?', [commentId]);
      connection.release();
      res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to delete comment' });
  }
});

