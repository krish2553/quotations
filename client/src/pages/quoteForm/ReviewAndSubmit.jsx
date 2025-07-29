import React, { useState } from "react";
import { useQuote } from "../../context/quoteContext";
import axios from "axios";

const ReviewAndSubmit = () => {
  const { quoteData } = useQuote();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + `/api/auth/generate-pdf`, // Adjust URL
        quoteData,
        {
          responseType: "blob", // crucial for binary data
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfObjectUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfObjectUrl);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-md space-y-6">
      <button
        onClick={handleGeneratePDF}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-70"
        disabled={loading}
      >
        {loading ? "Generating..." : "Preview PDF"}
      </button>

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="Quotation Preview"
          className="w-full h-[80vh] border-2 border-gray-300/80 rounded-lg mt-4"
        />
      )}
    </div>
  );
};

export default ReviewAndSubmit;
