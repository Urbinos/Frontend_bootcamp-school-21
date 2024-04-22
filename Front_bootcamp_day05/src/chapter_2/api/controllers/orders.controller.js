const { MenuItem, Order } = require('../../models');

const { getAllMenuItems } = require('./menuitem.controller');
const { getAllWaiters } = require('./waiter.controller');

exports.getOrdersPage = async (req, res) => {
    const { user } = req.session;
    try {
      const [menuItemsResult, waitersResult] = await Promise.all([
        getAllMenuItems(req, res),
        getAllWaiters(req, res),
      ]);
      if (!menuItemsResult.success || !waitersResult.success) {
        return res
          .status(404)
          .json({ menuItems: menuItemsResult, waiters: waitersResult });
      }
      return res.render('orders', {
        isAdmin: user.role === 'admin',
        menuItems: menuItemsResult.data.map((item) => item.toJSON()),
        waiters: waitersResult.data.map((waiter) => waiter.toJSON()),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve menu' });
    }
  };
  
  exports.getOrderPage = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order || order.length === 0) {
        return res.status(404).render('404', { type: 'Order', id });
      }
      const menuItems = await Promise.all(
        order.items.map((menuItemId) => MenuItem.findByPk(menuItemId))
      );
      order.items = menuItems.map((item) => item.toJSON());
      const totalAmount = menuItems.reduce((sum, item) => sum + item.cost, 0);
      const data = {
        title: `Order #${order.id}`,
        order: order.toJSON(),
        totalAmount,
      };
      return res.render('order', data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  };
  
