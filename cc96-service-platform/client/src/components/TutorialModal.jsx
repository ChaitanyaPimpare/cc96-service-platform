import { useEffect, useState } from "react";

import {
  FaUser,
  FaTools,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";

function TutorialModal() {

  const [open, setOpen] =
    useState(false);

  useEffect(() => {

    const shown =
      localStorage.getItem(
        "tutorialShown"
      );

    if (!shown) {

      setOpen(true);
    }

  }, []);

  const closeTutorial = () => {

    localStorage.setItem(
      "tutorialShown",
      "true"
    );

    setOpen(false);
  };

  const openTutorial = () => {

    setOpen(true);
  };

  return (
    <>
      {/* HELP BUTTON */}

      <button
        onClick={openTutorial}
        className="
        fixed
        bottom-5
        right-5
        z-40
        bg-blue-600
        hover:bg-blue-700
        transition
        text-white
        p-4
        rounded-full
        shadow-2xl
        text-xl
      "
      >

        <FaQuestionCircle />

      </button>


      {/* MODAL */}

      {open && (

        <div
          className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-50
          px-4
        "
        >

          <div
            className="
            bg-white
            rounded-3xl
            max-w-xl
            w-full
            p-6
            md:p-8
            shadow-2xl
            relative
            max-h-[90vh]
            overflow-y-auto
          "
          >

            {/* CLOSE BUTTON */}

            <button
              onClick={closeTutorial}
              className="
              absolute
              top-4
              right-5
              text-3xl
              text-gray-400
              hover:text-black
            "
            >
              ×
            </button>


            {/* TITLE */}

            <h1
              className="
              text-2xl
              md:text-4xl
              font-bold
              text-center
              text-blue-600
            "
            >
              Welcome to ServiceHub
            </h1>

            <p
              className="
              text-center
              text-gray-500
              mt-3
              text-sm
              md:text-base
            "
            >
              Here’s how to use the platform
            </p>


            {/* STEPS */}

            <div className="mt-8 space-y-4">

              {/* CUSTOMER */}

              <div
                className="
                flex
                gap-4
                bg-blue-50
                p-4
                rounded-2xl
              "
              >

                <FaUser
                  className="
                  text-3xl
                  text-blue-600
                  mt-1
                "
                />

                <div>

                  <h2
                    className="
                    text-xl
                    md:text-2xl
                    font-bold
                  "
                  >
                    Customer Flow
                  </h2>

                  <p
                    className="
                    text-gray-600
                    mt-2
                    text-sm
                    md:text-base
                    leading-7
                  "
                  >
                    Signup/Login →
                    Browse Services →
                    Book Service →
                    Track Status
                  </p>

                </div>

              </div>


              {/* VENDOR */}

              <div
                className="
                flex
                gap-4
                bg-green-50
                p-4
                rounded-2xl
              "
              >

                <FaTools
                  className="
                  text-3xl
                  text-green-600
                  mt-1
                "
                />

                <div>

                  <h2
                    className="
                    text-xl
                    md:text-2xl
                    font-bold
                  "
                  >
                    Vendor Flow
                  </h2>

                  <p
                    className="
                    text-gray-600
                    mt-2
                    text-sm
                    md:text-base
                    leading-7
                  "
                  >
                    Login as Vendor →
                    Accept Booking →
                    Deliver Service
                  </p>

                </div>

              </div>


              {/* STATUS */}

              <div
                className="
                flex
                gap-4
                bg-yellow-50
                p-4
                rounded-2xl
              "
              >

                <FaCheckCircle
                  className="
                  text-3xl
                  text-yellow-500
                  mt-1
                "
                />

                <div>

                  <h2
                    className="
                    text-xl
                    md:text-2xl
                    font-bold
                  "
                  >
                    Booking Status
                  </h2>

                  <p
                    className="
                    text-gray-600
                    mt-2
                    text-sm
                    md:text-base
                    leading-7
                  "
                  >
                    Pending →
                    Accepted →
                    Delivered
                  </p>

                </div>

              </div>

            </div>


            {/* BUTTON */}

            <button
              onClick={closeTutorial}
              className="
              w-full
              mt-8
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              py-3
              rounded-2xl
              text-lg
              font-semibold
            "
            >
              Got It
            </button>

          </div>

        </div>

      )}

    </>
  );
}

export default TutorialModal;