const Project = require("../../models/project");

const getProjects = async () => {
  const projects = await Project.find();

  if (!projects) {
    return {
      message: "There is no projects",
      statusCode: 400,
    };
  }

  return {
    message: "Project featched successfully",
    projects,
    statusCode: 200,
  };
};

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
    statusCode: 201,
  };
};

module.exports = {
  addProject,
  getProjects,
};
