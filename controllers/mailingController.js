var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILADRESS,
        pass: process.env.MAILPASSWORD
    }
    });

module.exports.transaction_postmail = () => {
    var mailOptions = {
        from: process.env.MAILADRESS,
        to: process.env.MAILADRESS,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      }
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    })
}
//TEST