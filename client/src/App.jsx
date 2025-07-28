import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import QuoteForm from "./pages/quoteForm/QuoteForm";
import { QuoteProvider } from "./context/quoteContext";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <QuoteProvider>
              <QuoteForm />
            </QuoteProvider>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
