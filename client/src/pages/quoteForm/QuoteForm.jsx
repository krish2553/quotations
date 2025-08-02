import React, { useState } from "react";
import ClientInfoForm from "./ClientInfoForm";
import Annexure1Form from "./Annexure1/Annexure1Form";
import Annexure2Form from "./Annexure2/Annexure2Form";
import Annexure3Form from "./Annexure3/Annexure3Form";
import Annexure4Form from "./Annexure4/Annexure4Form";
import ReviewAndSubmit from "./ReviewAndSubmit";
import { useQuote } from "../../context/quoteContext";
import { toast } from "react-toastify";
import axios from "axios";
import BreadcrumbNavbar from "../../components/BreadcrumbNavbar";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const steps = [
  "Client Info",
  "Annexure 1 - Technical Details",
  "Annexure 2 - Scope of Supply",
  "Annexure 3 - Make of Bought-Out Items",
  "Annexure 4 - Price Schedule",
  "Review & Submit",
];

const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const { quoteData } = useQuote();
  const [isLoading, setIsLoading] = useState(false); // 1. Added loading state

  const handleSubmit = async () => {
    setIsLoading(true); // 2. Set loading to true
    try {
      await axios.post(backendUrl + "/api/quotes", quoteData);
      toast.success("Quote submitted successfully!");
      window.alert("Quote submitted successfully!"); // 3. Alert on success
      window.location.reload(); // 3. Refresh the page on success
    } catch (err) {
      toast.error("Error submitting quote.");
      console.error(err);
      setIsLoading(false); // Stop loading on error
    }
  };

  // 1. Create a function for the "Next" button
  const handleNext = () => {
    setStep((s) => Math.min(steps.length - 1, s + 1));
    window.scrollTo(0, 0); // Scroll to top
  };

  // 2. Create a function for the "Back" button
  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <div className="lg:flex">
      {/* Sidebar - desktop only */}
      <div className=" ml-3 py-4 hidden lg:flex w-60 fixed top-1/2 left-0 transform -translate-y-1/2 flex-col justify-center items-center bg-white shadow rounded-2xl">
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
          Quick Access
        </h3>
        <ul className="space-y-2 px-4">
          {steps.map((label, idx) => (
            <li key={idx}>
              <button
                onClick={() => setStep(idx)}
                className={`w-full text-left text-sm px-4 py-2 rounded-md transition-all ${
                  step === idx
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main form */}
      <div className="lg:ml-5 flex-1 pt-8 pb-8 px-4 sm:px-6 lg:pl-64 lg:pr-20 bg-gradient-to-br from-white to-blue-50 min-h-screen">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          {steps[step]}
        </h2>
        <BreadcrumbNavbar
          customLabels={{
            quotes: "x",
            view: "y",
          }}
        />

        <div className="my-4">
          {step === 0 && <ClientInfoForm />}
          {step === 1 && <Annexure1Form />}
          {step === 2 && <Annexure2Form />}
          {step === 3 && <Annexure3Form />}
          {step === 4 && <Annexure4Form />}
          {step === 5 && <ReviewAndSubmit />}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 0 || isLoading}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl font-medium hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {step === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-wait"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
