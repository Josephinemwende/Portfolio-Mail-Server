require('dotenv').config();
const nodemailer = require("nodemailer");

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://josephinemwende.github.io",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async (event, context) => {
  // ✅ Handle preflight (CORS)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "OK"
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const adminMail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Message from Portfolio Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  const confirmationMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation Email",
    text: `Hello ${name},\n\nThank you for reaching out! I have received your message and will get back to you shortly.\n\nBest regards,\nJosephine Mwenswa`
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(confirmationMail);

    return {
      statusCode: 200,
      headers: corHeaders,
      body: JSON.stringify({
      status: "success",
      title: "Message Sent 🎉",
      message: `Thank you, ${name}! Your message has been sent successfully. A confirmation email has been sent to ${email}.`
    })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
      status: "error",
      title: "Message Failed",
      message: error.message
    })
    };
  }
};
