const { Router } = require('express');
const controllers = require('../controllers').userController;

const router = Router();

router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUserById);
router.post('/', controllers.createUser);
router.put('/:id', controllers.updateUser);
router.delete('/', controllers.deleteAllUsers);
router.delete('/:id', controllers.deleteUserById);

module.exports = router;
