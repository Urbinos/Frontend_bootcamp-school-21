const { Router } = require('express');
const controller = require('../controllers/logout.controller')

const router = Router();
router.get('/', controller.logout);

module.exports = router;