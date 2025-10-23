const nodeMailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  // create transporter
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    // host: process.env.EMAIL_PORT,
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send email
  const info = await transporter.sendMail({
    from: `"Task Manager App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html, // optional if you want to send formatted email
  });
  console.log("Email sent: %$", info.messageId);
};

module.exports = sendEmail;
