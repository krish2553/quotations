import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewClientModal = ({ isOpen, onClose, onClientSaved }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [newClient, setNewClient] = useState({
    name: "",
    contactPerson: "",
    address: ["", "", "", ""],
  });
  const [isSaving, setIsSaving] = useState(false);

  // Effect to handle Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Effect to disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handler for form input change
  const handleNewClientChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewClientAddressChange = (index, value) => {
    const updatedAddress = [...newClient.address];
    updatedAddress[index] = value;
    setNewClient((prev) => ({ ...prev, address: updatedAddress }));
  };

  // Handler for saving the new client
  const handleSaveNewClient = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await axios.post(`${backendUrl}/api/clients`, newClient);
      if (response.status === 201) {
        toast.success("New client added successfully!");
        onClientSaved(response.data); // Pass saved client to parent
        // Reset form state
        setNewClient({
          name: "",
          contactPerson: "",
          address: ["", "", "", ""],
        });
        onClose(); // Close the modal
      } else {
        toast.error(response.data.error || "Failed to add client.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred.");
      console.error("Error saving new client:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  // Use createPortal to render the modal at the end of the document body
  return createPortal(
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add New Client</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSaveNewClient} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client/Company Name
              </label>
              <input
                type="text"
                name="name"
                value={newClient.name}
                onChange={handleNewClientChange}
                className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={newClient.contactPerson}
                onChange={handleNewClientChange}
                className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            {(newClient.address || []).map((line, idx) => (
              <div key={idx} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line {idx + 1}
                </label>
                <input
                  type="text"
                  value={line}
                  onChange={(e) =>
                    handleNewClientAddressChange(idx, e.target.value)
                  }
                  className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Client"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body // The DOM node to which the modal will be rendered
  );
};

export default NewClientModal;
