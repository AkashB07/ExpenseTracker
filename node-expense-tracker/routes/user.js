const express = require('express');

const userauthentication = require('../middleware/auth');
const userController = require('../controller/user')

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/profile', userauthentication.authenticate, userController.postProfile);

router.get('/profile', userauthentication.authenticate, userController.getProfile);

router.patch('/update', userauthentication.authenticate, userController.updateUser);


module.exports = router;