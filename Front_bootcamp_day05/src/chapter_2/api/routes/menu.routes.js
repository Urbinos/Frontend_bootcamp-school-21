const { Router } = require('express');
const controller = require('../controllers/menu.controller')

const router = Router();
router.get('/', controller.getMenuPage);

module.exports = router;