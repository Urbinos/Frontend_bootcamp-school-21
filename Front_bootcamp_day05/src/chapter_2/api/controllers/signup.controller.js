const bcrypt = require('bcrypt');
const { User }  = require('../../models');

exports.getSignupPage = async (req, res) => {
    res.render('signup', { layout: 'auth' });
};

exports.postSignUpPage = async (req, res) => {
    const { username, password, confirm, role } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { username } });
    if (user) {
        console.log('user exists');
        return res.redirect('/signup');
    }

    if (!user && password === confirm) {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            encryptedPassword,
            role,
        });

        if (!newUser) {
            return res.redirect('/signup');
        }

        req.session.user = newUser;
        req.session.role = newUser.role;
        return res.redirect('/');
    }
    return res.redirect('/signup');
};
