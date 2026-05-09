const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const otpStore = require("../utils/otpStore");
const sendOtp = require("../utils/sendOtp");


// SEND OTP
exports.signup = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      password,
    } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    otpStore[email] = {
      otp,
      userData: {
        name,
        email,
        phone,
        password,
      },
    };

    // await sendOtp(email, otp);

   res.json({
  message: "OTP sent successfully",
  otp,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const storedData = otpStore[email];

    if (!storedData) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (storedData.otp != otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        storedData.userData.password,
        10
      );

    const user = await User.create({
      ...storedData.userData,
      password: hashedPassword,
      isVerified: true,
    });

    delete otpStore[email];

    res.json({
      message: "Signup successful",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};