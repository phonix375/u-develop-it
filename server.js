const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection')

const PORT = process.env.PORT || 3001;
const app = express();

//express midleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use('/api', apiRoutes);


//default response to all unfound pages
app.use((req, res) => {
    console.log('not here');
    res.status(404).end();
})


app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`);
})