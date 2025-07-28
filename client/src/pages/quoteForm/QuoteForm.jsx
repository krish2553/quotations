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

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{steps[step]}</h2>
      <div className="mb-8">
        {step === 0 && <ClientInfoForm />}
        {step === 1 && <Annexure1Form />}
        {step === 2 && <Annexure2Form />}
        {step === 3 && <Annexure3Form />}
        {step === 4 && <Annexure4Form />}
        {step === 5 && <ReviewAndSubmit />}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || isLoading} // 4. Disable back button while loading
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        {step === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isLoading} // 5. Disable submit button while loading
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-wait"
          >
            {isLoading ? "Submitting..." : "Submit"} {/* 6. Show loading text */}
          </button>
        ) : (
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={isLoading} // 7. Disable next button while loading
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;