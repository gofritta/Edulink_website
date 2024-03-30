import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();
con.connect((err) => {
    if (err) {
        throw err;
    }
    console.error("Connected successfully !!");
});

 async function getStudent() {
    try {
        const result = await con.query("SELECT * FROM student");
        return result[0];
    } catch (error) {
        console.error('Error:', error);
        throw error; // Return null or handle the error as needed
    } 
}
 async function getStudentID(id){
    try{
     const [result] = await con.query(`
     SELECT * FROM student WHERE id_s = ?
     `, [id]);
     return result;
    }catch(error){
        console.error("Error:" , error);
        throw error;
    }
}
 async function getSchool(){
    try{
        const [result] = await con.query("SELECT * FROM school")
        return result;
    }catch(error){
        console.error("Error:" , error);
        throw error;
    }
}
 async function getSchoolByState(state){
    try{
        const [result] = await con.query(`
        SELECT * FROM school WHERE state_sch= ?` , 
        [state])
        return result;
    }catch(error){
        console.error("Error:" , error);
        throw error; ;
    }
}
async function insertNewStudent(name , gender , birthdate, email, password){
    try{
        const result = await con.query(
            `INSERT INTO student(name_s, gender_s, birthdate_s, email_s , password_s)
             VALUES(? , ?, ?, ?, ?)`
        , [name, gender, birthdate, email, password])
        return result.insertId;
    }catch(error){
        console.error(error);
        throw error;
    }
}
/*const resultOfInsertion = await insertNewStudent('Djalil Palermo' , 'male', '2000-08-31', 'djalilLaClasse@gmail.com', 'may7ebonach');
console.log(resultOfInsertion);*/

Promise.all([getStudent(),getSchool(), getSchoolByState('Blida')])
.then(([result1 ,result2, value])=> {
    console.log(result1); // Log the result returned by the query
    console.log(result2);
    console.log(value);
    con.end();
}).catch(error => {
    console.error('Error:', error);
    con.end();
});
export { getStudent, getSchool, getSchoolByState, getStudentID };
