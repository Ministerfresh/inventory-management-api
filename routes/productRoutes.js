const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Bring in Middleware
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect)
// ! No authentication here as requested
router.post('/', authorizeRoles('admin'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;