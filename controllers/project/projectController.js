const projectService = require("../../services/project/projectService");
const categoryHelper = require("../../helper/category/categoryValidation");
const Category = require("../../models/category");

const addProject = async (req, res) => {
  const {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
  } = req.body;

  const { error, errorMessage } = await categoryHelper.categoryValidation(
    Category,
    category
  );

  if (error) {
    res.status(400).json({
      message: errorMessage,
    });
  }

  const project_data = {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
  };
  console.log(project_data, "project_data");
  const { message, statusCode } = await projectService.addProject(project_data);

  res.status(statusCode).json({
    message,
  });
};

const getProject = async (req, res) => {
  const { jersey_slug } = req.params;

  const { message, jersey, statusCode } = await jerseyService.getProject(
    jersey_slug
  );

  res.status(statusCode).json({
    message,
    jersey,
  });
};

const getProjects = async (req, res) => {
  const { message, jerseys, statusCode } = await jerseyService.getjerseys();

  res.status(statusCode).json({
    message,
    jerseys,
  });
};

module.exports = {
  getProjects,
  getProject,
  addProject,
};
