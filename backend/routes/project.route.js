import express from 'express';
import customJsonController from '../controllers/custom.json.controller.js';

const projectRouter = express.Router();

projectRouter
    .post('/custom', customJsonController.createCustomJsonController) // Endpoint to create a custom JSON project
    .post('/custom-ai', customJsonController.createCustomAiJsonController) // Endpoint to create a custom AI JSON project
    .get('/:projectId', customJsonController.getProjectByProjectId) // Endpoint to get a project by its ID


export default projectRouter;