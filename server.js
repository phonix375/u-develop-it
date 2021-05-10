const express = require('express');
const mysql = require('mysql2');

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
app.get('/api/candidates' ,(req,res) => {
    console.log('Im here');
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


//select one candidate by ID
// db.query(`SELECT * FROM candidates WHERE id = 20`, (err, row) =>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(row);
//     }
// })


// delete
// db.query(`DELETE FROM candidates WHERE id = ?`,1,(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// })
// //create a candidate

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
// const params = [1,'Ronald', 'Firbank', 1];

// db.query(sql, params, (err,result) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// });
//default response to all unfound pages
app.use((req, res) => {
    console.log('not here');
    res.status(404).end();
})


app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`);
})