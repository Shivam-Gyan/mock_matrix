import mongoose from "mongoose";

const { Schema } = mongoose;

const authSchema = new Schema({
    name: { type: String },
    username: { type: String},
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    authId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: 'https://cdn.pixabay.com/photo/2024/09/05/20/13/ai-generated-9026025_1280.jpg' },
    createdAt: { type: Date, default: Date.now }
});

const AuthModel = mongoose.model("auths", authSchema);

export default AuthModel;
