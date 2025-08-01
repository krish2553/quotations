import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useQuote } from "../../context/quoteContext";
import NewClientModal from "../../components/NewClientModal";

const ClientInfoForm = () => {
  const { quoteData, updateQuote } = useQuote();
  const [clientOptions, setClientOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State for the new client modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch clients when searchTerm changes
  useEffect(() => {
    if (searchTerm.length < 1) return;
    const fetchClients = async () => {
      try {
        const res = await axios.get(
          backendUrl + `/api/clients?q=${searchTerm}`
        );
        const options = res.data.map((client) => ({
          label: client.name,
          value: client._id,
          data: client,
        }));
        setClientOptions(options);
      } catch (err) {
        console.error("Error fetching clients:", err);
      }
    };
    fetchClients();
  }, [searchTerm]);

  // Get next quotation ID on mount
  useEffect(() => {
    const fetchQuotationId = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/quotes/next-id`);
        updateQuote("quotationId", res.data.quotationId);
      } catch (err) {
        console.error("Failed to fetch quotation ID", err);
      }
    };
    fetchQuotationId();
  }, []);

  const handleClientChange = (key, value) => {
    updateQuote("client", {
      ...quoteData.client,
      [key]: value,
    });
  };

  const handleSelect = (selected) => {
    if (!selected?.data) {
      // Clear client data if selection is cleared
      updateQuote("client", {
        name: "",
        contactPerson: "",
        subject: "",
        reference: "",
        address: ["", "", "", ""],
        kindAttention: "",
      });
      return;
    }
    updateQuote("client", selected.data);
  };

  // Handler for when a new client is successfully saved
  const handleClientSaved = (savedClient) => {
    // Update the main form with the new client data
    updateQuote("client", savedClient);
    setSearchTerm("");
    setClientOptions([]);
  };

  return (
    <div className="p-4 sm:p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow">
      <NewClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClientSaved={handleClientSaved}
      />

      <div className="grid gap-4">
        {/* Select Existing Client */}
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr_auto] items-center gap-4 py-3 border-b border-gray-200/80">
          <label className="font-medium text-gray-700">
            Select Existing Client
          </label>
          <Select
            options={clientOptions}
            onInputChange={setSearchTerm}
            onChange={handleSelect}
            placeholder="Search client..."
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.7rem",
                borderColor: "#D1D5DB",
                "&:hover": {
                  borderColor: "#A5B4FC",
                },
                boxShadow: "none",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "#6366F1" : "white",
                "&:hover": {
                  backgroundColor: "#E0E7FF",
                },
              }),
            }}
          />
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all w-full lg:w-auto"
          >
            New Client
          </button>
        </div>

        {/* Quotation ID */}
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] items-center gap-4 py-3 border-b border-gray-200/80">
          <label className="font-medium text-gray-700">Quotation ID</label>
          <input
            type="text"
            value={quoteData.quotationId}
            readOnly
            tabIndex={-1}
            className="bg-gray-100/70 p-2 rounded-xl border border-gray-300 w-full"
          />
        </div>

        {/* Date */}
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] items-center gap-4 py-3 border-b border-gray-200/80">
          <label className="font-medium text-gray-700">Date</label>
          <input
            type="text"
            value={quoteData.date}
            onChange={(e) => updateQuote("date", e.target.value)}
            className="p-2 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* Client Name */}
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] items-center gap-4 py-3 border-b border-gray-200/80">
          <label className="font-medium text-gray-700">
            Client/Company Name
          </label>
          <input
            type="text"
            value={quoteData.client?.name || ""}
            onChange={(e) => handleClientChange("name", e.target.value)}
            className="p-2 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* Contact Person */}
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] items-center gap-4 py-3 border-b border-gray-200/80">
          <label className="font-medium text-gray-700">Contact Person</label>
          <input
            type="text"
            value={quoteData.client?.contactPerson || ""}
            onChange={(e) =>
              handleClientChange("contactPerson", e.target.value)
            }
            className="p-2 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* Address Lines */}
        {(quoteData.client?.address || []).map((line, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] items-center gap-4 py-1 border-gray-200/80"
          >
            <label className="font-medium text-gray-700">
              Address Line {idx + 1}
            </label>
            <input
              type="text"
              value={line}
              onChange={(e) => {
                const updated = [...(quoteData.client.address || [])];
                updated[idx] = e.target.value;
                handleClientChange("address", updated);
              }}
              className="p-2 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Subject */}
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] items-center gap-4 py-4 border-t border-b border-gray-200/80">
          <label className="font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={quoteData.client?.subject || ""}
            onChange={(e) => handleClientChange("subject", e.target.value)}
            className="p-2 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] items-center gap-4 py-3">
          <label className="font-medium text-gray-700">Reference</label>
          <input
            type="text"
            value={quoteData.client?.reference || ""}
            onChange={(e) => handleClientChange("reference", e.target.value)}
            className="p-2 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfoForm;
