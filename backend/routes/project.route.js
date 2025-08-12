import express from 'express';
import customJsonController from '../controllers/custom.json.controller.js';
import {verifyUser} from '../middlewares/verify.token.js'

const projectRouter = express.Router();

projectRouter
    .post('/custom',verifyUser, customJsonController.createCustomJsonController) // Endpoint to create a custom JSON project
    .post('/custom-ai',verifyUser, customJsonController.createCustomAiJsonController) // Endpoint to create a custom AI JSON project
    .get('/:projectId', customJsonController.getProjectByProjectId) // Endpoint to get a project by its ID
    .post('/create',verifyUser, customJsonController.createProject) // Endpoint to create a new project
    .post('/update',verifyUser, customJsonController.updateProject) // Endpoint to update an existing project
    .delete('/:projectId', verifyUser, customJsonController.deleteProject) // Endpoint to delete a project

export default projectRouter;