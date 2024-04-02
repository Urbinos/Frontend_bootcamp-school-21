const { Router } = require('express');
const controllers = require('../controllers').menuItemController;

const router = Router();

router.get('/', controllers.getAllMenuItems);
router.get('/:id', controllers.getMenuItemById);
router.post('/', controllers.createMenuItem);
router.put('/:id', controllers.updateMenuItem);
router.delete('/:id', controllers.deleteMenuItemById);
router.delete('/', controllers.deleteAllMenuItems);

module.exports = router;
