const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Load environment variables if .env file exists
try {
    require('dotenv').config();
} catch (e) {
    console.log('No .env file found, using default environment variables');
}

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // HTTP request logger

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Todo App API!');
});

// API routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API accessible at http://localhost:${PORT}/api/todos`);
    console.log(`Web interface accessible at http://localhost:${PORT}`);
});

module.exports = app;