import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

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
    <div className="bg-white shadow-md px-10 py-5 flex justify-between items-center">

      {/* LOGO */}
      <Link to="/">
        <h1 className="text-3xl font-bold text-blue-600">
          ServiceHub
        </h1>
      </Link>

      {/* MIDDLE NAV LINKS */}
      <div className="flex items-center gap-8">

        <Link
          to="/"
          className="text-lg font-semibold hover:text-blue-600 transition"
        >
          Home
        </Link>

        {user && (
          <Link
            to="/customer/dashboard"
            className="text-lg font-semibold hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {!user ? (
          <>
            <Link to="/login">
              <button className="bg-black text-white px-5 py-2 rounded-xl">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
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
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;