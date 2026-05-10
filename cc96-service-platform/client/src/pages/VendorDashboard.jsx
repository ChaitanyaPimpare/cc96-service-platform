import { useEffect, useState } from "react";

import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import API from "../services/api";

function VendorDashboard() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await API.get(
        "/bookings/vendor"
      );

      setBookings(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const acceptBooking = async (id) => {

    try {

      const res = await API.put(
        `/bookings/${id}/accept`
      );

      toast.success(res.data.message);

      fetchBookings();

    } catch (error) {

      toast.error("Failed");
    }
  };

  const deliverBooking = async (id) => {

    try {

      const res = await API.put(
        `/bookings/${id}/deliver`
      );

      toast.success(res.data.message);

      fetchBookings();

    } catch (error) {

      toast.error("Failed");
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-gray-100
      to-green-100
    "
    >

      {/* <Navbar /> */}

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          Vendor Dashboard
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
              Total Orders
            </p>

          </div>


          <div
            className="
            bg-blue-100
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            <FaClock className="text-5xl text-blue-600" />

            <h2 className="text-4xl font-bold mt-5">

              {
                bookings.filter(
                  (b) =>
                    b.status === "accepted"
                ).length
              }

            </h2>

            <p className="text-gray-600 mt-2">
              Accepted
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
              Delivered
            </p>

          </div>

        </div>


        {/* EMPTY */}

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
              No orders yet
            </h2>

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
                    Order ID:
                    #{booking.id}
                  </p>

                </div>


                {/* ACTIONS */}

                <div className="flex gap-4 flex-wrap">

                  {booking.status === "pending" && (
                    <button
                      onClick={() =>
                        acceptBooking(
                          booking.id
                        )
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
                    "
                    >
                      Accept
                    </button>
                  )}


                  {booking.status === "accepted" && (
                    <button
                      onClick={() =>
                        deliverBooking(
                          booking.id
                        )
                      }
                      className="
                      bg-green-600
                      hover:bg-green-700
                      transition
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                    "
                    >
                      Deliver
                    </button>
                  )}


                  {booking.status === "delivered" && (

                    <span
                      className="
                      bg-green-100
                      text-green-700
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                    "
                    >
                      Delivered
                    </span>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default VendorDashboard;