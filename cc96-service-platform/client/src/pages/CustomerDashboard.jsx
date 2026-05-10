import { useEffect, useState } from "react";

import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

import API from "../services/api";

function CustomerDashboard() {

  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await API.get(
        `/bookings/customer/${user.id}`
      );

      setBookings(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-gray-100
      to-blue-100
    "
    >

      {/* <Navbar /> */}

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          My Bookings
        </h1>


        {/* STATS */}

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          mb-12
        "
        >

          <div
            className="
            bg-white
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            <FaClipboardList className="text-5xl text-blue-600" />

            <h2 className="text-4xl font-bold mt-5">
              {bookings.length}
            </h2>

            <p className="text-gray-500 mt-2">
              Total Bookings
            </p>

          </div>


          <div
            className="
            bg-yellow-100
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            <FaClock className="text-5xl text-yellow-600" />

            <h2 className="text-4xl font-bold mt-5">

              {
                bookings.filter(
                  (b) =>
                    b.status === "pending"
                ).length
              }

            </h2>

            <p className="text-gray-600 mt-2">
              Pending Services
            </p>

          </div>


          <div
            className="
            bg-green-100
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            <FaCheckCircle className="text-5xl text-green-600" />

            <h2 className="text-4xl font-bold mt-5">

              {
                bookings.filter(
                  (b) =>
                    b.status === "delivered"
                ).length
              }

            </h2>

            <p className="text-gray-600 mt-2">
              Completed Services
            </p>

          </div>

        </div>


        {/* EMPTY STATE */}

        {bookings.length === 0 && (

          <div
            className="
            bg-white
            p-12
            rounded-3xl
            shadow-lg
            text-center
          "
          >

            <h2 className="text-3xl font-bold">
              No bookings yet
            </h2>

            <p className="text-gray-500 mt-3">
              Book your first service now.
            </p>

          </div>
        )}


        {/* BOOKINGS */}

        <div className="grid gap-8">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="
              bg-white
              rounded-3xl
              shadow-xl
              overflow-hidden
              flex
              flex-col
              md:flex-row
            "
            >

              <img
                src={booking.Service?.image}
                className="
                w-full
                md:w-72
                h-60
                object-cover
              "
              />

              <div
                className="
                flex-1
                p-8
                flex
                justify-between
                items-center
                flex-wrap
                gap-5
              "
              >

                <div>

                  <h2 className="text-3xl font-bold">
                    {booking.Service?.title}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    {booking.Service?.description}
                  </p>

                  <p className="mt-4 text-gray-400">
                    Booking ID:
                    #{booking.id}
                  </p>

                </div>


                {/* STATUS */}

                <div>

                  <span
                    className={`
                    px-6
                    py-3
                    rounded-full
                    text-white
                    font-semibold
                    text-lg

                    ${booking.status === "pending"
                      ? "bg-yellow-500"
                      : booking.status === "accepted"
                      ? "bg-blue-600"
                      : "bg-green-600"}
                  `}
                  >
                    {booking.status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;