const { Order, User } = require('../../models');

exports.getMainPage = async (req, res) => {
    try {
        const { user } = req.session;
        if (user.role === 'waiter') {
            const waiter = await User.findOne({ where: { id: user.id } });
            const orders = await Order.findAll({
                where: { userId: user.id, isActive: true },
            });

            return res.render('main', {
                user,
                isWaiter: true,
                waiter: waiter.toJSON(),
                hasOrders: orders.length > 0,
                orders: orders.map((order) => order.toJSON()),
            });
        }
        if (user.role === 'admin') {
            const waiters = await User.findAll({ where: { role: 'waiter' } });
            const orders = await Order.findAll();
            return res.render('main', {
                user,
                isWaiter: false,
                waiters: waiters.map((waiter) => waiter.toJSON()),
                orders: orders.map((order) => order.toJSON()),
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve waiters' });
    }
};
