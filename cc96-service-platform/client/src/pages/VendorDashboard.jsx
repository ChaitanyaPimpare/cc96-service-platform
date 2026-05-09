import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Vendor Dashboard
      </h1>

      <div className="grid gap-6">
{bookings.length === 0 && (
  <div className="bg-white p-10 rounded-2xl text-center shadow-lg">

    <h2 className="text-2xl font-bold">
      No bookings available
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
                Status: {booking.status}
              </p>

            </div>

            <div className="flex gap-3">

              {booking.status === "pending" && (
                <button
                  onClick={() =>
                    acceptBooking(booking.id)
                  }
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  Accept
                </button>
              )}

              {booking.status === "accepted" && (
                <button
                  onClick={() =>
                    deliverBooking(booking.id)
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded-xl"
                >
                  Deliver
                </button>
              )}

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default VendorDashboard;