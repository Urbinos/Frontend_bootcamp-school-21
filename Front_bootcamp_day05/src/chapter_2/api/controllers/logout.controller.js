exports.logout = (req, res) => {
    console.log('/logout');
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/signin');
    });
};
