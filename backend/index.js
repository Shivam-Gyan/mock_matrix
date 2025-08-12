import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import session from 'express-session';
// import passport from './config/passport.config.js';

// Import routers
import DummyRouter from './routes/json.route.js';
import AuthRouter from './routes/auth.json.routes.js';
import projectRouter from './routes/project.route.js';
import Authouter from './routes/user.route.js'

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB right away
connectDB();

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'YOUR_SECRET',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false, // set to true if using HTTPS
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000 // 1 day
//   }
// }));

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());


// CORS middleware
app.use(cors({
  origin: '*', // You can restrict this to your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// API routes
app.use('/api/v1/auth', Authouter);
app.use('/api/v1', DummyRouter);
app.use('/api/v1/json-auth', AuthRouter);
app.use('/api/v1/projects', projectRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
