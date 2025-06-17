const { Router } = require("express");
const userController =require('./../Controllers/userController');
router.post('/register',userController.register)