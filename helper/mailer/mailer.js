const nodemailer = require("nodemailer");

const sendMail = async (subject, body, attachments) => {
  const senderMail = process.env.EMAIL_USERNAME;
  const senderPassword = process.env.EMAIL_PASSWORD;

  let mailOptions;
  if (attachments && attachments.length > 0) {
    mailOptions = {
      from: senderMail,
      to: senderMail,
      subject: subject,
      html: body,
      attachments: attachments,
    };
  } else {
    mailOptions = {
      from: senderMail,
      to: senderMail,
      subject: subject,
      html: body,
    };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: senderMail,
      pass: senderPassword,
    },
  });

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
