import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthModalContext =
  createContext();

export const AuthModalProvider = ({
  children,
}) => {

  const [open, setOpen] =
    useState(false);

  const [mode, setMode] =
    useState("login");


  /* OPEN LOGIN */

  const openLogin = () => {

    setMode("login");

    setOpen(true);
  };


  /* OPEN SIGNUP */

  const openSignup = () => {

    setMode("signup");

    setOpen(true);
  };


  /* CLOSE MODAL */

  const closeModal = () => {

    setOpen(false);
  };


  /* BODY SCROLL CONTROL */

  useEffect(() => {

    if (open) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [open]);


  return (
    <AuthModalContext.Provider
      value={{
        open,
        mode,
        setMode,
        openLogin,
        openSignup,
        closeModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};


export const useAuthModal = () =>
  useContext(AuthModalContext);