const { Router } = require("express");
const router = new Router();
const userController =require('../Controllers/userController');
router.post('/register',userController.register)



module.exports = router;