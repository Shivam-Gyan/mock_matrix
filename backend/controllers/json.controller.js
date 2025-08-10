import mongoose from 'mongoose';

// Function to get a collection by name
// This function will be used to get a specific collection from the MongoDB database
// It takes the collection name as a parameter and returns the collection object
// It uses the mongoose connection to access the database
const getCollection = (name) => mongoose.connection.db.collection(name);

// Function to apply query options like limit and projection
// This function will be used to apply query options to the MongoDB cursor
// It takes the request object and a cursor as parameters
// It returns the modified cursor with the applied options
const applyQueryOptions = (req, cursor) => {
    // 1. Limit logic
    const limit = Math.max(1, Math.min(parseInt(req.query.limit) || 10, 1000));
    cursor = cursor.limit(limit);

    // 2. Projection logic with _id: 0 always
    const projection = { _id: 0 };

    if (req.query.fields) {
        projection['id'] = 1;
        const fieldsArray = req.query.fields.split(',').map(f => f.trim());
        fieldsArray.forEach(field => (projection[field] = 1));
        cursor = cursor.project(projection); // If no fields are specified, exclude _id
    } else {
        cursor = cursor.project(projection); // If no fields are specified, exclude _id
    }


    return cursor;
};



// This is the JSON controller that handles various JSON API requests
const jsonController = {
    // This controller handles recipes api requests 
    getRecipesJson: async (req, res) => {
        try {
            let cursor = getCollection('recipes').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();

            res.status(200).json({
                success: true,
                limit: docs.length,
                recipes: docs,
            });
        } catch (error) {
            console.error(`❌ Error fetching recipes JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles products api requests
    getProductJson: async (req, res) => {
        try {
            let cursor = getCollection('products').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            res.status(200).json({
                success: true,
                limit: docs.length,
                products: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching product JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles users api requests
    getUserJson: async (req, res) => {
        try {
            let cursor = getCollection('users').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            res.status(200).json({
                success: true,
                limit: docs.length,
                users: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching user JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles comments api requests
    getCommentsJson: async (req, res) => {
        try {
            let cursor = getCollection('comments').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            res.status(200).json({
                success: true,
                limit: docs.length,
                comments: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching comments JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles  todos api requests
    getTodosJson: async (req, res) => {
        try {
            let cursor = getCollection('todos').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            res.status(200).json({
                success: true,
                limit: docs.length,
                todos: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching todos JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles quotes api requests
    getQuotesJson: async (req, res) => {
        try {
            let cursor = getCollection('quotes').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            res.status(200).json({
                success: true,
                limit: docs.length,
                quotes: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching quotes JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles posts api requests
    getPostsJson: async (req, res) => {
        try {
            // Assuming 'posts' is the collection name for posts
            // You can change it to the actual collection name if different
            let cursor = getCollection('posts').find({});
            // Apply query options like limit and projection
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            // Respond with the fetched posts
            res.status(200).json({
                success: true,
                limit: docs.length,
                posts: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching posts JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles carts api requests
    getCartsJson: async (req, res) => {
        try {
            let cursor = getCollection('carts').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            res.status(200).json({
                success: true,
                limit: docs.length,
                carts: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching carts JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles images api requests
    getImagesJson: async (req, res) => {
        try {
            let cursor = getCollection('images').find({});
            cursor = applyQueryOptions(req, cursor);

            const docs = await cursor.toArray();
            res.status(200).json({
                success: true,
                limit: docs.length,
                images: docs
            });
        } catch (error) {
            console.error(`❌ Error fetching images JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // This controller handles HTTP status code requests
    // It returns a JSON response based on the HTTP status code provided in the request
    getHttpStatusJson: async (req, res) => {
        try {
            const status = parseInt(req.params.status, 10);
            // Validate the status code
            // Ensure the status code is a number and within the valid range (100-599)
            if (isNaN(status) || status < 100 || status > 599) {
                return res.status(400).json({ success: false, status: status, message: "Invalid HTTP status code", description: "The provided status code is not valid." });
            }

            // Handle specific HTTP status codes with custom messages
            // You can customize the messages and descriptions as needed
            if (status === 200) { // For 200 OK, return a success message
                return res.status(200).json({ success: true, message: "OK", status: 200, description: "The request has succeeded." });
            } else if (status === 404) { // For 404 Not Found, return a specific message
                return res.status(404).json({ success: true, message: "Not Found", status: 404, description: "The requested resource could not be found." });
            } else if (status === 500) { // For 500 Internal Server Error, return a generic message
                return res.status(500).json({ success: true, message: "Internal Server Error", status: 500, description: "The server encountered an unexpected condition." });
            } else { // For other status codes, return a generic message
                res.status(status).json({
                    success: false,
                    message: `HTTP status ${status} response`
                });
            }
        } catch (error) {
            console.error(`❌ Error fetching HTTP status JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

};


export default jsonController;