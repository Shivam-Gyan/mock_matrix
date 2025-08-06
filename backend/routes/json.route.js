import express from 'express';

// free dummy json calling routes handling
// This file defines the routes for handling JSON responses

// It imports the jsonController which contains the logic for handling JSON responses
import jsonController from '../controllers/json.controller.js';


// making routes modular

// creating a router instance
const DummyRouter = express.Router();

// defining routes
DummyRouter
    .get('/product', jsonController.getProductJson) // This route handles GET requests to '/product' and responds with product JSON data
    .get('/user', jsonController.getUserJson) // This route handles GET requests to '/user' and responds with user JSON data

export default DummyRouter;