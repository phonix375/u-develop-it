const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

//express midleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Zxasqw!@12',
        database: 'election'
    },
    console.log('connect to the database')

);
//get all candidates
app.get('/api/candidates' ,(req,res) => {
    const sql = `SELECT * FROM candidates`;
    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({error:err.message});
        }
        res.json(
            {
                message:'success',
                data: rows
            });
        });
});

app.get('/api/candidate/:id',(req,res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(400).json({error: err.message});
        }else{
            res.json({
                message:'success',
                data: row
            });
        }
    });
    


});

app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });


// create a candidate
app.post('/api/candidate', ({body}, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if(errors) {
    res.status(400).json({error : errors});
    return;
  }else{
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;

    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result)=>{
      if(err){
        res.status(400).json({error: err.message});
      }else{
        res.json({
          message: 'success',
          data: body
        });
      }
    })
  }
})



//default response to all unfound pages
app.use((req, res) => {
    console.log('not here');
    res.status(404).end();
})


app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`);
})