import UserModel from "../models/user.model.js";
import ProjectModel from "../models/project.model.js";
import crypto from 'crypto';
import generateDynamicJSON from "../utils/ai.generate.js";



const customJsonController = {

    // Upload your JSON file and get a URL for it 
    createCustomJsonController: async (req, res) => {

        try {

            // const {email} = req.user;
            const email = "shivam@example.com";
            const { projectName, projectPassword, projectType, json } = req.body;

            if (!projectName || !projectPassword || !projectType || !json) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            if (projectType !== 'custom') {
                return res.status(400).json({ success: false, message: "Invalid project type" });
            }

            // Check if user exists
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            user.limitCustom -= 1; // Decrease the limit for custom projects
            if (user.limitCustom < 0) {
                return res.status(403).json({ success: false, message: "Custom project limit exceeded" });
            }
            await user.save(); // Save the updated user

            const projectId = crypto.randomBytes(16).toString('hex'); // Generate a unique project ID
            if (!projectId) {
                return res.status(500).json({ success: false, message: "Failed to generate project ID" });
            }
            const projectUrl = `${process.env.BACKEND_URL}projects/${projectId}`; // Construct

            const jsonString = JSON.stringify(json); // Convert JSON array to string

            const newProject = new ProjectModel({
                userObjectId: user._id,
                projectId,
                projectName,
                projectPassword,
                projectType,
                projectUrl,
                JsonFile: jsonString // Store the JSON file as a string
            });

            await newProject.save(); // Save the new project

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

                    parsed = JSON.parse(project.JsonFile);
                } catch (parseErr) {
                    return res.status(502).json({
                        success: false,
                        message: 'Failed to parse AI response as valid JSON',
                        error: parseErr.message,
                        rawResponse: aiResponse,
                    });
                }

                // Validate parsed is array of 5 objects
                if (!Array.isArray(parsed) || parsed.length !== 5 || !parsed.every(obj => typeof obj === 'object' && obj !== null && !Array.isArray(obj))) {
                    return res.status(502).json({
                        success: false,
                        message: 'AI response is not a valid array of 5 non-null objects',
                        rawResponse: aiResponse,
                    });
                }
            } else {
                // For custom projects, directly parse the stored JSON file
                parsed = JSON.parse(project.JsonFile);
            }

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
            const email = "shivam@example.com";
            const { projectName, projectPassword, projectType, schema } = req.body;

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

            // Generate AI content
            const aiResponse = await generateDynamicJSON(schema);

            if (!aiResponse || typeof aiResponse !== 'string') {
                throw new Error('AI returned empty or non-string response');
            }

            // Deduct user AI usage
            user.limitAI -= 1;
            await user.save();

            const projectId = crypto.randomBytes(16).toString('hex');
            if (!projectId) {
                return res.status(500).json({ success: false, message: "Failed to generate project ID" });
            }

            const projectUrl = `${process.env.BACKEND_URL}projects/${projectId}`;

            const newProject = new ProjectModel({
                userObjectId: user._id,
                projectId,
                projectName,
                projectPassword,
                projectType,
                projectUrl,
                JsonFile: aiResponse,
            });

            await newProject.save();

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
    }
};


export default customJsonController;