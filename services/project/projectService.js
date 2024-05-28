const Project = require("../../models/project");
const { statusCodes } = require("../../config");

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
    statusCode: statusCodes.SUCCESSFUL.CREATED,
  };
};

const getProjects = async () => {
  const projects = await Project.find();

  if (!projects) {
    return {
      message: "There is no project",
      statusCode: statusCodes.CLIENT_ERROR.NOT_FOUND,
    };
  }

  return {
    message: "Projects featched successfully",
    projects,
    statusCode: statusCodes.SUCCESSFUL.SUCCESS,
  };
};

const getProject = async (project_slug) => {
  const project = await Project.findOne({ project_slug: project_slug });

  if (!project) {
    return {
      message: "There is no projects",
      statusCode: statusCodes.CLIENT_ERROR.NOT_FOUND,
    };
  }

  return {
    message: "Project featched successfully",
    project,
    statusCode: statusCodes.SUCCESSFUL.SUCCESS,
  };
};

module.exports = {
  addProject,
  getProjects,
  getProject,
};
