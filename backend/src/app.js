const express = require('express');
const cors = require('cors');

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //Alows parsing JSON bodies

//test route
app.get('/ping', (req, res) => {
    res.status(200).json({
        message: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

module.exports = app;