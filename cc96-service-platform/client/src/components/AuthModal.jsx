import {
  useAuthModal,
} from "../context/AuthModalContext";

import Login from "../pages/Login";

import Signup from "../pages/Signup";

function AuthModal() {

  const {
    open,
    closeModal,
    mode,
    setMode,
  } = useAuthModal();

  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/60
      z-50
      flex
      items-center
      justify-center
      px-4
    "
    >

      <div
        className="
        bg-white
        rounded-3xl
        w-full
        max-w-5xl
        overflow-hidden
        relative
        shadow-2xl
        grid
        md:grid-cols-2
      "
      >

        {/* LEFT IMAGE */}

        <div
          className="
          hidden
          md:flex
          items-center
          justify-center
          bg-blue-100
        "
        >

          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
            className="
            h-full
            w-full
            object-cover
          "
          />

        </div>


        {/* RIGHT */}

        <div
          className="
          relative
          p-6
          md:p-10
          max-h-[90vh]
          overflow-y-auto
        "
        >

          {/* CLOSE */}

          <button
            onClick={closeModal}
            className="
            absolute
            top-4
            right-5
            text-3xl
            text-gray-400
          "
          >
            ×
          </button>


          {/* TABS */}

          <div
            className="
            flex
            bg-gray-100
            rounded-full
            p-1
            mb-8
          "
          >

            <button
              onClick={() =>
                setMode("login")
              }
              className={`
                flex-1
                py-3
                rounded-full
                font-semibold
                transition
                ${
                  mode === "login"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }
              `}
            >
              Login
            </button>

            <button
              onClick={() =>
                setMode("signup")
              }
              className={`
                flex-1
                py-3
                rounded-full
                font-semibold
                transition
                ${
                  mode === "signup"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }
              `}
            >
              Signup
            </button>

          </div>


          {/* CONTENT */}

          {mode === "login" ? (
            <Login isModal />
          ) : (
            <Signup isModal />
          )}

        </div>

      </div>

    </div>
  );
}

export default AuthModal;