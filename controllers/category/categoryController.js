const categoryService = require("../../services/category/categoryService");
const Category = require("../../models/category");
const categoryHelper = require("../../helper/category/categoryValidation");

const addCategory = async (req, res) => {
  const { category_name } = req.body;

  const { error: validationError } =
    categoryHelper.validateCategory(category_name);

  if (validationError) {
    return res.status(400).json({
      message: validationError.message,
    });
  }

  const { error, errorMessage } = await categoryHelper.categoryDoesExist(
    Category,
    category_name
  );

  if (error) {
    return res.status(400).json({
      message: errorMessage,
    });
  }

  const { message, statusCode } = await categoryService.addCategory(
    category_name
  );

  res.status(statusCode).json({
    message,
  });
};

const getCategories = async (req, res) => {
  const { message, categories, statusCode } =
    await categoryService.getCategories();

  res.status(statusCode).json({
    message,
    categories,
  });
};

module.exports = {
  getCategories,
  addCategory,
};
