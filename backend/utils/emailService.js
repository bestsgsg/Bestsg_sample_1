// backend/utils/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send inquiry notification email
async function sendInquiryNotification(inquiryData) {
  try {
    const mailOptions = {
      from: `"BestSG Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_USER, // Send to the admin email
      subject: 'New Project Inquiry - BestSG',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Project Inquiry Received</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Client Information:</h3>
            <p><strong>Name:</strong> ${inquiryData.name}</p>
            <p><strong>Email:</strong> ${inquiryData.email}</p>
            ${inquiryData.company ? `<p><strong>Company:</strong> ${inquiryData.company}</p>` : ''}

            <h3 style="color: #1f2937; margin-top: 30px;">Project Details:</h3>
            <p><strong>Service:</strong> ${inquiryData.service}</p>
            ${inquiryData.budget ? `<p><strong>Budget:</strong> ${inquiryData.budget}</p>` : ''}
            ${inquiryData.timeline ? `<p><strong>Timeline:</strong> ${inquiryData.timeline}</p>` : ''}

            <h3 style="color: #1f2937; margin-top: 30px;">Message:</h3>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
              ${(inquiryData.message || inquiryData.details || '').replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
            <p>This inquiry was submitted through the BestSG website contact form.</p>
            <p>Please respond to the client within 24 hours.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Inquiry notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending inquiry notification email:', error);
    // Don't throw error - we don't want email failure to break inquiry submission
    return false;
  }
}

module.exports = {
  sendInquiryNotification,
};