const applicationService = require("../../services/application/applicationService");

const contactUs = async (req, res) => {
  const { name, email, description } = req.body;

  if (!name || !email || !description) {
    return res.status(400).json({
      message: "Missing required information",
    });
  }

  const { message, statusCode } = await applicationService.contactUs(
    name,
    email,
    description
  );

  res.status(statusCode).json({
    message,
  });
};

module.exports = {
  contactUs,
};
