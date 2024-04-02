const { Router } = require('express');
const controller = require('../controllers/controller.js');

const router = Router();

router.get('/menu', controller.getMenu);
router.get('/orders', controller.getAllOrders);
router.post('/orders', controller.createOrder);
router.post('/waiters', controller.createWaiter);
router.put('/orders/:id', controller.updateOrder);
router.delete('/orders/:id', controller.closeOrder);

module.exports = router;
