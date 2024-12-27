const generateUserEmail = (userData) => {
  const { name } = userData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.8;
          color: #2c3e50;
          background-color: #f9f9f9;
          padding: 20px;
          margin: 0;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
          overflow: hidden;
        }
        .header {
          background-color: #34495e;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .footer {
          text-align: center;
          padding: 10px;
          font-size: 14px;
          color: #7f8c8d;
          background-color: #ecf0f1;
        }
        .footer a {
          color: #2980b9;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>ISBE Consultancy</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to ISBE Consultancy. We have received your information and appreciate your interest in our services.</p>
          <p>Our team will review your inquiry and get back to you shortly. If you have any urgent questions, feel free to reply to this email.</p>
          <p>Thank you,<br>ISBE Consultancy Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 ISBE Consultancy | <a href="#">Contact Us</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateUserEmail;
