import {
  createContext,
  useContext,
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

  const openLogin = () => {

    setMode("login");

    setOpen(true);
  };

  const openSignup = () => {

    setMode("signup");

    setOpen(true);
  };

  const closeModal = () => {

    setOpen(false);
  };

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