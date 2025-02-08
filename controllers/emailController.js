const { sendEmailService } = require('../services/emailService');
const p = require("../config/db");
const { generatePassword } = require('../utils/password_generator')

const sendEmail = async (req, res) => {


  const { to, subject, text, html } = req.body;
  const newPassword = generatePassword();
  console.log("Generated password:", newPassword);
  const modifiedText = `${text} ${newPassword}`;
  const modifiedHtml = `${html}<p><strong>Your new password is: </strong>${newPassword}</p>`;
  try {
    // Create two promises for parallel execution
    const updatePasswordPromise = p.query(
      'SELECT ova2.udf_update_password($1::text, $2::text);', 
      [to, newPassword]
    );

    const sendEmailPromise = sendEmailService({ to, subject, text: modifiedText, html: modifiedHtml });
    const [responseForPassword, emailInfo] = await Promise.all([updatePasswordPromise, sendEmailPromise]);
    if (responseForPassword && responseForPassword.rows && responseForPassword.rows[0].udf_update_password === 'success') {
      console.log("Email sent info:", emailInfo);
      res.status(200).json({ message: 'Email sent successfully!', info: emailInfo });
    } else {
      res.status(400).json({ message: 'Error occurred while updating password in the database.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email or update password', error });
  }
};

module.exports = { sendEmail };
