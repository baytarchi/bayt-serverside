const Joi = require("joi");

const categoryValidation = async (Model, category_id) => {
  const category = await Model.findById(category_id);

  if (category) {
    return {
      error: false,
      errorMessage: "",
    };
  }
  return {
    error: true,
    errorMessage: "You must select a category!",
  };
};

const categoryDoesExist = async (Model, category_name) => {
  const category = await Model.findOne({ category_name: category_name });

  if (!category) {
    return {
      error: false,
      errorMessage: "",
    };
  }

  return {
    error: true,
    errorMessage: "This category already exist!",
  };
};

const validateCategory = (category_name) => {
  const schema = Joi.string().required().label("Category Name");
  return schema.validate(category_name, { abortEarly: false });
};

module.exports = {
  categoryValidation,
  categoryDoesExist,
  validateCategory,
};
