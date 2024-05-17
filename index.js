import express, { json } from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3000;
// Configurer l'application pour utiliser body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
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

    db.query('INSERT INTO school (fstName, famName, name_sch, email_sch, password_sch, state_sch, adress_sch, number_sch) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, namesch, emailsch, passwordsch, statesch, adresssch, numbersch], (err, result) => {
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
      res.status(500).send(error.message);
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
  
  db.query(`INSERT INTO school (name_sch, email_sch, password_sch, state_sch, adress_sch, number_sch) VALUES (?, ?, ?, ?, ?, ?)`, [name_sch, email_sch, password_sch, state_sch, adress_sch, number_sch], (err, result)=> {
  if(err){
      console.log('Erreur lors de la suppression du demande');
      res.status(500);
  }else{
      console.log('Ecole ajouter au base de donnée table school');
      res.status(201);
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



// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
