const express = require("express");
const router = express.Router();
const productController = require('../controllers/productControllers');
const upload = require('../middlewares/authfile')
const adminKey = require('../middlewares/adminfile');

router.post("/", upload.single('image'),  productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:brand", productController.getProductsbyName);


module.exports = router;