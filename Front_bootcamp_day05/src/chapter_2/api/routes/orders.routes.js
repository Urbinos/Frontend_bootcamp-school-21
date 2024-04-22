const { Router } = require('express');
const controller = require('../controllers/orders.controller');

const router = Router();

router.get('/', controller.getOrdersPage);
router.get('/:id', controller.getOrderPage);

module.exports = router;