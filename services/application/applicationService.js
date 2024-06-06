const mailService = require("../../helper/mailer/mailer");
const mailerBody = require("../../helper/mailer/mailBody");

const contactUs = async (name, email, description) => {
  try {
    const subject = `Contacted by: ${name}`;
    const body = mailerBody.getMailBody(email, subject, description);
    await mailService.sendMail(subject, body);
  } catch (e) {
    response.message = "Technical Error: Unable to send contact";
    response.Success = false;
  }

  return {
    message: "Your message has been sent successfully, we will back to you",
    statusCode: 200,
  };
};

module.exports = { contactUs };
