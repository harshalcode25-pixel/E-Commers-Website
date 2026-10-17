const express = require("express");
const {createProduct, deleteProduct, getProductById, getProducts, updateProduct} = require("../controllers/product.controller");
const { isAuth, isAdmin } = require("../middlewares/auth.middleware");
const { validateProductId, validateProduct } = require("../middlewares/validation.middleware");

const router = express.Router();



router.get("/", getProducts);

router.get("/:id", validateProductId, getProductById);
 
router.post("/", isAuth, isAdmin, validateProduct(), createProduct);

router.put("/:id", isAuth, isAdmin, validateProductId, validateProduct(true), updateProduct);

router.delete("/:id", isAuth, isAdmin, validateProductId, deleteProduct);




module.exports = router;
