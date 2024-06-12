const Project = require("../../models/project");
const { statusCodes } = require("../../config");

const addProject = async (project_data) => {
  const {
    isPortfolio,
    project_name,
    project_description,
    category,
    architects,
    gross_built_area,
    project_location,
    completion_year,
    captions,
    featured_image,
    project_photo_links,
  } = project_data;

  const new_project_data = {
    isPortfolio,
    project_name,
    project_description,
    category,
    architects,
    gross_built_area,
    project_location,
    completion_year,
    captions,
    featured_image,
    project_photo_links,
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
