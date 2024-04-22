const { Order, User } = require('../../models');

exports.getAllOrders = async (req, res) => {
  try {
    const data = await Order.findAll({ where: { isActive: true } });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: 'Orders not found' });
    }
    
    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Order.findByPk(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, error: `Order with id: ${id} not found` });
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

exports.getOrdersByUserId = async (userId) => {
  try {
    const orders = await Order.findAll({ where: { userId } });
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve orders');
  }
};

exports.createOrder = async (req, res) => {
  const { userId, isActive, items } = req.body;
  if (!userId || !isActive || !items) {
    return res.status(400).json({
      success: false,
      error: `${userId}, ${isActive} and ${items} are required`,
    });
  }
  const user = await User.findByPk(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: `User with id: ${userId} is not found` });
  }

  try {
    const data = await Order.create({ userId, isActive, items });
    await user.update({ orders: [...user.orders, data.id] });
    await user.save();
    return res
      .status(201)
      .json({ success: true, data, message: 'Order created' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;
    const order = await Order.findByPk(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: `Order with id: ${id} not found` });
    }
    const updatedOrder = await order.update({ items });
    await updatedOrder.save();
    const user = await User.findByPk(updatedOrder.userId);
    const orderIndex = user.orders.indexOf(id);
    if (orderIndex > -1) {
      user.orders.splice(orderIndex, 1);
      await user.save();
    }
    return res
      .status(200)
      .json({ success: true, data: updatedOrder, message: 'Order updated' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: `Order with id: ${id} not found` });
    }
    const data = await order.update({ isActive: false });
    const user = await User.findByPk(data.userId);
    await user.update({ orders: [...user.orders, data.id] });
    await data.save();
    await user.save();
    return res.status(200).json({
      success: true,
      data,
      message: `Order with id: ${id} has been closed`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteAllOrders = async (req, res) => {
  try {
    const data = await Order.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
    });
    const users = await User.findAll();
    for (const user of users) {
      user.update({ orders: [] });
    }

    return res.status(200).json({
      success: true,
      data,
      message: 'All orders has been deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
