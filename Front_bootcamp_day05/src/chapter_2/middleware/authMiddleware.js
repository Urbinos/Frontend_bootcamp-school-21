const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    return res.redirect('/signin');
};

module.exports = {
    isAuthenticated,
};
