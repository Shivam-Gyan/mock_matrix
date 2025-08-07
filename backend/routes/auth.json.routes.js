import authController from "../controllers/auth.json.controller.js";

import express from 'express';
import { verifyAccessToken,verifyRefreshToken } from "../middlewares/verify.token.js";

// This file defines the routes for handling authentication-related JSON responses
// It imports the authController which contains the logic for handling authentication JSON responses

const AuthRouter = express.Router();
// defining routes

AuthRouter
    .post('/login', authController.login) // This route handles POST requests to '/login' for user authentication
    .post('/register', authController.register) // This route handles POST requests to '/register' for user registration
    .get('/get-profile', verifyAccessToken, authController.getprofileJson) // This route handles POST requests to '/get-profile' for fetching user profile information
    .post('/get-access-token', verifyRefreshToken, authController.getAccessToken) // This route handles POST requests to '/get-access-token' for generating a new access token
    .delete('/delete-account', verifyAccessToken, authController.deleteAccount) // This route handles DELETE requests to '/delete-account' for deleting a user account

export default AuthRouter;