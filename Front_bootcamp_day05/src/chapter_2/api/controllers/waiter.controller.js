const { User, Order } = require('../../models');

exports.getAllWaiters = async (req, res) => {
  try {
    const data = await User.findAll({ where: { role: 'waiter' } });
    if (data.length === 0) {
      return res.status(404).json({ success: false, error: 'Users not found' });
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

exports.getWaiterById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'User id is required',
    });
  }
  try {
    const data = await User.findOne({
      where: { id, role: 'waiter' },
      include: { model: Order, as: 'orderItems' },
    });
    if (!data) {
      return res
        .status(404)
        .json({ success: false, error: `User with id: ${id} is not found` });
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

exports.createWaiter = async (req, res) => {
  const { name, orders } = req.body;
  if (!name || !orders) {
    return res.status(400).json({
      success: false,
      error: `${name}, ${orders} and are required`,
    });
  }
  try {
    const newWaiter = {
      name,
      orders,
      role: 'waiter',
    };
    const data = await User.create(newWaiter);
    return res
      .status(201)
      .json({ success: true, data, message: 'User has been created' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
