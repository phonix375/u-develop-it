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

)

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
  });


//default response to all unfound pages
app.use((req, res) => {
    res.status(404).end();
})


app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`);
})