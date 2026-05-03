require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');
const setupSocket = require('./sockets/socket');

const server = http.createServer(app);
const io = setupSocket(server);

const PORT = process.env.PORT || 5000;

app.set('io', io);

connectDB().then(() => {
    // Only start the server if the database connection is successful
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});