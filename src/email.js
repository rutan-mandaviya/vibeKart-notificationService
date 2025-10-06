const nodemailer = require('nodemailer');

// SMTP2GO credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER, // SMTP2GO username
        pass: process.env.EMAIL_PASS  // SMTP2GO password
    }
});

// verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to SMTP2GO:', error);
    } else {
        console.log('gmail server ready to send emails');
    }
});

// send email function
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"VibeKart" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
