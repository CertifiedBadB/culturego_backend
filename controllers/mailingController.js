var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILADRESS,
        pass: process.env.MAILPASSWORD
    }
    });

module.exports.transaction_postmail = async() => {
    var mailOptions = {
        from: process.env.MAILADRESS,
        to: process.env.MAILADRESS,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      }
    await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return error;
    } else {
        return ('Email sent: ' + info.response);
    }
    })
}
//TEST