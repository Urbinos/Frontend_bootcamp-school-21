const { User } = require('../../models');


/**
 * @description Get All Users
 * @type GET
 * @path /api/users
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
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

/**
 * @description Get Single User info by id
 * @type GET
 * @path /api/users/:id
 * @param {*} req
 * @param {*} res
 * @param {Number} — id — user id
 * @returns JSON
 */
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

/**
 * @description Create New User
 * @type POST
 * @path /api/users/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
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

/**
 * @description Update User data
 * @type PUT
 * @path /api/users/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
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

/**
 * @description Delete user with the specified id in the request
 * @type DELETE
 * @path /api/users/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
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

/**
 * @description Delete all users from the database
 * @type DELETE
 * @path /api/users/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
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
