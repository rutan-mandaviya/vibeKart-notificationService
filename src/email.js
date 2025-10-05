// src/email.js
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // SSL port
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // tumhara gmail
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"VibeKart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
