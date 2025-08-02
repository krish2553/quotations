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
import QuoteListByPeriod from "./pages/QuoteListByPeriod";
import ClientCRUD from "./pages/ClientCRUD";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/quotes/by-period" element={<QuoteListByPeriod />} />
        <Route path="/clients" element={<ClientCRUD />} />
        <Route
          path="/create-quote"
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
