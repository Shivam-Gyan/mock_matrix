import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// importing the MongoDB connection configuration
// This will ensure that the database connection is established when the server starts
import connectDB from './config/mongodb.config.js';
// Creating an instance of express application
// This will allow us to define routes and middleware for our application
const app = express();
// Defining the port from environment variables
// This allows us to easily change the port without modifying the code
const PORT = process.env.PORT || 8000;

// Middleware
// express.json() is used to parse incoming JSON requests
app.use(express.json());
// express.urlencoded() is used to parse incoming requests with urlencoded payloads
// This is useful for form submissions and other URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// dynamic routes features 
import DummyRouter from './routes/json.route.js';
import dataRoutes from './routes/dataRoutes.js';


// Using the DummyRouter for handling JSON responses
app.use('/api/v1', DummyRouter);

// Data routes (no schema required)
app.use('/api/data', dataRoutes);

// Start server
app.listen(PORT, () => {
    // calling the connectDB function to establish a connection to MongoDB
    connectDB();
    // This will log the server running message
    console.log(`Server is running on port ${PORT}`);
});