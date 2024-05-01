import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy  as LinkedInStrategy} from 'passport-linkedin-oauth2';
import pool from './connection.js'; // Import the database connection pool
import dotenv from "dotenv";
dotenv.config();


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  profileFields: ['id', 'displayName', 'email', 'gender', 'birthday']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Query the database directly to check if the student exists
    const [existingStudent] = await pool.query('SELECT * FROM student WHERE email_s = ?', [profile.emails[0].value]);
    
    if (!existingStudent.length) {
      // If the student doesn't exist, insert a new student
      const [result] = await pool.query('INSERT INTO student (name_s, email_s, gender_s, birthdate_s) VALUES (?, ?, ?, ?)', [profile.displayName, profile.emails[0].value, profile.gender, profile.birthday]);
      
      const newStudent = {
        id: result.insertId,
        name: profile.displayName,
        email: profile.emails[0].value
      };
      console.log(newStudent);
      return done(null, newStudent);
    } else {
      // If the student exists, return the student from the database
      const student = existingStudent[0];
      return done(null, student);
    }
  } catch (error) {
    return done(error);
  }
}));
//facebook authentication
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email', 'gender', 'birthday']
},async (accessToken, refreshToken, profile, done) => {
  try {
    // Query the database directly to check if the student exists
    const [existingStudent] = await pool.query('SELECT * FROM student WHERE email_s = ?', [profile.emails[0].value]);
    
    if (!existingStudent.length) {
      // If the student doesn't exist, insert a new student
      const [result] = await pool.query('INSERT INTO student (name_s, email_s, gender_s, birthdate_s) VALUES (?, ?, ?, ?)', [profile.displayName, profile.emails[0].value, profile.gender, profile.birthday]);
      
      const newStudent = {
        id: result.insertId,
        name: profile.displayName,
        email: profile.emails[0].value
      };
      console.log(newStudent);
      return done(null, newStudent);
    } else {
      // If the student exists, return the student from the database
      const student = existingStudent[0];
      return done(null, student);
    }
  } catch (error) {
    return done(error);
  }
}));

//LinkedIn authentication
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  profileFields: ['id', 'displayName', 'email', 'gender', 'birthday']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Query the database directly to check if the student exists
    const [existingStudent] = await pool.query('SELECT * FROM student WHERE email_s = ?', [profile.emails[0].value]);
    
    if (!existingStudent.length) {
      // If the student doesn't exist, insert a new student
      const [result] = await pool.query('INSERT INTO student (name_s, email_s, gender_s, birthdate_s) VALUES (?, ?, ?, ?)', [profile.displayName, profile.emails[0].value, profile.gender, profile.birthday]);
      
      const newStudent = {
        id: result.insertId,
        name: profile.displayName,
        email: profile.emails[0].value
      };
      console.log(newStudent);
      return done(null, newStudent);
    } else {
      // If the student exists, return the student from the database
      const student = existingStudent[0];
      return done(null, student);
    }
  } catch (error) {
    return done(error);
  }
}));
passport.serializeUser((user, done) => {
  // Check if the user object has the necessary identifier field
  if (user && user.id) {
    done(null, user.id); // Serialize the user using the 'id' field
  } else {
    done(new Error('User ID not found')); // Handle the case where the identifier field is missing
  }
});


passport.deserializeUser(async (id, done) => {
  try {
    // Deserialize the user by fetching the user from the database using the ID
    const [student] = await pool.query('SELECT * FROM student WHERE id_s = ?', [id]);
    done(null, student[0]);
  } catch (error) {
    done(error);
  }
});

export default passport;