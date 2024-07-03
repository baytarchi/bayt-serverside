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

const career = async (name, email, phone_number, cv, coverLetter) => {
  try {
    const subject = `Job Application from: ${name}`;
    const body = mailerBody.getCareerMailBody(email, subject, phone_number);

    // Attach the files
    const attachments = [
      { filename: "cv.pdf", content: cv.buffer },
      { filename: "coverLetter.pdf", content: coverLetter.buffer },
    ];

    await mailService.sendMail(subject, body, attachments);
  } catch (e) {
    return {
      message: "Technical Error: Unable to process job application",
      statusCode: 500,
    };
  }
  return {
    message: "Your job application has been sent successfully",
    statusCode: 200,
  };
};

module.exports = { contactUs, career };
