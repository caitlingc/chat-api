require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000; 

app.use(express.json()); 

app.get('/', (req, res) => {
    res.json('chat-api running');
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});