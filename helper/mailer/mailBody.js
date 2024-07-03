const currentDate = new Date();

const getMailBody = (fromEmail, subject, description) => {
  return `<body style="font-family: 'Poppins', Arial, sans-serif">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #cccccc;">
        
                    <tr>
                        <td class="header" style="background-color: #345C72; padding: 40px; text-align: center; color: white; font-size: 24px;">
                        Response from website
                        </td>
                    </tr>
                  <tr>
                    <td class="body" style="margin: 0; padding:30px 40px; text-align: left; font-size: 16px;">From: ${fromEmail} <br><br>
                      Subject: ${subject}
                    </td>
                  </tr>
                    <tr>
                        <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                        ${description}         
                        </td>
                    </tr>
                    <tr>
                        <td class="footer" style="background-color: #333333; padding: 40px; text-align: center; color: white; font-size: 14px;">
                            Copyright &copy; ${currentDate.getFullYear()} | BAYT Architect
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`;
};

const getCareerMailBody = (name, email, phoneNumber) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Job Application</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .content {
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Job Application</h1>
          </div>
          <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p>Attached are my CV and cover letter for your consideration.</p>
          </div>
          <div class="footer">
            <p>Thank you for your time and consideration.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = {
  getMailBody,
  getCareerMailBody,
};
