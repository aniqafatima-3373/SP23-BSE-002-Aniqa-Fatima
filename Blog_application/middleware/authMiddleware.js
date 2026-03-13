module.exports = (req, res, next) => {
    // Check if the session exists and has a userId
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next(); // User is authenticated, proceed to the route
};