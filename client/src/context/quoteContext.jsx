import { createContext, useContext, useState } from "react";

const QuoteContext = createContext();



export const QuoteProvider = ({ children }) => {
  const [quoteData, setQuoteData] = useState({
    quotationId: "",
    date: new Date().toLocaleDateString("en-GB"),
    client: {
      name: "",
      contactPerson: "",
      subject: "",
      reference: "",
      address: ["", "", "", ""],
      kindAttention: "",
    },
    annexure1: { bayAreas: [], craneComponents: [] },
    annexure2: {},
    annexure3: { mechanical: [], electrical: [], controlSafety: [] },
    annexure4: {
      bayAreas: [],
      transport: { unit: 0 },
      load: { unit: 0 },
    },
    annexure5: {},
  });

  // ✅ FIXED: supports key-value updates
  const updateQuote = (key, value) => {
    setQuoteData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <QuoteContext.Provider value={{ quoteData, updateQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);
