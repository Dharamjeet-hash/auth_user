const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.use(cors());

// Middleware
app.use(express.json());


// Routes
app.use('/', authRoutes); // Authentication routes
app.use('/', userRoutes); // User data routes
app.use('/uploads',express.static('uploads'))

app.use(cors({
    origin: '*' // Replace with your allowed origin
}));


  

// Start the server
const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});