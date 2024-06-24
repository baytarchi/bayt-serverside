const Project = require("../../models/project");
const Category = require("../../models/category");
const { statusCodes } = require("../../config");

const addProject = async (project_data) => {
  const {
    isPortfolio,
    isFeature,
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
    isFeature,
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

const getProjects = async (category_name) => {
  let projects;
  if (category_name) {
    const category = await Category.findOne({ category_name: category_name });

    if (!category) {
      return {
        message: "There is no such category",
        statusCode: statusCodes.CLIENT_ERROR.NOT_FOUND,
      };
    }

    projects = await Project.find({ category: category._id })
      .populate("category", "category_name")
      .exec();
  } else {
    projects = await Project.find()
      .populate("category", "category_name")
      .exec();
  }

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
  const project = await Project.findOne({
    project_slug: project_slug,
  }).populate("category", "category_name");

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

const deleteProject = async (project_id) => {
  const project = await Project.findById(project_id);

  if (!project) {
    return {
      message: "project not found",
      statusCode: statusCodes.CLIENT_ERROR.BAD_REQUEST,
    };
  }

  await Project.findByIdAndDelete(project_id);

  return {
    message: "Project deleted successfully",
    statusCode: statusCodes.SUCCESSFUL.SUCCESS,
  };
};

const updateProject = async (project_id, project_data) => {
  const {
    isPortfolio,
    isFeature,
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
    isFeature,
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

  const project = await Project.findById(project_id);

  if (!project) {
    return {
      message: "project not found",
      statusCode: statusCodes.CLIENT_ERROR.BAD_REQUEST,
    };
  }

  await Project.findByIdAndUpdate(project_id, new_project_data, {
    new: true,
  });

  console.log(project_data, "project_data updated");

  return {
    message: "Project updated successfully",
    statusCode: statusCodes.SUCCESSFUL.CREATED,
  };
};

module.exports = {
  addProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
};
