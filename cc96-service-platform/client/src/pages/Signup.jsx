import { useState } from "react";
import {
  useAuthModal,
} from "../context/AuthModalContext";

import API from "../services/api";

import {
  successToast,
  errorToast,
} from "../utils/toast";

import {
  
  
} from "react-router-dom";

import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function Signup({ isModal }) {

  const { setMode } =
  useAuthModal();
 
  

  const [showPassword, setShowPassword] =
    useState(false);
    
const [generatedOtp,
  setGeneratedOtp] =
  useState("");
  const [showOtp, setShowOtp] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [otp, setOtp] = useState("");

  const [formData, setFormData] =
    useState({
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

    setLoading(true);

    try {

      const res = await API.post(
        "/auth/signup",
        formData
      );

     successToast(
        "OTP sent successfully"
      );

     setGeneratedOtp(
  res.data.otp
);

      setLoading(false);

      setShowOtp(true);

    } catch (error) {

      setLoading(false);

      toast.error(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  const verifyOtp = async () => {

    setLoading(true);

    try {

      const res = await API.post(
        "/auth/verify-otp",
        {
          email: formData.email,
          otp,
        }
      );

     successToast(
        res.data.message
      );

      setOtp("");

setShowOtp(false);

      setLoading(false);

      setMode("login");

    } catch (error) {

      setLoading(false);

     errorToast(
        error.response?.data?.message ||
        "OTP verification failed"
      );
    }
  };

  return (
  <div
    className={
      isModal
        ? ""
        : `
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-100
        via-white
        to-blue-200
        px-5
      `
    }
  >

    <div
      className={
        isModal
          ? "w-full"
          : `
          bg-white
          p-10
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
        `
      }
    >

      {/* TITLE */}

      <h1
        className="
        text-3xl
        md:text-5xl
        font-bold
        text-center
        text-blue-600
      "
      >
        Create Account
      </h1>

      <p
        className="
        text-center
        text-gray-500
        mt-3
        mb-8
      "
      >
        Signup to book trusted services
      </p>


      {!showOtp ? (

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          {/* NAME */}

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              className="
              w-full
              border
              border-gray-300
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="
              w-full
              border
              border-gray-300
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
              onChange={handleChange}
              required
            />

          </div>


          {/* PHONE */}

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Phone
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              className="
              w-full
              border
              border-gray-300
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                className="
                w-full
                border
                border-gray-300
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                text-xl
              "
              >

                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}

              </button>

            </div>

          </div>


          {/* BUTTON */}

          <button
            disabled={loading}
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition
            text-white
            py-4
            rounded-2xl
            text-lg
            font-semibold
            disabled:opacity-70
          "
          >

            {loading
              ? "Sending OTP..."
              : "Send OTP"}

          </button>

        </form>

      ) : (

        <div className="space-y-5">
<div
  className="
  bg-blue-50
  border
  border-blue-200
  text-blue-700
  p-4
  rounded-2xl
  text-center
  font-semibold
"
>

  Demo OTP for testing:

  <span className="ml-2">
    {generatedOtp}
  </span>

</div>
          <h2
            className="
            text-center
            text-2xl
            font-bold
          "
          >
            Verify OTP
          </h2>

          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            className="
            w-full
            border-2
            border-gray-300
            p-4
            rounded-2xl
            text-center
            text-2xl
            tracking-[10px]
            font-bold
            outline-none
            focus:ring-2
            focus:ring-green-500
          "
            onChange={(e) =>
              setOtp(e.target.value)
            }
          />

          <button
            disabled={loading}
            onClick={verifyOtp}
            className="
            w-full
            bg-green-600
            hover:bg-green-700
            transition
            text-white
            py-4
            rounded-2xl
            text-lg
            font-semibold
            disabled:opacity-70
          "
          >

            {loading
              ? "Verifying..."
              : "Verify OTP"}

          </button>

        </div>

      )}

    </div>

  </div>
);
}

export default Signup;