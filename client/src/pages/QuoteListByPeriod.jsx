import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const QuoteListByPeriod = () => {
  const { backendUrl } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minLoad, setMinLoad] = useState("");
  const [maxLoad, setMaxLoad] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [triggerSearch, setTriggerSearch] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/quoteSearch`, {
          params: {
            search,
            sortKey,
            sortOrder,
            page,
            limit: 25,
            minLoad,
            maxLoad,
            startDate,
            endDate,
          },
        });
        if (data.quotes) {
          setQuotes(data.quotes);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [
    search,
    sortKey,
    sortOrder,
    page,
    minLoad,
    maxLoad,
    startDate,
    endDate,
    backendUrl,
    triggerSearch,
  ]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setMinLoad("");
    setMaxLoad("");
    setPage(1);
    setTriggerSearch((prev) => !prev);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
        {filter} Quotes
      </h2>

      <div className="mb-6 bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search quotes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-sm w-44 focus:outline-blue-400"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-blue-400"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-blue-400"
        />
        <input
          type="number"
          placeholder="Min Load"
          value={minLoad}
          onChange={(e) => setMinLoad(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-sm w-28 focus:outline-blue-400"
        />
        <input
          type="number"
          placeholder="Max Load"
          value={maxLoad}
          onChange={(e) => setMaxLoad(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-sm w-28 focus:outline-blue-400"
        />
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-blue-100 text-blue-600 border border-blue-300 rounded-lg text-sm hover:bg-blue-200 transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading quotes...</div>
      ) : quotes.length === 0 ? (
        <div className="text-gray-600">No quotes found for this period.</div>
      ) : (
        <>
          <div className="overflow-auto rounded-xl border border-gray-300 bg-white shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th
                    className="px-4 py-2 cursor-pointer hover:underline"
                    onClick={() => handleSort("quotationId")}
                  >
                    Quotation ID
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:underline"
                    onClick={() => handleSort("client.name")}
                  >
                    Client
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:underline"
                    onClick={() => handleSort("createdAt")}
                  >
                    Date
                  </th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quotes.map((quote, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-4 py-2 font-medium text-blue-700">
                      {quote.quotationId}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {quote.client?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {new Date(quote.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `${backendUrl}/api/quotes/generate-pdf-by-id?quoteId=${quote._id}`,
                            "_blank"
                          )
                        }
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Preview
                      </button>

                      <button
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this quote?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${backendUrl}/api/quotes/${quote._id}`
                              );
                              setQuotes((prev) =>
                                prev.filter((q) => q._id !== quote._id)
                              );
                            } catch (err) {
                              alert("Failed to delete quote");
                            }
                          }
                        }}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-1 border rounded-lg text-sm bg-white border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-1 border rounded-lg text-sm bg-white border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteListByPeriod;
