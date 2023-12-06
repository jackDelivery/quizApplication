const nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: process.env.host,
    service: process.env.service,
    secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  })
);


async function sendVerificationEmail(email, token, userName) {
  const mailOptions = {
    from: `"Quiz & Ebooks" ${process.env.user}"`,
    to: email,
    subject: 'Email Verification',
    html: `<!DOCTYPE html>
      <html>
      
      <head>
          <title>Email Verification</title> <!-- The title tag shows in email notifications, like Android 4.4. -->
      
          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
      
          <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #4CAF50;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
          }
          h1 {
            color: #fff;
          }
          p {
            color: #fff;
          }
          .button {
            display: inline-block;
            padding: 10px;
            background-color: #fff;
            color: #4CAF50;
            text-decoration: none;
            border-radius: 3px;
            font-size: 1.2rem;
            letter-spacing: 3px;
          }
        </style>
         
      </head>
      
      <body>
      <div class="container">
      <h1>Welcome to Quiz & Ebooks - Verify Your Email!</h1>
        <p>Hi ${userName},</p>
        <p>Congratulations on joining Quiz & Ebooks! 🎉 We're thrilled to have you as a part of our community.</p>
        <p>To complete your registration, please check your email:</p>
        <p>Or copy and paste the following code into the app:</p>
        <p class="button">Verification Code: ${token}</p>
        <p>Thank you for choosing Quiz & Ebooks. We can't wait for you to explore all the amazing features we have to offer!</p>  
        <br/>
        <br/>
        <br/>
        <br/>
        <p>Happy exploring,</p>
        <p>The Quiz & Ebooks Team</p>
      </div>
    </body>
      
      </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}


module.exports = { sendVerificationEmail }