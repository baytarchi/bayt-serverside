const categoryService = require("../../services/category/categoryService");

const addCategory = async (req, res) => {
  const { category_name } = req.body;

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
