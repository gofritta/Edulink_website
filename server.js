import express from "express";
import bcrypt from 'bcrypt';
import {getStudent, insertNewStudent,getStudentByEmail  , getSchoolByState, insertSubject, getSchoolById, getStudentByName,updateUserInformation, updateUserName, updateUserPassword} from './database.js';
import pool from './connection.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import session from 'express-session';
import passport from './auth.js';
import.meta.url;
import bodyParser from "body-parser";
import cors from 'cors';
import mysql from 'mysql2';
import ejs, { name } from 'ejs';

const app = express();
const PORT = 3000 || process.env.PORT;
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
      const insertedStudent = await getStudentByEmail(pool, email);
      req.session.user = {
        id: insertedStudent[0].id_s,
        email: email,
        name : name,
        birthdate: birthdate
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
        id: student[0].id_s, // bach nasta3malha f l code lta7t 
        email: student[0].email_s,
        name : student[0].name_s,
        birthdate : student[0].birthdate_s
    };
    console.log(req.session.user.id); // Check id_s wila t3amrat fih 
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
<<<<<<< HEAD

=======
>>>>>>> origin/master
app.get('/projet-p/school/profile', checkAuthenticated, async (req, res) => {
  try {
      const schoolId = req.query.id;
      // Add schoolId to session
      req.session.schoolId = schoolId;
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
    
    if (result >= 1) {
      res.status(201).send('Your enrollment was successful. Please contact the school for further details.')
    //  res.redirect('/student/homepage');
    } else {
      throw new Error("Unfortunately, your enrollment wasn't successful.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.get('/student/account', checkAuthenticated, async(req, res) => {
  const name = req.session.user.name;
  try {
    const student = await getStudentByName(pool, name);
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }

})
app.put('/student/account/edit', checkAuthenticated, async (req, res) => {
  const { newName, oldPassword, newPassword } = req.body;
  const name = req.session.user.name;
  const salt = await bcrypt.genSalt(10);
  try {
      const student = await getStudentByName(pool, name);
      let updateName = false;
      let updatePassword = false;
      if (newName && newName !== student[0].name_s) {
          updateName = true;
      }if (newPassword) {
          updatePassword = true;
          const passwordMatch = await bcrypt.compare(oldPassword, student[0].password_s);
          
          if (!passwordMatch) {
              return res.status(400).send('Old password is incorrect');
          }
      }
      // Update the user's information based on the user's choices
      if (updateName && updatePassword) {
          // Update both name and password
          const hashedNewPassword = await bcrypt.hash(newPassword, salt);
          await updateUserInformation(pool, name, newName, hashedNewPassword);
      } else if (updateName) {
          // Update only the name
          await updateUserName(pool, name, newName);
      } else if (updatePassword) {
          // Update only the password
          const hashedNewPassword = await bcrypt.hash(newPassword, salt);
          await updateUserPassword(pool, name, oldPassword, hashedNewPassword);
      }
      // Update the name in the session if it's changed
    if (updateName) {
      req.session.user.name = newName;
    }
      // Redirect to student account page after successful edit/update
      res.redirect('/student/account');
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
app.get('/student/account', checkAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'school - copie', 'profil.html'))
})
/*app.get('/student/account/edit', checkAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'school - copie', 'profil.html'))
})*/

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
/********************************teachers li tokhraj l school *************************************** */
app.get('/schools/teachers', async (req, res) => {
  const schoolId = req.query.id;
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


app.post('/schools/teachers', async (req, res) => {
  const schoolId =  req.query.id;
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

app.post('/schools/teachers/delete/:teacherId', async (req, res) => {
  const schoolId =  req.query.id;
  const teacherId = req.params.teacherId;// hadi brk manich 3arfa wch rk msami l id ta3 teacher f query 
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
/********************************teachrs li tokhraj l student ******************************** */
<<<<<<< HEAD
  
app.get('/student/teachers', async (req, res) => {
  const schoolId = req.session.schoolId; // Retrieve schoolId from the query string
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

/**************************************comments*********************************************** */



app.get('/comments', async (req, res) => {
  try {
      const  schoolId  = req.session.schoolId;
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

app.post('/comments/comment', async (req, res) => {
  const schoolId = req.session.schoolId
  const { comment} = req.body; // Access schoolId from req.body
  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO review (id_s, comment_text, comment_date, school_id) VALUES (?, ?, NOW(), ?)', [req.session.user.id, comment, schoolId]);
    connection.release();
    res.redirect(`/comments?schoolId=${schoolId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/comments/like', async (req, res) => {
  const { comment_id } = req.body;
  const  schoolId  =  req.session.schoolId;
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

app.post('/comments/comment/delete', async (req, res) => {
  const { commentId } = req.body;
  const userId =req.session.user.id; 
  const { schoolId } = req.body;
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
          res.status(403).json({ success: false, error: "huh is this your comment ? sorry but you can't delete this comment !" });
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


/********************commets ta3 school***************************************** */
app.get('/comments/school', async (req, res) => {
  try {
      const schoolId  = req.query;
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
      SELECT 
      r.*,
      s.name_s AS user_name,
      COUNT(l.like_id) AS likes_count,
      CASE WHEN MAX(l.like_id) IS NOT NULL THEN true ELSE false END AS is_liked_by_current_user
  FROM 
      review r 
  INNER JOIN 
      student s ON r.id_s = s.id_s
  LEFT JOIN 
      likes l ON r.comment_id = l.comment_id
  WHERE 
      r.school_id = ?
  GROUP BY 
      r.comment_id, 
      s.name_s, 
      r.comment_text, 
      r.comment_date
      `, [schoolId]);
      connection.release();
      res.render('comment_school', { reviews: rows, schoolId: schoolId });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Configuration de la base de données
const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456789*',    //utiliser votre mot de passe mySQL
  database: 'edulink'
});

db.connect((err)=> {
  if(err){
      return console.error(err.message)
  } else {
      console.log("DATABASE connected successfuly!")
  }
});


// Route pour  une école selon son wilaya
app.get('/school', (req, res) => {
  
  // Récupération du paramètre state_sch
  const state = req.query.state_sch;

  // Requête SQL
  const sql = `SELECT * FROM school WHERE state_sch = ?`;

  // Exécution de la requête
  db.query(sql, [state], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // Envoi du résultat
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});


// Route pour obtenir une école par son id
app.get('/school/id', (req, res) => {
  
  // Récupération du paramètre state_sch
  const id = req.query.id_sch;

  // Exécution de la requête
  db.query(`SELECT * FROM school WHERE id_sch = ?`, [id], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // Envoi du résultat
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});


// Route pour l'enregistrement d'une école
app.post('/inscrit-school', (req,res) =>{
  const { firstName, lastName ,namesch, emailsch, passwordsch, statesch, adresssch, numbersch } = req.body;

  db.query('INSERT INTO schoolusers (firstName, lastName, namesch, emailsch, passwordsch, statesch, adresssch, numbersch, registerdate, statussch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), "Pending")', [firstName, lastName, namesch, emailsch, passwordsch, statesch, adresssch, numbersch], (err, result) => {
    if(err){
      console.log('Erreur lors de poster votre demande, réessayez : ', err);
      res.status(500).send(`<h3>Erreur lors de poster votre demande, réessayez</h3>`);
      return;
    }else{
      console.log('École enregistrée avec succès');
      res.status(200).send(`<h3>votre demande enregistré, administrateur va traiter votre demande ultératement</h3>`);
    }
  });
});


// Route pour obtenir les écoles pending
app.get('/school-pending', (req, res) => {

// Exécution de la requête
db.query(`SELECT * FROM schoolusers WHERE statussch = "pending"`, (error, results) => {
  if (error) {
    res.status(500).send('Il n\'y a pas des demande en attente pour le moment');
  } else {
    // Envoi du résultat
    
    console.log('Pending schools returned');
    res.json(results);
  }
});
});


// Router pour supprimer un demande d'école par Admin
app.delete('/reject', (req, res)=> {

const email = req.query.emailsch;

db.query(`delete from schoolusers where emailsch=?`, [email], (err, result)=> {
    
  if(!err){
    console.log('Ecole supprimer depuis base de données ');
    res.status(200);
   
  }else{
    console.log('Erreur lors de la suppression du demande');
    res.status(500);
  }

});

});

//Router pour accepter les demandes des écoles par Admin
app.post('/accept', (req, res)=> {

const { name_sch, email_sch, password_sch, state_sch, adress_sch, number_sch } = req.body 

db.query(`INSERT INTO school(name_sch, email_sch, password_sch, state_sch, adress_sch, number_sch, url) VALUES (?, ?, ?, ?, ?, ?, "./image5.jpg")`, [name_sch, email_sch, password_sch, state_sch, adress_sch, number_sch], (err, result)=> {
if(err){
    console.log('Erreur lors de la suppression du demande');
    res.status(500).send('Erreur lors l\'insertion');
}else{
    console.log('Ecole ajouter au base de donnée table school');
    res.status(201).send('Ecole ajouter à la base de donnée');
  }
});
});

//Router pour school sign-in les demandes des écoles par Admin
app.get('/schoolsignin', (req,res) => {

const email_sch = req.query.email_sch;
const password_sch = req.query.password_sch;

db.query(`select * from school where email_sch=? and password_sch=?`, [email_sch, password_sch], (error, results) => {
  if(error){
    res.status(500).send(error.message);
  }else{
    console.log('Login with succèss');
    res.json(results);
  }
});
});


//Router pour poster un rapport:

app.post('/post-rapport', (req, res)=> {

const { name_s, rapport_c } = req.body;

db.query(`INSERT INTO rapport (name_s, date_c, rapport_c) VALUES (?, CURDATE(), ?)`, [name_s, rapport_c], (err, result)=> {
if(err){
    console.log('Erreur lors de posting rapport');
    res.status(500).send('Erreur !!');
}else{
    console.log('posting rapport SUCCESSFULLY');
    res.status(201).send('posting rapport SUCCESSFULLY');
  }
});
});

// Route pour obtenir les rapports

app.get('/rapport', (req, res) => {
  

// Exécution de la requête
db.query(`SELECT * FROM rapport`, (error, results) => {
  if (error) {
    res.status(500).send(error.message);
  } else {
    // Envoi du résultat
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(results);
  }
});
});
app.get('/schedule', (req, res) => {
  res.sendFile('schedule.html', { root: __dirname} )
})
=======
  
app.get('/student/teachers', async (req, res) => {
  const schoolId = req.session.schoolId; // Retrieve schoolId from the query string
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

/**************************************comments*********************************************** */



app.get('/comments', async (req, res) => {
  try {
      const  schoolId  = req.session.schoolId;
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

app.post('/comments/comment', async (req, res) => {
  const schoolId = req.session.schoolId
  const { comment} = req.body; // Access schoolId from req.body
  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO review (id_s, comment_text, comment_date, school_id) VALUES (?, ?, NOW(), ?)', [req.session.user.id, comment, schoolId]);
    connection.release();
    res.redirect(`/comments?schoolId=${schoolId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/comments/like', async (req, res) => {
  const { comment_id } = req.body;
  const  schoolId  =  req.session.schoolId;
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

app.post('/comments/comment/delete', async (req, res) => {
  const { commentId } = req.body;
  const userId =req.session.user.id; 
  const { schoolId } = req.body;
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
          res.status(403).json({ success: false, error: "huh is this your comment ? sorry but you can't delete this comment !" });
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


/********************commets ta3 school***************************************** */
app.get('/comments/school', async (req, res) => {
  try {
      const schoolId  = req.query;
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`
      SELECT 
      r.*,
      s.name_s AS user_name,
      COUNT(l.like_id) AS likes_count,
      CASE WHEN MAX(l.like_id) IS NOT NULL THEN true ELSE false END AS is_liked_by_current_user
  FROM 
      review r 
  INNER JOIN 
      student s ON r.id_s = s.id_s
  LEFT JOIN 
      likes l ON r.comment_id = l.comment_id
  WHERE 
      r.school_id = ?
  GROUP BY 
      r.comment_id, 
      s.name_s, 
      r.comment_text, 
      r.comment_date
      `, [schoolId]);
      connection.release();
      res.render('comment_school', { reviews: rows, schoolId: schoolId });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

>>>>>>> origin/master

/***************************************************************************************************88 */
app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) ;
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 

