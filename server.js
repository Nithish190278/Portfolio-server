const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// 📧 Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // If using Gmail
  auth: {
    user: process.env.EMAIL, // Your email from .env file
    pass: process.env.PASSWORD, // Your app password from .env
  },
});

// 📩 Email Sending API
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL, // Your email
    to: "nithishkumarpalla@gmail.com", // Change to the email where you want to receive messages
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Email sending failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
