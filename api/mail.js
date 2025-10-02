require('dotenv').config();
const nodemailer = require('nodemailer');
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

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
    res.status(200).send({ message: "✅ Message sent! Confirmation email sent too." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "❌ Something went wrong." });
  }
};

/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors({
  origin: "https://josephinemwende.github.io"
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..")));
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;
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

    res.send("✅ Message sent! You will also receive a confirmation email.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("❌ Something went wrong.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

*/


/*function sendConfirmation(name, email) {
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation Email",
    text: `Hello ${name},\n\nThank you for reaching out! I have received your message and will get back to you shortly.\n\nBest regards,\nJosephine Mwenswa`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}*/