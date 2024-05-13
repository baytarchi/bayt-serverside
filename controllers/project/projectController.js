const addProject = async (req, res) => {
  const {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
  } = req.body;

  const jersey_data = {
    project_name,
    project_description,
    completion_year,
    gross_built_area,
    project_location,
    category,
  };

  const { message, statusCode } = await jerseyService.addProject(jersey_data);

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
