const jwt = require("jsonwebtoken");

let users = [];


// SIGNUP
exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      password,
    } = req.body;

    const existingUser = users.find(
      (u) => u.email === email
    );

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const otp = 123456;

    users.push({
      id: users.length + 1,
      name,
      email,
      phone,
      password,

      role: email.includes("vendor")
        ? "vendor"
        : "customer",
    });

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

    res.json({
      message: "Signup successful",
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

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
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