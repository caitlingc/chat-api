require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000; 

const pool = require('./config/db');

app.use(express.json()); 

const userRoutes = require('./api/routes/userRoutes');
app.use('/users', userRoutes); 

app.get('/', (req, res) => {
    res.json('chat-api running');
}); 

pool.getConnection((err, connection) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        process.exit(1); 
    }
    console.log("connected to MySQL"); 
    connection.release(); 

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    }); 
}); 