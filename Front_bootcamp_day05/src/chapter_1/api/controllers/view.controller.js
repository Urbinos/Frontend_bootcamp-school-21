const { MenuItem, Order } = require('../../models');

const { getAllMenuItems } = require('./menuitem.controller');
const { getAllWaiters } = require('./waiter.controller');

exports.getMainPage = async (req, res) => {
  const data = {
    title: 'Main',
    waiters: [],
  };
  try {
    const waiters = await getAllWaiters();
    if (!waiters.success) {
      return res.status(404).json(waiters);
    }
    data.waiters = waiters.data;
    res.render('main', data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve waiters' });
  }
};

exports.getOrdersPage = async (req, res) => {
  const data = {
    title: 'Orders',
    waiters: [],
    menuItems: [],
  };
  try {
    const menuItems = await getAllMenuItems(req, res);
    const waiters = await getAllWaiters(req, res);
    if (!menuItems.success || !waiters.success) {
      return res.status(404).json({ menuItems, waiters });
    }
    data.menuItems = menuItems.data;
    data.waiters = waiters.data;
    res.render('orders', data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve menu' });
  }
};
exports.getOrderPage = async (req, res) => {
  const data = {
    title: 'Order',
    order: [],
    totalAmount: 0,
  };
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order || order.length === 0) {
      res.status(404).render('404', { type: 'Order', id });
      return;
    }
    data.title = `Order #${order.id}`;
    data.order = order;
    const menuItemsId = data.order.items;
    data.order.items = await Promise.all(
      menuItemsId.map((menuItemId) => MenuItem.findByPk(menuItemId))
    );
    let totalAmount = 0;
    data.order.items.forEach((menuItem) => {
      totalAmount += menuItem.cost;
    });
    data.totalAmount = totalAmount;
    res.render('order', data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve menu' });
  }
};

exports.getMenuPage = async (req, res) => {
  const data = {
    title: 'Menu',
    menuItems: [],
  };
  try {
    const menuItems = await getAllMenuItems(req, res);
    if (!menuItems.success) {
      return res.status(404).json({ menuItems });
    }
    data.menuItems = menuItems.data;
    res.render('menu', data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve menu' });
  }
};
