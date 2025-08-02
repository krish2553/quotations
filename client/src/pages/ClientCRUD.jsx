import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import NewClientModal from "../components/NewClientModal";

const ClientCRUD = () => {
  const { backendUrl } = useContext(AppContext);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchClients = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/clients`);
      setClients(data || []); // Assuming response has `clients` array
    } catch (err) {
      console.error("Failed to fetch clients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [backendUrl]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${backendUrl}/api/clients/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Failed to delete client", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Client Management
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-600 hover:text-white transition"
        >
          + New Client
        </button>
      </div>

      {/* Client Table */}
      <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <div className="p-4 text-gray-600">Loading clients...</div>
        ) : clients.length === 0 ? (
          <div className="p-4 text-gray-600">No clients found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Name</th>
                <th className="text-left px-4 py-2 font-medium">
                  Contact Person
                </th>
                <th className="text-left px-4 py-2 font-medium">Address</th>
                <th className="text-left px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-blue-50">
                  <td className="px-4 py-2 text-blue-800 font-medium">
                    {client.name}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {client.contactPerson}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {(client.address || []).filter(Boolean).join(", ")}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="text-sm text-red-600 hover:underline focus:outline-blue-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* New Client Modal */}
      <NewClientModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onClientSaved={fetchClients}
      />
    </div>
  );
};

export default ClientCRUD;
