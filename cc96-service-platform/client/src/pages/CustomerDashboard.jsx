import { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        My Bookings
      </h1>

      <div className="grid gap-6">
{bookings.length === 0 && (
  <div className="bg-white p-10 rounded-2xl text-center shadow-lg">

    <h2 className="text-2xl font-bold">
      No bookings yet
    </h2>

  </div>
)}
        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">
                {booking.Service?.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {booking.Service?.description}
              </p>

            </div>

            <div>

              <span
                className={`
                px-4 py-2 rounded-xl text-white font-semibold

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

        ))}

      </div>
    </div>
  );
}

export default CustomerDashboard;