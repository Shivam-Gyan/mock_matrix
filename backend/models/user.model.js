import mongoose from 'mongoose';





const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // This is the limit of projects a user can create
    // if project is aicustom then limit is 5 otherwise unlimited
    limitAI:{
        type: Number,
        default: 5  // if project is aicustom then limit is 5 otherwise unlimited
    },
    limitCustom:{
        type: Number,
        default: 10  // if project is aicustom then limit is 5 otherwise unlimited
    }
    

},{
    timestamps: true
});

const UserModel = mongoose.model('webUsers', userSchema);

export default UserModel;