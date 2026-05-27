const nodemailer = require("nodemailer");

async function sendEmail(name, email, message) {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "flhaidem@gmail.com",
      pass: "YOUR_APP_PASSWORD_HERE"
    }
  });

  let mailOptions = {
    from: "flhaidem@gmail.com",
    to: "flhaidem@gmail.com",
    subject: "New Form Submission 🚀",
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
