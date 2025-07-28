import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState(() => []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [activeQuoteId, setActiveQuoteId] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchQuotes = async () => {
    try {
      const res = await axios.get(backendUrl + `/api/quoteSearch`, {
        params: {
          search: searchTerm,
          sortKey,
          sortOrder,
          page: currentPage,
          limit: 25,
        },
      });
      setQuotes(res.data.quotes);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch quotes:", err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [searchTerm, sortKey, sortOrder, currentPage]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePreviewPDF = async (quote) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${backendUrl}/api/auth/generate-pdf-q`,
      { quoteId: quote._id },
      { responseType: "blob" }
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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quotation Dashboard</h2>
        <button
          onClick={() => navigate("/create-quote")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Quote
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by client name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Quote ID</th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Client Name{" "}
                {sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date{" "}
                {sortKey === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="p-3">Contact Person</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {(quotes || []).length > 0 ? (
              quotes.map((quote) => (
                <tr key={quote._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{quote.quotationId || "N/A"}</td>
                  <td className="p-3">{quote.client?.name || "N/A"}</td>
                  <td className="p-3">{quote.date || "N/A"}</td>
                  <td className="p-3">
                    {quote.client?.contactPerson || "N/A"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handlePreviewPDF(quote)}
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {loading && activeQuoteId === quote._id
                        ? "Loading..."
                        : "Preview"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No quotes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-4xl h-[80vh] rounded shadow-lg relative">
            <button
              onClick={() => setPdfUrl(null)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8"
            >
              ×
            </button>
            <iframe
              src={pdfUrl}
              className="w-full h-full rounded"
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};
// {
//   pdfUrl && (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//       <div className="bg-white w-11/12 max-w-4xl h-[80vh] rounded shadow-lg relative">
//         <button
//           onClick={() => {
//             setPdfUrl(null);
//             setActiveQuoteId(null);
//           }}
//           className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 text-lg"
//         >
//           ×
//         </button>
//         <iframe
//           src={pdfUrl}
//           className="w-full h-full rounded"
//           title="PDF Preview"
//         />
//       </div>
//     </div>
//   );
// }

export default Dashboard;
