const { Router } = require('express');
const controller = require('./../controllers/main.controller')

const router = Router();
router.get('/', controller.getMainPage);

module.exports = router;