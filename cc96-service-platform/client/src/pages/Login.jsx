import { useState } from "react";

import API from "../services/api";

import {
  successToast,
  errorToast,
} from "../utils/toast";

import { useNavigate } from "react-router-dom";

import {
  useAuthModal,
} from "../context/AuthModalContext";

import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function Login({ isModal })  {
const { closeModal } =
  useAuthModal();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const res = await API.post(
      "/auth/login",
      formData
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    successToast(
      "Login successful"
    );

    closeModal();

    navigate("/");

  } catch (error) {

    console.log(error);

    errorToast(
      error.response?.data?.message ||
      "Login failed"
    );

  } finally {

    setLoading(false);
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
        Welcome Back
      </h1>

      <p
        className="
        text-center
        text-gray-500
        mt-3
        mb-8
      "
      >
        Login to continue booking services
      </p>


      {/* FORM */}

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

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
            ? "Logging in..."
            : "Login"}

        </button>

      </form>

    </div>

  </div>
);
}

export default Login;