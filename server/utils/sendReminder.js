import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReminder = async (toEmail, name) => {
  const mailOptions = {
    from: `"Student Progress Tracker" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "⚠️ You're falling behind on Codeforces!",
    html: `
      <p>Hi ${name},</p>
      <p>We noticed you haven’t made any Codeforces submissions in the past 7 days.</p>
      <p>Stay consistent and keep practicing – it’s the key to improvement!</p>
      <p>— Student Progress Management System</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Reminder sent to ${name}`);
    return true;
  } catch (err) {
    console.error(`❌ Email failed for ${name}:`, err.message);
    return false;
  }
};
