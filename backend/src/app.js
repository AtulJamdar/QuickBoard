const express = require('express');
const cors = require('cors');
const classRoutes = require('./routes/classRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

//middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json()); //Alows parsing JSON bodies
// Standard Industry Versioning (v1)
app.use('/api/v1/classes', classRoutes);
app.use('/api/v1/messages', messageRoutes)




//test route
app.get('/ping', (req, res) => {
    res.status(200).json({
        message: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

module.exports = app;