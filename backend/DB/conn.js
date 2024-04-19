const mongoose = require('mongoose');
// MongoDB connection string
const MONGODB_URI = process?.env?.MONGODB_URI || 'mongodb://localhost:27017/auth_users';
// Test the connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

module.exports = mongoose.connection;
