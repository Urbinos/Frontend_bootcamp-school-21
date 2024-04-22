const { MenuItem, Order } = require('../../models');

exports.getAllMenuItems = async (req, res) => {
  try {
    const data = await MenuItem.findAll({});
    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: 'MenuItems not found' });
    }
    return {
      success: true,
      count: data.length,
      data,
    };
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MenuItem.findByPk(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, error: `MenuItem with id: ${id} not found` });
    }
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.createMenuItem = async (req, res) => {
  const {
    orderId, title, picture, cost, callQuantity, description
  } = req.body;
  if (
    !orderId
    || !title
    || !picture
    || !cost
    || !callQuantity
    || !description
  ) {
    return res.status(400).json({
      success: false,
      error:
        'orderId, title, picture, cost, callQuantity and description are required',
    });
  }
  const order = await Order.findByPk(orderId);
  if (!order) {
    return res.status(404).json({
      success: false,
      error: `Order with id: ${orderId} is not found`,
    });
  }

  try {
    const newMenuItem = {
      orderId,
      title,
      picture,
      cost,
      callQuantity,
      description,
    };
    const data = await MenuItem.create(newMenuItem);
    order.items.push(data.id);
    await order.save();
    return res
      .status(201)
      .json({ success: true, data, message: 'MenuItem created' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, error: `MenuItem with id: ${id} not found` });
    }
    const updatedMenuItem = await menuItem.update(req.body);
    const order = await Order.findByPk(updatedMenuItem.orderId);
    const menuItemIndex = order.items.indexOf(id);
    if (menuItemIndex > -1) {
      menuItem.items.splice(menuItemIndex, 1);
      await menuItem.save();
    }
    return res.status(200).json({
      success: true,
      data: updatedMenuItem,
      message: 'MenuItem updated',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, error: `MenuItem with id: ${id} not found` });
    }
    const closedMenuItem = await menuItem.update({ isActive: false });
    const order = await Order.findByPk(closedMenuItem.menuItemId);
    const menuItemIndex = order.items.indexOf(id);
    if (menuItemIndex > -1) {
      menuItem.items.splice(menuItemIndex, 1);
      await menuItem.save();
    }
    return res.status(200).json({
      success: true,
      message: `MenuItem with id: ${id} has been closed`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteAllMenuItems = async (req, res) => {
  try {
    const data = await MenuItem.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
    });
    return res.status(200).json({
      success: true,
      data,
      message: 'All items has been deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
