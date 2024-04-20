
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
// insert new students (used for registrations)
async function insertNewStudent(pool, name, email, gender, birthdate, hashedPassword) {
    try {
      const result = await pool.query(
        `INSERT INTO student(name_s, email_s, gender_s, birthdate_s, password_s) VALUES(?, ?, ?, ?, ?)`,
        [name, email, gender, birthdate, hashedPassword]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error inserting student:', error);
      throw error; // Re-throw for handling in server.js
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
}
// some testing displaying 
/* const resultOfInsertion = await insertNewStudent('Djalil Palermo' , 'male', '2000-08-31', 'djalilLaClasse@gmail.com', 'may7ebonach');
console.log(resultOfInsertion);
Promise.all(getStudent())
.then((result1 )=> {
    console.log(result1); // Log the result returned by the query
  console.log(result2);
    console.log(value);
   // con.end();
//}).catch(error => {
   /* console.error('Error:', error);
    con.end();
})
const result = await getStudentByEmail(pool , "tfmtourifiga@gmail.com");
console.log(result);*/
export {getStudent, getSchool, getSchoolByState, getStudentID, insertNewStudent, getStudentByEmail};

