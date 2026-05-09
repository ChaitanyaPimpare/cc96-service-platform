const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "CC96 OTP Verification",

    html: `
      <h2>Your OTP is:</h2>
      <h1>${otp}</h1>
    `,
  });
};

module.exports = sendOtp;