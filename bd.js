import mysql, { createConnection } from 'mysql2';

const connection = createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function getSchoolByState(state){
connection.connect((err)=> {
    if(err){
        return console.error(err.message)
    } else {
        console.log("DATABASE connected successfuly!")
    }

    let sql = `select * from school WHERE state_sch=?`;

    connection.query(sql, [State], (error, results, fields) => {
        if(error)
            return console.error(error.message);
        console.log(results)
    });

    connection.end()
});
}

getSchoolByState("Blida");
