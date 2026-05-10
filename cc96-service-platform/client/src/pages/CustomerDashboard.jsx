import { useEffect, useState } from "react";

import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import API from "../services/api";

function CustomerDashboard() {

  const [bookings, setBookings] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

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


  /* FILTER BOOKINGS */

  const filteredBookings =
    bookings.filter((booking) => {

      const matchesFilter =
        filter === "all"
          ? true
          : booking.status === filter;

      const matchesSearch =
        booking.Service?.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );
    });


  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-gray-100
      to-blue-100
    "
    >

      <div className="p-5 md:p-10">

        {/* TITLE */}

        <h1
          className="
          text-4xl
          md:text-5xl
          font-bold
          mb-10
        "
        >
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

          {/* TOTAL */}

          <div
            className="
            bg-white
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            <FaClipboardList
              className="
              text-5xl
              text-blue-600
            "
            />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
            "
            >
              {bookings.length}
            </h2>

            <p className="text-gray-500 mt-2">
              Total Bookings
            </p>

          </div>


          {/* PENDING */}

          <div
            className="
            bg-yellow-100
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            <FaClock
              className="
              text-5xl
              text-yellow-600
            "
            />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
            "
            >

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


          {/* DELIVERED */}

          <div
            className="
            bg-green-100
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            <FaCheckCircle
              className="
              text-5xl
              text-green-600
            "
            />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
            "
            >

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


        {/* FILTERS */}

        <div
          className="
          flex
          flex-col
          lg:flex-row
          gap-5
          justify-between
          items-center
          mb-10
        "
        >

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            lg:w-80
            bg-white
            border
            border-gray-300
            px-5
            py-3
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          />


          {/* FILTER BUTTONS */}

          <div
            className="
            flex
            gap-3
            flex-wrap
          "
          >

            <button
              onClick={() =>
                setFilter("all")
              }
              className={`
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition

                ${
                  filter === "all"
                    ? "bg-black text-white"
                    : "bg-white"
                }
              `}
            >
              All
            </button>


            <button
              onClick={() =>
                setFilter("pending")
              }
              className={`
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition

                ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-white"
                }
              `}
            >
              Pending
            </button>


            <button
              onClick={() =>
                setFilter("accepted")
              }
              className={`
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition

                ${
                  filter === "accepted"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }
              `}
            >
              Accepted
            </button>


            <button
              onClick={() =>
                setFilter("delivered")
              }
              className={`
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition

                ${
                  filter === "delivered"
                    ? "bg-green-600 text-white"
                    : "bg-white"
                }
              `}
            >
              Delivered
            </button>

          </div>

        </div>


        {/* EMPTY STATE */}

        {filteredBookings.length === 0 && (

          <div
            className="
            bg-white
            p-12
            rounded-3xl
            shadow-lg
            text-center
          "
          >

            <h2
              className="
              text-3xl
              font-bold
            "
            >
              No bookings found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing filters or
              book a new service.
            </p>

          </div>

        )}


        {/* BOOKINGS */}

        <div className="grid gap-8">

          {filteredBookings.map(
            (booking) => (

              <div
                key={booking.id}
                className="
                bg-white
                rounded-3xl
                shadow-xl
                overflow-hidden
                flex
                flex-col
                lg:flex-row
              "
              >

                <img
                  src={
                    booking.Service?.image
                  }
                  className="
                  w-full
                  lg:w-72
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

                    <h2
                      className="
                      text-3xl
                      font-bold
                    "
                    >
                      {
                        booking.Service
                          ?.title
                      }
                    </h2>

                    <p
                      className="
                      text-gray-500
                      mt-3
                    "
                    >
                      {
                        booking.Service
                          ?.description
                      }
                    </p>

                    <p
                      className="
                      mt-4
                      text-gray-400
                    "
                    >
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

                        ${
                          booking.status ===
                          "pending"
                            ? "bg-yellow-500"
                            : booking.status ===
                              "accepted"
                            ? "bg-blue-600"
                            : "bg-green-600"
                        }
                      `}
                    >
                      {booking.status}
                    </span>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;