const { Router } = require('express');
const controller = require('../controllers/view.controller');

const router = Router();

router.get('/orders', controller.getOrdersPage);
router.get('/orders/:id', controller.getOrderPage);
router.get('/menu', controller.getMenuPage);
router.get('/', controller.getMainPage);

module.exports = router;
