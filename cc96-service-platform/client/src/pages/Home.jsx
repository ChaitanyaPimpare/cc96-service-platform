import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

import API from "../services/api";

function Home() {

  const [services, setServices] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
      return toast.error("Please login first");
    }

    try {

      const res = await API.post(
        "/bookings",
        {
          customerId: user.id,
          serviceId,
        }
      );

      toast.success(res.data.message);

    } catch (error) {

      toast.error("Booking failed");
    }
  };

  return (
    <div>

      {/* HERO SECTION */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">

        <h1 className="text-6xl font-bold mb-4">
          Book Trusted Services
        </h1>

        <p className="text-xl">
          Fast • Reliable • Professional
        </p>

        <div className="mt-8 flex justify-center gap-4">

         <div className="mt-8 flex justify-center">

  {user && (
    <Link to="/customer/dashboard">
      <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
        Dashboard
      </button>
    </Link>
  )}

</div>

        </div>
      </div>


      {/* SERVICES */}

      <div className="p-10">

        <h2 className="text-4xl font-bold mb-10 text-center">
          Popular Services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service) => (

            <motion.div
              whileHover={{ scale: 1.05 }}
              key={service.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >

              <img
                src={service.image}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {service.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mt-5">

                  <h3 className="text-2xl font-bold text-blue-600">
                    ₹{service.price}
                  </h3>

                  <button
                    onClick={() =>
                      bookService(service.id)
                    }
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                  >
                    Book
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Home;