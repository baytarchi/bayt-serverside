const Project = require("../../models/project");

const addProject = async (project_data) => {
  const {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
  } = project_data;

  const new_project_data = {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
  };

  const project = new Project({
    ...new_project_data,
  });

  project.save();

  return {
    message: "Project created successfully",
    statusCode: 401,
  };
};

module.exports = {
  addProject,
};
