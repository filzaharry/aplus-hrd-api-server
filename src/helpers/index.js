const nodemailer = require('nodemailer');

exports.sendEmail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'filza@raharja.info', 
          pass: 'oxgchspxlldtzdax', 
        },
      });
    return(
        transporter.sendMail(dataEmail)
        .then(info => console.log(`Email Terkirim: ${info.message}`))
        .catch(error => console.log(`Terjadi Kesalahan: ${error}`))
    )
    // console.log(dataEmail);
}