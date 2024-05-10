const Category = require("../../models/category");

const addCategory = async (category_name) => {
  console.log(category_name, "category_name");
  const category = new Category({
    category_name: category_name,
  });

  await category.save();

  return {
    message: "Category added successfully",
    statusCode: 200,
  };
};

const getCategories = async () => {
  const categories = await Category.find({});

  return {
    message: "Categories successfully Fetched",
    categories,
    statusCode: 200,
  };
};

module.exports = {
  addCategory,
  getCategories,
};
