const { Router } = require("express");

const router = new Router();
const userController =require('../Controllers/userController');
const validateInputs = require('../middlewares/validateEmailAndPass')
router.post('/register',validateInputs.validateEmail,validateInputs.validatePassword,userController.register)
router.post('/login',validateInputs.validateEmail,userController.login)



module.exports = router;