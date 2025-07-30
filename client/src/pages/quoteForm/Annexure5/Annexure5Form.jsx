import React from "react";
import { useQuote } from "../../../context/quoteContext";

const termsAndConditions = [
  "Prices are ex-works, manufacturing plant.",
  "Payment: 30% advance, 60% on delivery, 10% on commissioning.",
  "Delivery Period: 12-14 weeks from receipt of advance payment.",
  "Warranty: 12 months from date of commissioning or 18 months from date of dispatch, whichever is earlier.",
];

const Annexure5Form = () => {
  const { quoteData, updateQuote } = useQuote();
  const selectedTerms = quoteData.annexure5?.terms || [];

  const handleToggle = (term) => {
    let updated = [];
    if (selectedTerms.includes(term)) {
      updated = selectedTerms.filter((t) => t !== term);
    } else {
      updated = [...selectedTerms, term];
    }
    updateQuote("annexure5", { ...quoteData.annexure5, terms: updated });
  };

  return (
    <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Annexure 5 - Commercial Terms, Delivery, and Warranty
      </h3>
      <div className="space-y-3">
        {termsAndConditions.map((term, idx) => (
          <label
            key={idx}
            className="flex items-center gap-3 p-3 bg-white/70 rounded-xl shadow-sm hover:bg-gray-50/70 transition-all cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTerms.includes(term)}
              onChange={() => handleToggle(term)}
              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{term}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Annexure5Form;
