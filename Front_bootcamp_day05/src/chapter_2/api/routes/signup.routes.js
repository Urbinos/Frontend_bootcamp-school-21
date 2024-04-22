const { Router } = require('express');
const controller = require('../controllers/signup.controller');

const router = Router();

router.get('/', controller.getSignupPage);
router.post('/', controller.postSignUpPage);

module.exports = router;
