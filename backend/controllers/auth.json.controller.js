import AuthModel from "../models/auth.json.model.js";
import { generateToken } from "../utils/token.utils.js";
import crypto from "crypto";


const authController = {

    // This controller handles user login requests
    // It authenticates the user based on the provided credentials
    login: async (req, res) => {

        try {
            const { email, username, password, expiresIn } = req.body;
            // Validate the input data
            if ((!email && !username) || !password) {
                return res.status(400).json({ success: false, message: "Either email or username and password are required." });
            }

            // Find the user by email or username
            const user = await AuthModel.findOne({ $or: [{ email }, { username }] });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found." });
            }
            // Check if the password matches
            if (user.password !== password) {
                return res.status(401).json({ success: false, message: "Invalid password." });
            }

            const accessToken = generateToken(user.email, user.authId, expiresIn || '1h'); // Default to 1 hour if expiresIn is not provided
            const refreshToken = generateToken(user.email, user.authId, '7d'); // Default to 7 days for refresh token

            // Set refreshToken as httpOnly cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            // If authentication is successful, return the user data
            res.status(200).json({
                success: true,
                message: "Login successful.",
                user: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    authId: user.authId,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                }
            });
        } catch (error) {
            console.error(`❌ Error during login: ${error.message}`);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // This controller handles user registration requests
    // It creates a new user in the database with the provided details
    register: async (req, res) => {

        try {
            const { name, username, email, password, gender, image } = req.body;

            // Validate the input data
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email and password are required." });
            }

            // Check if the user already exists
            const existingUser = await AuthModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ success: false, message: "User already exists." });
            }
            // Generate a unique authId for the user
            const authId = crypto.randomUUID();
            let finalName = name;
            let finalUsername = username;

            // If both name and username are not provided, generate random ones
            if (!finalName && !finalUsername) {
                const randomStr = crypto.randomBytes(4).toString('hex');
                finalName = `User_${randomStr}`;
                finalUsername = `user_${randomStr}`;
            } else {
                if (!finalName) finalName = finalUsername;
                if (!finalUsername) finalUsername = finalName.replace(/\s+/g, '_').toLowerCase();
            }
            // Create a new user
            const newUser = new AuthModel({ name: finalName, username: finalUsername, email, password, gender: gender.toLowerCase(), authId, profilePicture: image });
            await newUser.save();

            const accessToken = generateToken(newUser.email, newUser.authId, '1h'); // Default to 1 hour
            const refreshToken = generateToken(newUser.email, newUser.authId, '7d'); // Default to 7 days

            // Exclude password from the user object before sending the response
            const { password: _, _id: __, ...userWithoutPassword } = newUser._doc;

            // Set refreshToken as httpOnly cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(201).json({
                success: true,
                message: "User registered successfully.",
                user: {
                    ...userWithoutPassword,
                    accessToken,
                    refreshToken
                }
            });
        } catch (error) {
            console.error(`❌ Error during registration: ${error.message}`);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // This controller handles user profile requests
    // It retrieves the profile information of the authenticated user
    getprofileJson: async (req, res) => {
        try {
            const { authid, email } = req.user; // Assuming req.user is set by verifyAccessToken middleware
            const user = await AuthModel.findOne({ authId: authid, email }).select('-password'); // Exclude password from the response

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found." });
            }
            const { password: _, _id: __, ...userWithoutPassword } = user._doc; // Exclude password and _id from the response
            res.status(200).json({ success: true, user: userWithoutPassword });
        } catch (error) {
            console.error(`❌ Error fetching profile: ${error.message}`);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // This controller handles user access token requests
    // It generates and returns an access token for the authenticated user if they have a refresh token
    getAccessToken: async (req, res) => {
        try {
            const { authid, email } = req.user; // Assuming req.user is set by verifyAccessToken middleware
            if (!authid || !email) {
                return res.status(400).json({ success: false, message: "Invalid user data." });
            }
            // Generate a new access token
            const accessToken = generateToken(email, authid, '1h'); // Default to 1 hour
            res.status(200).json({ success: true, accessToken });

        } catch (error) {
            console.error(`❌ Error generating access token: ${error.message}`);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // delete account
    deleteAccount: async (req, res) => {
        try {
            const { authid,email } = req.user; // Assuming req.user is set by verifyAccessToken middleware
            if (!authid) {
                return res.status(400).json({ success: false, message: "Invalid user data." });
            }
            // Delete the user account
            const result = await AuthModel.deleteOne({ authId: authid, email });
            if (result.deletedCount === 0) {
                return res.status(404).json({ success: false, message: "User not found." });
            }
            res.status(200).json({ success: true, message: "User account deleted successfully." });
        } catch (error) {
            console.error(`❌ Error deleting account: ${error.message}`);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

}

export default authController;