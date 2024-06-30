const emailService = require('../service/emailService');

exports.sendEmail = async (req, res) => {
  const { toEmail, subject, message, fromName } = req.body;

  try {
    const response = await emailService.sendEmail({ toEmail, subject, message, fromName });
    res.status(200).json({ message: 'Email sent successfully!', response });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
