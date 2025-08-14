import UserModel from "../models/user.model.js";
import ProjectModel from "../models/project.model.js";
import crypto from 'crypto';
import generateDynamicJSON from "../utils/ai.generate.js";



const customJsonController = {

    // Upload your JSON file and get a URL for it 
    createCustomJsonController: async (req, res) => {

        try {

            const email = req.user?.email;
            const { projectId, projectName, projectPassword, projectType, json } = req.body;

            if (!projectId || !projectName || !projectPassword || !projectType || !json) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            // Validation
            if (!projectName || typeof projectName !== 'string') {
                return res.status(400).json({ success: false, message: "projectName is required and must be a string" });
            }
            if (!projectPassword || typeof projectPassword !== 'string') {
                return res.status(400).json({ success: false, message: "projectPassword is required and must be a string" });
            }
            if (!projectType || typeof projectType !== 'string') {
                return res.status(400).json({ success: false, message: "projectType is required and must be a string" });
            }
            if (!json) {
                return res.status(400).json({ success: false, message: "Missing JSON data" });
            }

            if (typeof json !== 'object') {
                return res.status(400).json({ success: false, message: "Invalid JSON data (must be an object or array)" });
            }

            if (Array.isArray(json)) {
                if (json.length === 0) {
                    return res.status(400).json({ success: false, message: "Array JSON cannot be empty" });
                }
                // Optionally check each item in the array is object
                for (const item of json) {
                    if (typeof item !== 'object' || Array.isArray(item) || item === null) {
                        return res.status(400).json({ success: false, message: "Invalid JSON array: all items must be objects" });
                    }
                }
            }

            if (projectType !== 'custom') {
                return res.status(400).json({ success: false, message: "Invalid project type. Must be 'custom'" });
            }

            // Check user
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            if (user.limitCustom <= 0) {
                return res.status(403).json({ success: false, message: "Custom project limit exceeded" });
            }

            const projectExists = await ProjectModel.findOne({ projectId, projectName });
            if (!projectExists) {
                return res.status(404).json({ success: false, message: "create a project first" });
            }

            const projectUrl = `${process.env.BACKEND_URL}projects/${projectId}`; // Construct

            const jsonString = JSON.stringify(json); // Convert JSON array to string

            // update the url and json 
            projectExists.projectUrl = projectUrl;
            projectExists.JsonFile = jsonString; // Store the JSON file as a string

            await projectExists.save(); // Save the updated project

            user.limitCustom -= 1; // Decrease the limit for custom projects
            await user.save(); // Save the updated user

            res.status(201).json({ success: true, message: "Custom project created successfully", projectUrl });
        } catch (err) {
            console.error("Error in customJsonController:", err);
            res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
        }
    },

    getProjectByProjectId: async (req, res) => {
        try {
            const { projectId } = req.params;
            const project = await ProjectModel.findOne({ projectId });
            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }



            let parsed;
            if (project.projectType !== 'custom') {
                // Safely parse AI response

                try {
                    if (!project.JsonFile || typeof project.JsonFile !== 'string') {
                        throw new Error('AI returned empty or non-string response');
                    }
                    console.log("project.JsonFile", project.JsonFile)

                    parsed = JSON.parse(project.JsonFile);
                } catch (parseErr) {
                    return res.status(502).json({
                        success: false,
                        message: 'Failed to parse AI response as valid JSON',
                        error: parseErr.message,
                    });
                }

                // Validate parsed is array of 5 objects
                if (!Array.isArray(parsed) || parsed.length !== 5 || !parsed.every(obj => typeof obj === 'object' && obj !== null && !Array.isArray(obj))) {
                    return res.status(502).json({
                        success: false,
                        message: 'AI response is not a valid array of 5 non-null objects'
                    });
                }
            } else {
                // For custom projects, directly parse the stored JSON file
                parsed = JSON.parse(project.JsonFile);
            }
            
            project.request.push(new Date().toISOString()); // Push request timestamp to array
            await project.save();

            res.status(200).json({ success: true, [`${project.projectName}`]: parsed });
        } catch (err) {
            console.error("Error in getProjectByUserIdController:", err);
            res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
        }
    },

    /**
     * Generate AI-based JSON based on provided schema
     */
    createCustomAiJsonController: async (req, res) => {
        try {
            const email = req.user?.email;
            const { projectId, projectName, projectPassword, projectType, schema } = req.body;

            // Basic validation
            if (!projectId || typeof projectId !== 'string') {
                return res.status(400).json({ success: false, message: "projectId is required and must be a string" });
            }
            if (!projectName || typeof projectName !== 'string') {
                return res.status(400).json({ success: false, message: "projectName is required and must be a string" });
            }
            if (!projectPassword || typeof projectPassword !== 'string') {
                return res.status(400).json({ success: false, message: "projectPassword is required and must be a string" });
            }
            if (!projectType || typeof projectType !== 'string') {
                return res.status(400).json({ success: false, message: "projectType is required and must be a string" });
            }
            if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
                return res.status(400).json({ success: false, message: "Invalid or missing JSON schema (must be an object)" });
            }

            if (projectType !== 'aicustom') {
                return res.status(400).json({ success: false, message: "Invalid project type. Must be 'aicustom'" });
            }

            // Check if user exists
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Check AI usage limit
            if (user.limitAI <= 0) {
                return res.status(403).json({ success: false, message: "AI project limit exceeded" });
            }

            const projectExists = await ProjectModel.findOne({ projectId, projectName });
            if (!projectExists) {
                return res.status(409).json({ success: false, message: "Project with this ID and name does not exist" });
            }

            // Generate AI content
            const aiResponse = await generateDynamicJSON(schema);

            if (!aiResponse || typeof aiResponse !== 'string') {
                throw new Error('AI returned empty or non-string response');
            }

            const projectUrl = `${process.env.BACKEND_URL}projects/${projectId}`;

            projectExists.projectUrl = projectUrl;
            projectExists.JsonFile = aiResponse;
            await projectExists.save();

            user.limitAI -= 1;
            await user.save();

            return res.status(201).json({
                success: true,
                message: 'AI generated JSON and saved successfully',
                projectUrl,
            });

        } catch (err) {
            console.error('Error in createCustomAiJsonController:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: err.message,
            });
        }
    },

    // create project
    createProject: async (req, res) => {
        console.log(req.body)
        try {
            // const { projectName, projectPassword, projectType, schema } = req.body;

            const email = req.user?.email;
            const { projectName, projectPassword, projectType, originIp } = req.body;

            // Basic validation
            if (!projectName || typeof projectName !== 'string') {
                return res.status(400).json({ success: false, message: "projectName is required and must be a string" });
            }
            if (!projectPassword || typeof projectPassword !== 'string') {
                return res.status(400).json({ success: false, message: "projectPassword is required and must be a string" });
            }
            if (!projectType || typeof projectType !== 'string') {
                return res.status(400).json({ success: false, message: "projectType is required and must be a string" });
            }
            if (!originIp || typeof originIp !== 'string') {
                return res.status(400).json({ success: false, message: "originIp is required and must be a string" });
            }

            // Check if user exists
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // // Deduct user AI usage
            // // Check project type and enforce limits accordingly
            // if (projectType === 'aicustom') {

            //     if (user.limitAI <= 0) {
            //         return res.status(403).json({ success: false, message: "AI project limit exceeded" });
            //     }
            //     user.limitAI -= 1;
            // } else if (projectType === 'custom') {

            //     if (user.limitCustom <= 0) {
            //         return res.status(403).json({ success: false, message: "Custom project limit exceeded" });
            //     }
            //     user.limitCustom -= 1;
            // }
            // await user.save();

            const projectId = crypto.randomBytes(16).toString('hex');
            if (!projectId) {
                return res.status(500).json({ success: false, message: "Failed to generate project ID" });
            }


            const newProject = new ProjectModel({
                userObjectId: user._id,
                projectId,
                projectName,
                projectPassword,
                projectUrl: `${process.env.BACKEND_URL}projects/${projectId}`,
                projectType,
                originIp
            });

            await newProject.save();

            res.status(201).json({
                success: true,
                message: 'Project created successfully',
                project: newProject
            });

        } catch (error) {
            console.error('Error in createProject:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    },

    // update created project
    updateProject: async (req, res) => {
        try {

            const { projectId, projectName, projectPassword, projectType, originIp } = req.body;

            // Basic validation
            if (!projectId || typeof projectId !== 'string') {
                return res.status(400).json({ success: false, message: "projectId is required and must be a string" });
            }
            if (!projectName || typeof projectName !== 'string') {
                return res.status(400).json({ success: false, message: "projectName is required and must be a string" });
            }
            if (!projectPassword || typeof projectPassword !== 'string') {
                return res.status(400).json({ success: false, message: "projectPassword is required and must be a string" });
            }
            if (!projectType || typeof projectType !== 'string') {
                return res.status(400).json({ success: false, message: "projectType is required and must be a string" });
            }
            if (!originIp || typeof originIp !== 'string') {
                return res.status(400).json({ success: false, message: "originIp is required and must be a string" });
            }

            // Check if project exists
            const project = await ProjectModel.findOne({ projectId });
            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }

            // Update project details
            project.projectName = projectName;
            project.projectPassword = projectPassword;
            project.projectType = projectType;
            project.originIp = originIp;

            await project.save();

            res.status(200).json({
                success: true,
                message: 'Project updated successfully',
                project: {
                    originIp: project.originIp,
                    projectName: project.projectName,
                    projectPassword: project.projectPassword,
                    projectType: project.projectType,
                    projectId: project.projectId
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    },

    // delete created project
    deleteProject: async (req, res) => {
        try {
            const { projectId } = req.params;

            // Basic validation
            if (!projectId || typeof projectId !== 'string') {
                return res.status(400).json({ success: false, message: "projectId is required and must be a string" });
            }

            // Check if project exists
            const project = await ProjectModel.findOne({ projectId });
            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }

            // Delete project
            await ProjectModel.deleteOne({ projectId });

            res.status(200).json({
                success: true,
                message: 'Project deleted successfully',
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
};


export default customJsonController;