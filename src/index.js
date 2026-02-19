require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000; 

const pool = require('./config/db');

app.use(express.json()); 

const userRoutes = require('./api/routes/userRoutes');
const messageRoutes = require('./api/routes/messageRoutes');
const test = require('node:test');
app.use('/users', userRoutes); 
app.use('/messages', messageRoutes);

app.get('/', (req, res) => {
    res.json('chat-api running');
}); 

async function testDBConnection() {
    try {
        const connection = await pool.promise().getConnection();
        console.log("connected to MySQL");
        connection.release();
    } catch (err) {
        console.error("MySQL connection failed:", err.message);
        process.exit(1); 
    }
};

testDBConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("failed to start server:", err);
    process.exit(1);
}); 