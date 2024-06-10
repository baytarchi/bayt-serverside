const projectService = require("../../services/project/projectService");
const PhotoService = require("../../helper/image/image-server");
const categoryHelper = require("../../helper/category/categoryValidation");
const Category = require("../../models/category");
const StatusCodes = require("../../config");

const addProject = async (req, res) => {
  const {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
    isPortfolio,
    architects,
    captions,
  } = req.body;

  // console.log(captions, "req.body;");

  // const { error, errorMessage } = await categoryHelper.categoryValidation(
  //   Category,
  //   category
  // );

  // if (error) {
  //   res.status(StatusCodes.CLIENT_ERROR.BAD_REQUEST).json({
  //     message: errorMessage,
  //   });
  // }

  const photos = req.files;
  // console.log(photos, "files");

  const photoService = new PhotoService(req.files);
  let projectPhotoLinks;
  await photoService
    .upload()
    .then((link) => {
      projectPhotoLinks = link;
    })
    .catch((error) => {
      console.error("Error uploading photo:", error);
    });

  console.log(projectPhotoLinks);

  const project_data = {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
    isPortfolio,
    architects,
  };

  const { message, statusCode } = await projectService.addProject(project_data);

  res.status(statusCode).json({
    message,
  });
};

const getProjects = async (req, res) => {
  const { message, projects, statusCode } = await projectService.getProjects();

  res.status(statusCode).json({
    message,
    projects,
  });
};

const getProject = async (req, res) => {
  const { project_slug } = req.params;

  const { message, project, statusCode } = await projectService.getProject(
    project_slug
  );

  res.status(statusCode).json({
    message,
    project,
  });
};

module.exports = {
  addProject,
  getProjects,
  getProject,
};
