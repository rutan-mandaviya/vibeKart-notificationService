const nodemailer = require('nodemailer');

// Gmail credentials
const transporter = nodemailer.createTransport({
    host: 'gmail', // SMTP2GO server
    port: 587,                 // TLS port
    secure: false,             // true for 465, false for 587
    auth: {
        user: process.env.SMTP2GO_USER, // SMTP2GO username
        pass: process.env.SMTP2GO_PASS  // SMTP2GO password
    }
});

// verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to SMTP2GO:', error);
    } else {
        console.log('SMTP2GO server ready to send emails');
    }
});

// send email function
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"VibeKart" <${process.env.SMTP2GO_USER}>`,
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
