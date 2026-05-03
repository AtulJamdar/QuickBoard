const { Server } = require('socket.io');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173", // In production, replace with your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`New User Connected: ${socket.id}`);

        socket.on('join-class', (classId) => {
            socket.join(classId);
            console.log(`User ${socket.id} joined class: ${classId}`);
        });

        socket.on('disconnect', () => {
            console.log('User Disconnected');
        });
    });

    return io;
};

module.exports = setupSocket;