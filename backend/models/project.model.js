import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    userObjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'webUsers',
        required: true
    },
    projectId:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    projectName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    projectPassword: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    projectType:{
        type: String,
        required: true,
        enum: ['custom', 'aicustom'], // custom inlcudes paste your json and get URL but in aicustom you can use AI to generate the JSON
        default: 'custom'
    },
    projectUrl: {
        type: String,
        // required: true,
        unique: true,
        trim: true
    },
    JsonFile:{
        type: String,
        // required: true,
        trim: true
    },
    originIp: {
        type: String,
        required: true,
        trim: true,
        default: '0.0.0.0'
    },
    request:[{
        type: String,
    }]

}, {
    timestamps: true
});

const ProjectModel = mongoose.model('projects', projectSchema);

export default ProjectModel;
