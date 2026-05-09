import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {

  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/signup",
        formData
      );

      toast.success(res.data.message);

      console.log("OTP:", res.data.otp);

      setShowOtp(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  const verifyOtp = async () => {

    try {

      const res = await API.post(
        "/auth/verify-otp",
        {
          email: formData.email,
          otp,
        }
      );

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "OTP verification failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Create Account
        </h1>

        {!showOtp ? (

          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border p-4 rounded-xl"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-4 rounded-xl"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full border p-4 rounded-xl"
              onChange={handleChange}
            />

             {/* PASSWORD FIELD */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
            >
              {showPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>

          </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold">
              Send OTP
            </button>

          </form>

        ) : (

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-4 rounded-xl"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold"
            >
              Verify OTP
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Signup;