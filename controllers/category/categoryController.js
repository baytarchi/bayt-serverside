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

const updateCategory = async (req, res) => {
  const { category_name } = req.body;
  const { category_id } = req.params;

  if (!category_id) {
    return res.status(400).json({
      message: "Please provide a category",
    });
  }

  if (!category_name) {
    return res.status(400).json({
      message: "Please provide the updated category name",
    });
  }

  const { message, statusCode } = await categoryService.updateCategory(
    category_id,
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

const deleteCategory = async (req, res) => {
  const { category_id } = req.params;

  if (!category_id) {
    return res.status(400).json({
      message: "Please provide a category",
    });
  }

  const { message, statusCode } = await categoryService.deleteCategory(
    category_id
  );

  res.status(statusCode).json({
    message,
  });
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
