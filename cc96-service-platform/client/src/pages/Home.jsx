import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  successToast,
  errorToast,
} from "../utils/toast";
import Footer from "../components/Footer";
import TutorialModal from "../components/TutorialModal";

import {
  FaStar,
  FaSearch,
  FaUsers,
  FaTools,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

import API from "../services/api";

function Home() {

  const [services, setServices] = useState([]);

 const [user, setUser] =
  useState(null);

useEffect(() => {

  const updateUser = () => {

    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    setUser(storedUser);
  };

  updateUser();

  window.addEventListener(
    "storage",
    updateUser
  );

  return () => {

    window.removeEventListener(
      "storage",
      updateUser
    );
  };

}, []);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {

    try {

      const res = await API.get("/services");

      setServices(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const bookService = async (serviceId) => {

    if (!user) {
      return errorToast("Please login first");
    }

    try {

      const res = await API.post(
        "/bookings",
        {
          customerId: user.id,
          serviceId,
        }
      );

      successToast(res.data.message);

    } catch (error) {

      errorToast("Booking failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
<TutorialModal />
      {/* <Navbar /> */}

      {/* HERO SECTION */}

      <div
        className="
        relative
        h-[90vh]
        bg-cover
        bg-center
        flex
        items-center
        justify-center
      "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a')",
        }}
      >

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 text-center text-white px-5">

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
          "
          >
            Book Trusted <br />
            Home Services
          </motion.h1>

          <p className="mt-6 text-xl text-gray-200">
            Fast • Reliable • Professional
          </p>


          {/* SEARCH BAR */}

          <div
            className="
            mt-10
            bg-white
            rounded-2xl
            p-3
            flex
            items-center
            gap-3
            max-w-2xl
            mx-auto
            shadow-2xl
          "
          >

            <FaSearch className="text-gray-500 text-xl ml-3" />

            <input
              type="text"
              placeholder="Search services..."
              className="
              flex-1
              outline-none
              text-black
              text-lg
              px-2
            "
            />

            <button
              className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
            "
            >
              Search
            </button>

          </div>


          {/* BUTTONS */}

          <div className="mt-8 flex justify-center gap-4 flex-wrap">

           {user && (
  <Link
    to={
      user.role === "vendor"
        ? "/vendor/dashboard"
        : "/customer/dashboard"
    }
  >
    <button
      className="
      bg-white
      text-blue-600
      px-8
      py-3
      rounded-xl
      font-semibold
      hover:scale-105
      transition
    "
    >
      Dashboard
    </button>
  </Link>
)}
</div>

        </div>
      </div>


      {/* STATS SECTION */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        px-10
        py-16
      "
      >

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          text-center
        "
        >

          <FaUsers className="text-5xl text-blue-600 mx-auto" />

          <h1 className="text-4xl font-bold mt-5">
            10K+
          </h1>

          <p className="text-gray-500 mt-2">
            Happy Customers
          </p>

        </motion.div>


        <motion.div
          whileHover={{ scale: 1.03 }}
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          text-center
        "
        >

          <FaTools className="text-5xl text-green-600 mx-auto" />

          <h1 className="text-4xl font-bold mt-5">
            500+
          </h1>

          <p className="text-gray-500 mt-2">
            Verified Vendors
          </p>

        </motion.div>


        <motion.div
          whileHover={{ scale: 1.03 }}
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          text-center
        "
        >

          <FaClock className="text-5xl text-orange-500 mx-auto" />

          <h1 className="text-4xl font-bold mt-5">
            24/7
          </h1>

          <p className="text-gray-500 mt-2">
            Customer Support
          </p>

        </motion.div>

      </div>


    {/* SERVICES SECTION */}

<div className="px-10 py-10">

  <h1
    className="
    text-5xl
    font-bold
    text-center
    mb-14
  "
  >
    Popular Services
  </h1>

  <div
    className="
    grid
    sm:grid-cols-2
    lg:grid-cols-4
    gap-10
  "
  >

    {services.map((service) => (

      <motion.div
        whileHover={{ scale: 1.04 }}
        key={service.id}
        className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-xl
        flex
        flex-col
      "
      >

        {/* IMAGE */}

        <img
          src={service.image}
          className="
          h-60
          w-full
          object-cover
        "
        />


        {/* CONTENT */}

        <div
          className="
          p-6
          flex
          flex-col
          flex-1
        "
        >

          {/* STARS */}

          <div className="flex items-center gap-1">

            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />

          </div>


          {/* TITLE */}

          <h2
            className="
            text-2xl
            font-bold
            mt-3
          "
          >
            {service.title}
          </h2>


          {/* DESCRIPTION */}

          <p
            className="
            text-gray-500
            mt-2
            min-h-[64px]
          "
          >
            {service.description}
          </p>


          {/* PRICE + BUTTON */}

          <div
            className="
            flex
            justify-between
            items-center
            mt-auto
            pt-6
          "
          >

            <h3
              className="
              text-3xl
              font-bold
              text-blue-600
            "
            >
              ₹{service.price}
            </h3>

          {(!user ||
  user.role === "customer") ? (

  <button
    onClick={() =>
      bookService(service.id)
    }
    className="
    bg-blue-600
    hover:bg-blue-700
    transition
    text-white
    px-6
    py-3
    rounded-xl
    font-semibold
    shadow-md
  "
  >
    Book
  </button>

) : (

 <span
  className="
  bg-gray-200
  text-gray-700
  w-40
  h-14
  flex
  items-center
  justify-center
  rounded-xl
  font-semibold
  text-lg
"
>
  Vendor View
</span>

)}
          </div>

        </div>

      </motion.div>

    ))}

  </div>

</div>
      {/* FOOTER */}
<Footer />

    </div>
  );
}

export default Home;