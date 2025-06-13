const { Router } = require("express");
const productController = require("../Controllers/productController");
const router = Router();

router.post('/',productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id', productController.editProduct);


module.exports = router;