import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  useAuthModal,
} from "../context/AuthModalContext";
import { useState } from "react";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

function Navbar() {
const {
  openLogin,
  openSignup,
} = useAuthModal();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();
  };

  return (
    <div
      className="
      sticky
      top-0
      z-50
      bg-white/90
      backdrop-blur-md
      shadow-md
    "
    >

      <div
        className="
        px-6
        md:px-10
        py-5
        flex
        justify-between
        items-center
      "
      >

        {/* LOGO */}

        <Link to="/">

          <h1
            className="
            text-3xl
            font-bold
            text-blue-600
          "
          >
            ServiceHub
          </h1>

        </Link>


        {/* DESKTOP MENU */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-8
        "
        >

          <Link
            to="/"
            className="
            text-lg
            font-semibold
            hover:text-blue-600
            transition
          "
          >
            Home
          </Link>


          {user && (

            <Link
              to={
                user.role === "vendor"
                  ? "/vendor/dashboard"
                  : "/customer/dashboard"
              }
              className="
              text-lg
              font-semibold
              hover:text-blue-600
              transition
            "
            >
              Dashboard
            </Link>

          )}

        </div>


        {/* DESKTOP RIGHT */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-5
        "
        >

          {!user ? (
            <>

              <Link to="/login">

                <button
  onClick={openLogin}
  className="
  bg-black
  hover:bg-gray-800
  transition
  text-white
  px-5
  py-2
  rounded-xl
"
>
  Login
</button>

              </Link>


              <Link to="/signup">

              <button
  onClick={openSignup}
  className="
  bg-blue-600
  hover:bg-blue-700
  transition
  text-white
  px-5
  py-2
  rounded-xl
"
>
  Signup
</button>

              </Link>

            </>
          ) : (
            <>

              <p className="font-semibold">
                {user.name}
              </p>

              <button
                onClick={logout}
                className="
                bg-red-500
                hover:bg-red-600
                transition
                text-white
                px-5
                py-2
                rounded-xl
              "
              >
                Logout
              </button>

            </>
          )}

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="
          md:hidden
          text-3xl
        "
        >

          {menuOpen ? (
            <FiX />
          ) : (
            <FiMenu />
          )}

        </button>

      </div>


      {/* MOBILE MENU */}

      {menuOpen && (

        <div
          className="
          md:hidden
          bg-white
          border-t
          px-6
          py-6
          space-y-5
        "
        >

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
            className="
            block
            text-lg
            font-semibold
          "
          >
            Home
          </Link>


          {user && (

            <Link
              to={
                user.role === "vendor"
                  ? "/vendor/dashboard"
                  : "/customer/dashboard"
              }
              onClick={() =>
                setMenuOpen(false)
              }
              className="
              block
              text-lg
              font-semibold
            "
            >
              Dashboard
            </Link>

          )}


          {!user ? (
            <div className="space-y-4">

              <Link
                to="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

             <button
  onClick={() => {

    openLogin();

    setMenuOpen(false);
  }}
  className="
  w-full
  bg-black
  text-white
  py-3
  rounded-xl
"
>
  Login
</button>

              </Link>


              <Link
                to="/signup"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

             <button
  onClick={() => {

    openSignup();

    setMenuOpen(false);
  }}
  className="
  w-full
  bg-blue-600
  text-white
  py-3
  rounded-xl
"
>
  Signup
</button>

              </Link>

            </div>
          ) : (
            <div className="space-y-4">

              <p className="font-semibold">
                {user.name}
              </p>

              <button
                onClick={logout}
                className="
                w-full
                bg-red-500
                text-white
                py-3
                rounded-xl
              "
              >
                Logout
              </button>

            </div>
          )}

        </div>

      )}

    </div>
  );
}

export default Navbar;