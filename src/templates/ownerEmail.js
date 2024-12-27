const generateOwnerEmail = (userData) => {
  const { name, email, phone, date, time, message } = userData;

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
        .user-details {
          background-color: #ecf0f1;
          border-left: 5px solid #2980b9;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
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
          <p>Dear Owner,</p>
          <p>You have received a new contact form submission. Below are the details:</p>
          <div class="user-details">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          <p>We recommend contacting the user promptly to address their query.</p>
          <p>Best regards,<br>ISBE Consultancy Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 ISBE Consultancy | <a href="#">Privacy Policy</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateOwnerEmail;
