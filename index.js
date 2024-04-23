import express from 'express';
import mysql from 'mysql2';
const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',    //utiliser votre mot de passe mySQL
    database: 'edulink'
});

db.connect((err)=> {
    if(err){
        return console.error(err.message)
    } else {
        console.log("DATABASE connected successfuly!")
    }
});

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

  app.get('/school/id', (req, res) => {
    
    // Récupération du paramètre state_sch
    const id = req.query.id_sch;

    
  
    // Requête SQL
    const sql = `SELECT * FROM school WHERE id_sch = ?`;
  
    // Exécution de la requête
    db.query(sql, [id], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        // Envoi du résultat
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(results);
      }
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
