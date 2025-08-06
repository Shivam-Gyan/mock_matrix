import axios from 'axios';
// Importing axios for making HTTP requests

// controller which handle the free json responses 

const jsonController = {

    getProductJson: async(req, res) => {
        try {
            // Simulating a product JSON response
            const productData = await axios.get('https://dummyjson.com/comments?limit=250');

            // Sending the JSON response
            res.status(200).json(productData.data);
        } catch (error) {
            console.error(`❌ Error fetching product JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    getUserJson: async(req, res) => {
        try {
            // Simulating a user JSON response
            // const userData = await axios.get('user.json');

            // Sending the JSON response
            res.status(200).json(userData.data);
        } catch (error) {
            console.error(`❌ Error fetching user JSON: ${error.message}`);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

}

export default jsonController;