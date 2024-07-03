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

const career = async (req, res) => {
  const { name, email, phone_number } = req.body;
  console.log(req.body);
  const cv = req.files.cv[0];
  const coverLetter = req.files.coverLetter[0];

  if (!name || !email || !phone_number || !cv || !coverLetter) {
    return res.status(400).json({
      message: "Missing required information",
    });
  }

  const { message, statusCode } = await applicationService.career(
    name,
    email,
    phone_number,
    cv,
    coverLetter
  );

  res.status(statusCode).json({
    message,
  });
};

module.exports = {
  contactUs,
  career,
};
