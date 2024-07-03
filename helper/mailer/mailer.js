const nodemailer = require("nodemailer");

const sendMail = async (subject, body,attachments) => {
  const senderMail = process.env.EMAIL_USERNAME;
  const senderPassword = process.env.EMAIL_PASSWORD;

  // const mailOptions = {
  //   from: senderMail,
  //   to: senderMail,
  //   subject: subject,
  //   replyTo: senderMail,
  //   html: body,
  // };

  console.log(attachments);

  const mailOptions = {
    from: senderMail,
    to: senderMail,
    subject: subject,
    html: body,
    ...(attachments.length > 0 && { attachments }),
  };

  console.log(senderPassword);
  console.log(senderMail);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: senderMail,
      pass: senderPassword,
    },
  });

  console.log(senderPassword);
  console.log(senderMail);

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.log("Failed to send email", error);
    return false;
  }
};

module.exports = {
  sendMail,
};
