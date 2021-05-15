const mysql = require('mysql2');

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


module.exports = db;