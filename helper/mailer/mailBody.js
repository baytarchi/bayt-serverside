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

module.exports = {
  getMailBody,
};
