const generateDemoUserEmail = (userData) => {
  const { name, date, time } = userData;

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
          padding: 30px;
        }
        .appointment-details {
          background-color: #f8f9fa;
          border-left: 4px solid #2980b9;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .next-steps {
          background-color: #e8f4f8;
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
        .footer a {
          color: #2980b9;
          text-decoration: none;
        }
        .contact-info {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
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
          
          <p>Thank you for scheduling a demo with ISBE Consultancy. We're excited to show you how our solutions can benefit your business.</p>
          
          <div class="appointment-details">
            <h3 style="margin-top: 0;">Your Demo Appointment Details</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> 45 minutes</p>
          </div>

          <div class="next-steps">
            <h3 style="margin-top: 0;">What to Expect</h3>
            <ul>
              <li>A comprehensive overview of our services</li>
              <li>Live demonstration of our key features</li>
              <li>Q&A session to address your specific needs</li>
              <li>Discussion of customization options</li>
            </ul>
          </div>

          <p>To ensure the best experience during the demo:</p>
          <ul>
            <li>Please ensure you have a stable internet connection</li>
            <li>Have your questions ready</li>
            <li>If possible, share your specific requirements beforehand</li>
          </ul>

          <p>If you need to reschedule or have any questions before the demo, please don't hesitate to contact us.</p>

          <div class="contact-info">
            <p>Best regards,<br>
            ISBE Consultancy Team</p>
            <p>
              <strong>Contact:</strong><br>
              Email: isbecabhishek@gmail.com<br>
              Phone: +91 7503398181
            </p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2024 ISBE Consultancy | <a href="#">Terms & Conditions</a> | <a href="#">Privacy Policy</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateDemoUserEmail;
