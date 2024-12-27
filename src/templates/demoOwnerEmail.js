const generateDemoOwnerEmail = (userData) => {
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
        .alert-banner {
          background-color: #f1c40f;
          color: #34495e;
          padding: 15px;
          text-align: center;
          font-weight: bold;
        }
        .content {
          padding: 30px;
        }
        .user-details {
          background-color: #f8f9fa;
          border-left: 4px solid #e74c3c;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .appointment-time {
          background-color: #e8f4f8;
          border-left: 4px solid #2980b9;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .action-items {
          background-color: #eafaf1;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #7f8c8d;
          background-color: #ecf0f1;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>ISBE Consultancy</h1>
        </div>
        <div class="alert-banner">
          🎯 New Demo Appointment Scheduled!
        </div>
        <div class="content">
          <p><strong>Important:</strong> A new demo has been scheduled through the website.</p>
          
          <div class="appointment-time">
            <h3 style="margin-top: 0;">Appointment Details</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> 45 minutes</p>
          </div>

          <div class="user-details">
            <h3 style="margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Additional Notes:</strong> ${message || 'No additional notes provided'}</p>
          </div>

          <div class="action-items">
            <h3 style="margin-top: 0;">Required Actions</h3>
            <ul>
              <li>Review client information and prepare relevant materials</li>
              <li>Send calendar invite to the client</li>
              <li>Prepare demo environment</li>
              <li>Review any specific requirements mentioned in the notes</li>
            </ul>
          </div>

          <p>Please ensure all necessary preparations are made before the scheduled demo time.</p>
          
          <p>For any internal coordination or questions, please use the team communication channels.</p>
        </div>
        <div class="footer">
          <p>Internal Communication - ISBE Consultancy Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateDemoOwnerEmail;
