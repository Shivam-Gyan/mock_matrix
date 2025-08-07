import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// importing the MongoDB connection configuration
// This will ensure that the database connection is established when the server starts
import connectDB from './config/mongodb.config.js';
import cookieParser from 'cookie-parser';

// Creating an instance of express application
// This will allow us to define routes and middleware for our application
const app = express();

// Defining the port from environment variables
// This allows us to easily change the port without modifying the code
const PORT = process.env.PORT || 8000;

// cors middleware
import cors from 'cors';
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));


// Middleware
// express.json() is used to parse incoming JSON requests
app.use(express.json());

// express.urlencoded() is used to parse incoming requests with urlencoded payloads
// This is useful for form submissions and other URL-encoded data
app.use(express.urlencoded({ extended: true }));

// cookieParser() is used to parse cookies from the request headers
app.use(cookieParser());


// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// dynamic routes features 
import DummyRouter from './routes/json.route.js';
import AuthRouter from './routes/auth.json.routes.js';
import projectRouter from './routes/project.route.js';


// Using the DummyRouter for handling JSON responses
app.use('/api/v1', DummyRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/projects', projectRouter);


// Start server
app.listen(PORT, () => {
    // calling the connectDB function to establish a connection to MongoDB
    connectDB();
    // This will log the server running message
    console.log(`Server is running on port ${PORT}`);
});