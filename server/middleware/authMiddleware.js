const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
        // User is authenticated, so we can proceed
        next();
    } else {
        // User is not authenticated, send an error response
        res.status(401).send('Authentication failed: Not logged in.');
    }
};

export default authMiddleware;