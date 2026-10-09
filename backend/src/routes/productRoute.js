// const express = require("express");
// const { createProduct, deleteProduct, getProductById, getProducts, updateProduct } = require("../controllers/product.controller");
// const { isAuth, isAdmin } = require("../middlewares/auth.middleware");

// const router = express.Router();
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// // Only signed-in administrators can change the product catalogue.
// router.post("/", isAuth, isAdmin, createProduct);
// router.put("/:id", isAuth, isAdmin, updateProduct);
// router.delete("/:id", isAuth, isAdmin, deleteProduct);

// module.exports = router;


const express = require("express");
const {createProduct, deleteProduct, getProductById, getProducts, updateProduct} = require("../controllers/product.controller");
const { isAuth, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();



router.get("/", getProducts);

router.get("/:id", getProductById);
 
router.post("/", isAuth, isAdmin, createProduct);

router.put("/:id", isAuth, isAdmin, updateProduct);

router.delete("/:id", isAuth, isAdmin, deleteProduct);




module.exports = router;
