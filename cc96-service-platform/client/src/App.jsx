import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";

import CustomerDashboard from "./pages/CustomerDashboard";

import VendorDashboard from "./pages/VendorDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";

import AuthModal from "./components/AuthModal";

import {
  AuthModalProvider,
} from "./context/AuthModalContext";

function App() {

  return (
    <BrowserRouter>

      <AuthModalProvider>

        <Toaster position="top-right" />

        <Navbar />

        <AuthModal />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute role="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>

      </AuthModalProvider>

    </BrowserRouter>
  );
}

export default App;