const projectService = require("../../services/project/projectService");
const { multipleUpload } = require("../../utils/cloudinary");

const addProject = async (req, res) => {
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
    photoLinks,
    captions,
  } = req.body;

  // Normalize captions to array and sanitize "undefined"
  const safeCaptions = (Array.isArray(captions) ? captions : [captions]).map(
    (caption) => (caption === "undefined" ? "" : caption)
  );

  // Normalize photoLinks to array (handle string or array input)
  const project_photo_links = Array.isArray(photoLinks)
    ? photoLinks
    : photoLinks
    ? [photoLinks]
    : [];

  // Optional: handle case where no image link is provided
  if (project_photo_links.length === 0) {
    return res.status(400).json({ message: "No photo links provided" });
  }

  const project_data = {
    isPortfolio: isPortfolio === "true",
    isFeature: isFeature === "true",
    project_name,
    project_description,
    category,
    architects,
    gross_built_area,
    project_location,
    completion_year,
    captions: safeCaptions,
    featured_image: project_photo_links[0], // First image as featured
    project_photo_links,
  };

  const { message, statusCode } = await projectService.addProject(project_data);

  res.status(statusCode).json({ message });
};

const updateProject = async (req, res) => {
  const { project_id } = req.params;
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
    photoLinks,
  } = req.body;

  // Normalize captions
  const safeCaptions = (Array.isArray(captions) ? captions : [captions]).map(
    (caption) => (caption === "undefined" ? "" : caption)
  );

  // Normalize existing photo links
  const existingPhotoLinks = Array.isArray(photoLinks)
    ? photoLinks
    : photoLinks
    ? [photoLinks]
    : [];

  // Upload any new files if present
  let newProjectPhotoLinks = [];
  if (req.files && req.files.length > 0) {
    try {
      newProjectPhotoLinks = await multipleUpload(req.files);
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new apiError(500, "Image upload failed");
    }
  }

  // Final combined photo list
  const allPhotoLinks = [...existingPhotoLinks, ...newProjectPhotoLinks];

  // Final payload
  const project_data = {
    isPortfolio: isPortfolio === "true",
    isFeature: isFeature === "true",
    project_name,
    project_description,
    category,
    architects,
    gross_built_area,
    project_location,
    completion_year,
    captions: safeCaptions,
    featured_image: allPhotoLinks[0], // First image is featured
    project_photo_links: allPhotoLinks,
  };

  const { message, statusCode } = await projectService.updateProject(
    project_id,
    project_data
  );

  res.status(statusCode).json({ message });
};

const getProjects = async (req, res) => {
  const category_name = req.query.category;

  const { message, projects, statusCode } = await projectService.getProjects(
    category_name
  );

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

const deleteProject = async (req, res) => {
  const { project_id } = req.params;

  const { message, statusCode } = await projectService.deleteProject(
    project_id
  );

  res.status(statusCode).json({
    message,
  });
};

module.exports = {
  addProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
};
