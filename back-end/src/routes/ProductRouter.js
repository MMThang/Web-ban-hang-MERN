const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/create-product", ProductController.createProduct);
router.get("/:params_name", ProductController.getOneProduct);
router.get("/t/:type", ProductController.getListProduct);
router.get("/search/result", ProductController.searchProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);

module.exports = router;
