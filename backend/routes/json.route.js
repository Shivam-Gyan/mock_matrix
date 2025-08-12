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
    .get('/products', jsonController.getProductJson) // This route handles GET requests to '/products' and responds with product JSON data
    .get('/users', jsonController.getUserJson) // This route handles GET requests to '/users' and responds with user JSON data
    .get('/boardings', jsonController.getBoardingsJson) // This route handles GET requests to '/boardings' and responds with boardings JSON data
    .get('/leaderboards', jsonController.getLeaderboardJson) // This route handles GET requests to '/boardings' and responds with boardings JSON data
    .get('/joblists', jsonController.getJoblistsJson) // This route handles GET requests to '/boardings' and responds with boardings JSON data
        .get('/faqs', jsonController.getFaqsJson) // This route handles GET requests to '/boardings' and responds with boardings JSON data
        .get('/comments', jsonController.getCommentsJson) // This route handles GET requests to '/comments' and responds with comments JSON data
    .get('/todos', jsonController.getTodosJson) // This route handles GET requests to '/todos' and responds with todos JSON data
    .get('/recipes', jsonController.getRecipesJson) // This route handles GET requests to '/recipes' and responds with recipes JSON data
    .get('/quotes', jsonController.getQuotesJson) // This route handles GET requests to '/quotes' and responds with quotes JSON data
    .get('/posts', jsonController.getPostsJson) // This route handles GET requests to '/posts' and responds with posts JSON data
    .get('/carts', jsonController.getCartsJson) // This route handles GET requests to '/carts' and responds with carts JSON data
    .get('/images', jsonController.getImagesJson) // This route handles GET requests to '/images' and responds with images JSON data
    .get('/http/:status', jsonController.getHttpStatusJson) // This route handles GET requests to '/http/status' and responds with HTTP status JSON data
    
export default DummyRouter;