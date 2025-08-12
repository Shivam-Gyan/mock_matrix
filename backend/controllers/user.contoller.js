import oauth2Client from '../config/google.config.js';
import axios from 'axios';
import UserModel from '../models/user.model.js'
import { generateToken } from '../utils/token.utils.js';
import ProjectModel from '../models/project.model.js';
import ContactModel from '../models/contact.model.js';


const googleController = {

    // Google login
    googleLogin: async (req, res) => {
        const { code } = req.query;
        try {
            const response = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(response.tokens);
            const userInfo = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.tokens.access_token}`
            )

            const { email, name, picture, verified_email } = userInfo.data;

            const existUser = await UserModel.findOne({ email });

            let newUser;

            if (!existUser) {
                // Create a new user if not exists
                newUser = new UserModel({
                    email,
                    username: name,
                    isEmailVerified: verified_email,
                    picture
                });
                await newUser.save();
            } else {
                newUser = existUser;
            }

            const token = generateToken(email, newUser._id, '24h');

            const formatedUser = {
                email: newUser.email,
                username: newUser.username,
                picture: newUser.picture,
                isEmailVerified: newUser.isEmailVerified,
                aiLimit: newUser.limitAI,
                customLimit: newUser.limitCustom,
            };

            const projects = await ProjectModel.find({ userObjectId: newUser._id });

            res.status(200).json({
                message: "Login successful",
                user: formatedUser,
                token,
                projects: projects || []
            });
        } catch (error) {
            res.status(500).json({ error: "Google login failed", message: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            const { email, authid } = req.user;
            const user = await UserModel.findOne({ _id: authid, email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const projects = await ProjectModel.find({ userObjectId: user._id });

            res.status(200).json({
                success: true,
                message: "user profile",
                user: {
                    email: user.email,
                    username: user.username,
                    picture: user.picture,
                    isEmailVerified: user.isEmailVerified,
                    createdAt: user.createdAt,
                    aiLimit: user.limitAI,
                    customLimit: user.limitCustom,
                },
                projects: projects || []
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve user profile", message: error.message });
        }
    },

    createContact: async (req, res) => {
        const { name, email, message, contactType } = req.body;

        try {
            const newContact = new ContactModel({
                name,
                email,
                message,
                contactType
            });
            await newContact.save();

            res.status(201).json({
                success: true,
                message: `${contactType} submitted successfully`
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to submit request", message: error.message });
        }
    }

}


export default googleController;