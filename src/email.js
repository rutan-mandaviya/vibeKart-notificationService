// resendEmail.service.js
const {Resend} = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send email via Resend
const sendEmail = async (to, subject, html, text = "") => {
  try {
    const response = await resend.emails.send({
      from: `VibeKart <${process.env.EMAIL_USER}>`, // apna verified sender email
      to,
      subject,
      html,
      text,
    });

    console.log("Email sent via Resend:", response);
  } catch (error) {
    console.error("Error sending email via Resend:", error);
  }
};

module.exports = sendEmail;
