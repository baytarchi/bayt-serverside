const Category = require("../../models/category");
const Project = require("../../models/project");

const addCategory = async (category_name) => {
  const category = new Category({
    category_name,
  });

  await category.save();

  return {
    message: "Category added successfully",
    statusCode: 200,
  };
};

const updateCategory = async (category_id, category_name) => {
  console.log(category_id, "category_id");
  const category = await Category.findById(category_id);

  if (!category) {
    return {
      message: "Category not found",
      statusCode: 400,
    };
  }

  await Category.findByIdAndUpdate(
    category_id,
    { category_name },
    { new: true, runValidators: true }
  );

  return {
    message: "Category updated successfully",
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

const deleteCategory = async (category_id) => {
  console.log(category_id, "category_id");
  const category = await Category.findById(category_id);

  if (!category) {
    return {
      message: "Category not found",
      statusCode: 400,
    };
  }

  const projects = await Project.find({ category: category_id });

  if (projects.length > 0) {
    await Project.deleteMany({ category: category_id });
  }

  await Category.findByIdAndDelete(category_id);

  return {
    message: "Category deleted successfully",
    statusCode: 200,
  };
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
