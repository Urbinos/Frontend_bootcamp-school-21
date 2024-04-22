const { Router } = require('express');
const controllers = require('../controllers/waiter.controller');

const router = Router();

router.get('/', controllers.getAllWaiters);
router.get('/:id', controllers.getWaiterById);
router.post('/', controllers.createWaiter);

module.exports = router;
