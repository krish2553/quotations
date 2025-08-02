import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalQuotes: 0,
    totalClients: 0,
    monthlyQuoteCount: 0,
    yearlyQuoteCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/quotes/dashboard-stats`
        );
        if (data.success) setStats(data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, [backendUrl]);

  const chartData = [
    { name: "Apr", value: stats.monthlyCounts?.Apr || 0 },
    { name: "May", value: stats.monthlyCounts?.May || 0 },
    { name: "Jun", value: stats.monthlyCounts?.Jun || 0 },
    { name: "Jul", value: stats.monthlyCounts?.Jul || 0 },
    { name: "Aug", value: stats.monthlyCounts?.Aug || 0 },
    { name: "Sep", value: stats.monthlyCounts?.Sep || 0 },
    { name: "Oct", value: stats.monthlyCounts?.Oct || 0 },
    { name: "Nov", value: stats.monthlyCounts?.Nov || 0 },
    { name: "Dec", value: stats.monthlyCounts?.Dec || 0 },
    { name: "Jan", value: stats.monthlyCounts?.Jan || 0 },
    { name: "Feb", value: stats.monthlyCounts?.Feb || 0 },
    { name: "Mar", value: stats.monthlyCounts?.Mar || 0 },
  ];

  const goToQuoteList = (filter) => {
    navigate(`/quotes/by-period?filter=${filter}`);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-xl text-sm font-medium hover:bg-blue-700"
          onClick={() => navigate("/create-quote")}
        >
          + Create Quote
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => goToQuoteList("all")}
          className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-blue-50"
        >
          <h3 className="text-gray-700 text-sm font-medium">Total Quotes</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.totalQuotes}
          </p>
        </div>
        {/* <div
          onClick={() => goToQuoteList("monthly")}
          className="bg-white border border-green-200 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-green-50"
        >
          <h3 className="text-gray-700 text-sm font-medium">Monthly Quotes</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.monthlyQuoteCount}
          </p>
        </div>
        <div
          onClick={() => goToQuoteList("yearly")}
          className="bg-white border border-yellow-200 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-yellow-50"
        >
          <h3 className="text-gray-700 text-sm font-medium">Yearly Quotes</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.yearlyQuoteCount}
          </p>
        </div> */}
        <div
          onClick={() => navigate("/clients")}
          className="bg-white border border-purple-200 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-purple-50"
        >
          <h3 className="text-gray-700 text-sm font-medium">Total Clients</h3>
          <p className="text-2xl font-bold text-purple-600">
            {stats.totalClients}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quote Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;