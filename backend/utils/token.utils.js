import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Ensure that the JWT_SECRET is set in the environment variables

const SECRET_KEY = process.env.JWT_SECRET; // Replace with your secret or use env variable

/**
 * Generates a JWT token with email and authid as payload.
 * @param {string} email - User's email address.
 * @param {string} authid - User's authentication ID.
 * @returns {string} JWT token.
 */

const generateToken = (email, authid, expiresIn) => {
    const payload = { email, authid };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export  { generateToken };