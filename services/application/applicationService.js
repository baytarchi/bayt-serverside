const mailService = require("../../helper/mailer/mailer");
const mailerBody = require("../../helper/mailer/mailBody");

const contactUs = async (name, email, description) => {
  console.log(name, email, description);

  try {
    const subject = `Contacted by: ${email}`;
    const body = mailerBody.getMailBody(email, subject, description);

    // const body = `<p>Hi ${name}</p>
    //                               <br>Welcome abord! Your user creation our application is successful<br>
    //                               <a href="http://localhost:5173/${token}">Verify Email</a><br>
    //                               <br>Cheers<br>`;
    // const body = description;

    await mailService.sendMail(subject, body);
  } catch (e) {
    response.message = "Technical Error: Unable to send contact";
    response.Success = false;
  }

  return {
    message: "Your message has been sent successfully",
    statusCode: 200,
  };
};

module.exports = { contactUs };
