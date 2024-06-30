const emailjs = require('emailjs-com');

exports.sendEmail = async ({ toEmail, subject, message, fromName }) => {
  const templateParams = {
    from_name: fromName,
    to_email: toEmail,
    subject: subject,
    message: message
  };

  try {
    const response = await emailjs.send(
      'service_s3d1178',  // Your service ID
      'template_mqwk8qr', // Your template ID
      templateParams,
      'sj2if0qSB4CuS6Prm' // Your user ID
    );
    return response;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};
