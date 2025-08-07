import jwt from 'jsonwebtoken'; 

const JWT_SECRET =  process.env.JWT_SECRET; // Replace with your secret or use env variable;


// * Middleware to verify access token
// This middleware checks if the access token is valid and extracts user information from it
function verifyAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Access Token:", token);
    if (!token) return res.status(401).json({ message: 'Access token missing' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid access token' });
        console.log("Verified User:", user);
        req.user = user;
        next();
    });
}

// * Middleware to verify refresh token
// This middleware checks if the refresh token is valid and extracts user information from it
function verifyRefreshToken(req, res, next) {
    const { refreshToken } = req.body || req.cookies;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });

    jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });
        req.user = user;
        next();
    });
}

export { verifyAccessToken, verifyRefreshToken };
