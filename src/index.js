require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000; 

const pool = require('./config/db');

app.use(express.json()); 

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected to MySQL"); 
    connection.release(); 
});

app.get('/', (req, res) => {
    res.json('chat-api running');
}); 

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
}); 