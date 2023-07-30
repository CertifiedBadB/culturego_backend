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
        subject: 'Puntentransactie ' + transactie,
        text:
        'TransactieId: ' + transactie +
        "\n\nPunten: " + punten +
        "\n\nPasnummer: " + pascode +
        "\n\nEmail: " + mailadress,
      };

    const info = await transporter.sendMail(mailOptions2);
    return 'Email sent: ' + info.response;
  } catch (error) {
    return error;
  }
};