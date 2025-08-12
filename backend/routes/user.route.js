// src/routes/authRouter.js
import express from "express";
import passport from "passport";
import googleController from "../controllers/user.contoller.js";
import { verifyUser } from "../middlewares/verify.token.js";
import { Auth } from "googleapis";

const AuthRouter = express.Router();

AuthRouter.get("/google", googleController.googleLogin);
AuthRouter.get("/profile", verifyUser, googleController.getProfile);
AuthRouter.post("/contacts", googleController.createContact);

export default AuthRouter;
