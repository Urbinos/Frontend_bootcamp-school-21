const { Router } = require('express');
const controller = require('../controllers/signin.controller');

const router = Router();

router.get('/', controller.getSigninPage);
router.post('/', controller.postSigninPage);

module.exports = router;
