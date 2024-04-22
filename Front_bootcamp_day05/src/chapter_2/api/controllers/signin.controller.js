const bcrypt = require('bcrypt');
const { User }  = require('../../models');

exports.getSigninPage = async (req, res) => {
    res.render('signin', { layout: 'auth' });
};

exports.postSigninPage = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            };
            return res.redirect('/');
        }
        return res.status(401).json({ message: 'Invalid password' });
    } catch (error) {
        console.error(error);
        return res.redirect('/signin');
    }
};