const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/", productController.productList);
router.get("/search/:id", productController.ProductById);
router.post("/add", productController.productAdd);
router.put("/update", productController.productUpdate);
router.delete("/remove/:id", productController.productRemove);

module.exports = router;
