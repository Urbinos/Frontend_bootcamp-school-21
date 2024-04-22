const { User } = require('../../models');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll({});
    if (data.length === 0) {
      return res.status(404).json({ success: false, error: 'Users not found' });
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

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'User id is required',
    });
  }
  try {
    const data = await User.findByPk(id);
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

exports.createUser = async (req, res) => {
  const { name, orders, role } = req.body;
  if (!name || !orders || !role) {
    return res.status(400).json({
      success: false,
      error: `${name}, ${orders} and ${role} are required`,
    });
  }
  try {
    const data = await User.create(req.body);
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

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'User id is required',
    });
  }
  try {
    const { body } = req;
    const data = await User.update(body, { where: { id } });
    if (!data) {
      return res
        .status(404)
        .json({ success: false, error: `User with id: ${id} is not found` });
    }
    return res
      .status(200)
      .json({ success: true, data, message: 'User has been updated' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'User id is required',
    });
  }
  try {
    const data = await User.destroy({ where: { id } });
    if (!data) {
      return res
        .status(404)
        .json({ success: false, error: `User with id: ${id} is not found` });
    }
    return res.status(200).json({
      success: true,
      message: `User with id: ${id} has been deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
    });
    return res.status(200).json({
      success: true,
      message: 'All users deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
