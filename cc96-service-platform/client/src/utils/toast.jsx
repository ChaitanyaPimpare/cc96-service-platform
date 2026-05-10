import toast from "react-hot-toast";


export const successToast = (
  message
) => {

  toast.success(
    (t) => (

      <div
        className="
        flex
        items-center
        justify-between
        gap-4
        min-w-[250px]
      "
      >

        <span>
          {message}
        </span>

        <button
          onClick={() =>
            toast.dismiss(t.id)
          }
          className="
          text-gray-400
          hover:text-black
          transition
          text-xl
          font-bold
        "
        >
          ×
        </button>

      </div>

    ),
    {
      duration: 4000,
    }
  );
};


export const errorToast = (
  message
) => {

  toast.error(
    (t) => (

      <div
        className="
        flex
        items-center
        justify-between
        gap-4
        min-w-[250px]
      "
      >

        <span>
          {message}
        </span>

        <button
          onClick={() =>
            toast.dismiss(t.id)
          }
          className="
          text-gray-400
          hover:text-black
          transition
          text-xl
          font-bold
        "
        >
          ×
        </button>

      </div>

    ),
    {
      duration: 4000,
    }
  );
};