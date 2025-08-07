import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'sohaib021222@gmail.com',
    pass: process.env.EMAIL_PASS || 'test123', // You'll need to set this in .env
  },
});

export const sendOTPEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'sohaib021222@gmail.com',
    to: to,
    subject: 'Portfolio Admin Login - OTP Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; text-align: center;">Portfolio Admin Login</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-bottom: 15px;">OTP Verification Code</h3>
          <p style="color: #64748b; margin-bottom: 20px;">
            You have requested to login to your portfolio admin panel. Please use the following OTP code to complete your login:
          </p>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; text-align: center; border: 2px solid #e2e8f0;">
            <h1 style="color: #2563eb; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            This OTP will expire in 10 minutes. If you didn't request this login, please ignore this email.
          </p>
        </div>
        <div style="text-align: center; color: #64748b; font-size: 12px;">
          <p>This is an automated message from your portfolio admin system.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 OTP email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

export const sendLoginNotification = async (to: string, userEmail: string, ipAddress?: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'sohaib021222@gmail.com',
    to: to,
    subject: 'Portfolio Admin - New Login Detected',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #dc2626; text-align: center;">⚠️ New Admin Login</h2>
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3 style="color: #1e293b; margin-bottom: 15px;">Login Alert</h3>
          <p style="color: #64748b; margin-bottom: 10px;">
            A new login attempt has been made to your portfolio admin panel:
          </p>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>IP:</strong> ${ipAddress || 'Unknown'}</p>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            If this was you, no action is needed. If this was not you, please secure your account immediately.
          </p>
        </div>
        <div style="text-align: center; color: #64748b; font-size: 12px;">
          <p>This is an automated security notification from your portfolio admin system.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Login notification sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}; 