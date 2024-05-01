
import pool from './connection.js'; 

// displays all the students 

async function getStudent(pool) {
  try {
    const [result] = await pool.query("SELECT * FROM student");
    return result;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error; // Re-throw for handling in server.js
  }
}
// gets student name (used for login )
async function getStudentByEmail(pool, email){
    try{
        const result = await pool.query( `SELECT * FROM student WHERE email_s = ? `, [email]);
       
        if (result.length > 0){
        return result[0];
        } else{
          return null;
        }
    }catch(error){
        console.error(`Error fetching student: ${error}`);
        throw error;
    }
}
//get school by ID
async function getSchoolById(pool, id){
  try{
      const result = await pool.query( `SELECT * FROM school WHERE id_sch = ? `, [id]);
     
      if (result.length > 0){
      return result[0];
      } else{
        return null;
      }
  }catch(error){
      console.error(`Error fetching school: ${error}`);
      throw error;
  }
}
// insert new students (used for registrations)
async function insertNewStudent(pool, name, email, gender, birthdate, hashedPassword) {
    try {
      const result = await pool.query(
        `INSERT INTO student(name_s, email_s, gender_s, birthdate_s, password_s) VALUES(?, ?, ?, ?, ?)`,
        [name, email, gender, birthdate, hashedPassword]
      );
      return result[0].insertId;
    } catch (error) {
      console.error('Error inserting student:', error);
      throw error; // Re-throw for handling in server.js
    }
  }
async function insertSubject(pool, subject, student, school){
  try {
    const result = await pool.query(
    `INSERT INTO inscription (student_id, school_id, subject)
    VALUES (
    (SELECT id_s FROM student WHERE name_s = ?), 
    (SELECT id_sch FROM school WHERE name_sch= ?), 
    ?) `,[student, school, subject]
);
    return result[0].affectedRows
  } catch (error) {
    console.error(`Could not enroll ${student} in ${subject} subject.`);
    throw error
  }
}
  
// gets specific students using their id

 async function getStudentID(pool, id){
    try{
     const [result] = await pool.query(`
     SELECT * FROM student WHERE id_s = ?
     `, [id]);
     return result;
    }catch(error){
        console.error("Error:" , error);
        throw error;
    }
} 
// displays all schools
 async function getSchool(){
    try{
        const [result] = await pool.query("SELECT * FROM school")
        return result;
    }catch(error){
        console.error("Error:" , error);
        throw error;
    }
}
 async function getSchoolByState(pool , state){
    try{
        const [result] = await pool.query(`
        SELECT * FROM school WHERE state_sch= ?` , 
        [state])
        return result;
    }catch(error){
        console.error("Error:" , error);
        throw error; ;
    }
};
export {getStudent, getSchool, getSchoolByState,getSchoolById, getStudentID, insertNewStudent, getStudentByEmail, insertSubject};