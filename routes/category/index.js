const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category/categoryController");

router.post("/", categoryController.addCategory);
router.get("/", categoryController.getCategories);
router.patch("/:category_id", categoryController.updateCategory);
router.delete("/:category_id", categoryController.deleteCategory);

module.exports = router;
