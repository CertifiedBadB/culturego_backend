const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILADRESS,
    pass: process.env.MAILPASSWORD
  }
});

module.exports.transaction_postmail = async () => {
  try {
    // Read the HTML template from the "assets" folder
    const templatePath = path.join(__dirname, 'mails', 'puntenoverzetten.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    const mailOptions = {
      from: process.env.MAILADRESS,
      to: process.env.MAILADRESS,
      subject: 'Gefeliciteerd!',
      html: htmlTemplate, // Use the HTML template
    };

    const info = await transporter.sendMail(mailOptions);
    return 'Email sent: ' + info.response;
  } catch (error) {
    return error;
  }
};