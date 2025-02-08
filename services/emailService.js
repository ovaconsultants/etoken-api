const transporter = require('../nodemailer-config');

// Service function for sending emails
const sendEmailService = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: 'ova2consultancy@gmail.com',
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmailService };
