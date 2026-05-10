function Footer() {

  return (
    <footer
      className="
      bg-[#0B1120]
      text-white
      mt-24
    "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-10
        py-16
        grid
        md:grid-cols-4
        gap-12
      "
      >

        {/* BRAND */}

        <div>

          <h1
            className="
            text-4xl
            font-bold
            text-blue-500
          "
          >
            ServiceHub
          </h1>

          <p
            className="
            text-gray-400
            mt-5
            leading-7
          "
          >
            Trusted platform for booking
            professional home services
            quickly and securely.
          </p>

        </div>


        {/* COMPANY */}

        <div>

          <h2
            className="
            text-2xl
            font-semibold
            mb-5
          "
          >
            Company
          </h2>

          <div className="space-y-3 text-gray-400">

            <p className="hover:text-white transition cursor-pointer">
              About Us
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Careers
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Blog
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Contact
            </p>

          </div>

        </div>


        {/* SERVICES */}

        <div>

          <h2
            className="
            text-2xl
            font-semibold
            mb-5
          "
          >
            Services
          </h2>

          <div className="space-y-3 text-gray-400">

            <p className="hover:text-white transition cursor-pointer">
              Home Cleaning
            </p>

            <p className="hover:text-white transition cursor-pointer">
              AC Repair
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Plumbing
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Electrician
            </p>

          </div>

        </div>


        {/* SUPPORT */}

        <div>

          <h2
            className="
            text-2xl
            font-semibold
            mb-5
          "
          >
            Support
          </h2>

          <div className="space-y-3 text-gray-400">

            <p className="hover:text-white transition cursor-pointer">
              Help Center
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Customer Support
            </p>

          </div>

        </div>

      </div>


      {/* BOTTOM */}

      <div
        className="
        border-t
        border-gray-800
        py-6
        text-center
        text-gray-500
      "
      >

        © 2026 ServiceHub.
        All rights reserved.

      </div>

    </footer>
  );
}

export default Footer;