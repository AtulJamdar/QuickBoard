require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const Class = require('./models/Class');
const Message = require('./models/Message');
console.log("models loaded");

const PORT = process.env.PORT || 5000;



connectDB().then(() => {
    // Only start the server if the database connection is successful
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});