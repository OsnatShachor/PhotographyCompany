const emailjs = require('emailjs-com');

async function sendEmail({ toEmail, subject, message, fromName }) 
 {
  const templateParams = {
    from_name: fromName,
    to_email: toEmail,
    subject: subject,
    message: message
  };

  try {
    const response = await emailjs.send(
      'service_u2ebeds',  // Your service ID
      'template_1r1fvrt', // Your template ID
      templateParams,
      'sVdp577QDfBGZC2gO' // Your user ID
    );
    console.log(response);
    return response;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};
module.exports={sendEmail}