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

module.exports.transaction_postmail = async (mailadress, punten, transactie,pascode) => {
  try {
    // Read the HTML template from the "assets" folder
    const templatePath = path.join(__dirname, '../mails/puntenoverzetten.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    const mailOptions = {
      from: process.env.MAILADRESS,
      to: mailadress,
      subject: 'Gefeliciteerd! Uw punten worden overgezet.',
      html: htmlTemplate, // Use the HTML template
    };

    const mailOptions2 = {
        from: process.env.MAILADRESS,
        to: process.env.MAILADRESS,
        subject: 'Puntentransactie CG ' + transactie,
        html: `
    <h2>Transactie Details:</h2>
    <p><strong>TransactieId:</strong> ${transactie}</p>
    <p><strong>Punten:</strong> ${punten}</p>
    <p><strong>Pasnummer:</strong> ${pascode}</p>
    <p><strong>Email:</strong> ${mailadress}</p>
  `,
};

    const info = await transporter.sendMail(mailOptions2);
    const info2 = await transporter.sendMail(mailOptions);
    return 'Email sent: ' + info.response + info2.response;
  } catch (error) {
    return error;
  }
};

module.exports.welcome_postmail = async (mailadress) => {
    try {
      // Read the HTML template from the "assets" folder
      const templatePath = path.join(__dirname, '../mails/welcome.html');
      const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  
      const mailOptions = {
        from: process.env.MAILADRESS,
        to: mailadress,
        subject: 'Welkom',
        html: htmlTemplate, // Use the HTML template
      };
  
      const info2 = await transporter.sendMail(mailOptions);
      return 'Email sent: ' + info2.response;
    } catch (error) {
      return error;
    }
  };