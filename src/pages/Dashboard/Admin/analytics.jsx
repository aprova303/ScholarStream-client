import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useThemeContext from "../../../hooks/useThemContext";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  
  const {theme} = useThemeContext();

    const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  const { data = {}, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics");
      return res.data;
    },
    retry: false,
  });

  // Data for Application Status Chart
  const applicationStatusData = [
    { name: "Pending", value: data.pendingApplications || 0 },
    { name: "Processing", value: data.processingApplications || 0 },
    { name: "Approved", value: data.approvedApplications || 0 },
    { name: "Completed", value: data.completedApplications || 0 },
    { name: "Rejected", value: data.rejectedApplications || 0 },
  ];

  // Data for User Distribution Chart
  const userDistributionData = [
    { name: "Students", value: data.studentCount || 0 },
    { name: "Moderators", value: data.moderatorCount || 0 },
    { name: "Admins", value: data.adminCount || 0 },
  ];

  // Colors for Pie Chart
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  const USER_COLORS = ["#06b6d4", "#8b5cf6", "#ec4899"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl font-bold ${textColor}`}>
          Analytics & Dashboard
        </h1>
        <p className={`text-${secondaryText} mt-2`}>
          Platform statistics and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
          <div className="card-body p-4 md:p-6">
            <h3 className="card-title text-lg">Total Users</h3>
            <p className="text-3xl md:text-4xl font-bold">
              {isLoading ? "--" : (data.totalUsers ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">Active platform users</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
          <div className="card-body p-4 md:p-6">
            <h3 className="card-title text-lg">Revenue Collected</h3>
            <p className="text-3xl md:text-4xl font-bold">
              ${isLoading ? "--" : (data.totalFees?.toLocaleString() ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">
              {isLoading ? "--" : data.paidApplications || 0} paid applications
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
          <div className="card-body p-4 md:p-6">
            <h3 className="card-title text-lg">Total Applications</h3>
            <p className="text-3xl md:text-4xl font-bold">
              {isLoading ? "--" : (data.totalApplications ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">Across all scholarships</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
          <div className="card-body p-4 md:p-6">
            <h3 className="card-title text-lg">Total Scholarships</h3>
            <p className="text-3xl md:text-4xl font-bold">
              {isLoading ? "--" : (data.totalScholarships ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">Active offers</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg">
          <div className="card-body p-4 md:p-6">
            <h3 className="card-title text-lg">Total Reviews</h3>
            <p className="text-3xl md:text-4xl font-bold">
              {isLoading ? "--" : (data.totalReviews ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">Student feedback</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg">
          <div className="card-body p-4 md:p-6">
            <h3 className="card-title text-lg">Pending Payment</h3>
            <p className="text-3xl md:text-4xl font-bold">
              {isLoading ? "--" : (data.unpaidApplications ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">Waiting for payment</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status Bar Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Applications by Status</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-80 text-gray-500">
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">User Distribution</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-80 text-gray-500">
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={USER_COLORS[index % USER_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Details Card */}
        <div className={`card bg-base-100 shadow-xl ${cardBg}`}>
          <div className="card-body">
            <h2 className={`card-title ${textColor}`}>Applications Overview</h2>
            <div className="space-y-3">
              <div className={`flex justify-between items-center p-3  rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>
                  Pending Applications
                </span>
                <span className="badge badge-warning text-xs">
                  {isLoading ? "--" : (data.pendingApplications ?? 0)}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3 bg-blue-50 rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>
                  Processing Applications
                </span>
                <span className="badge badge-info text-xs">
                  {isLoading ? "--" : (data.processingApplications ?? 0)}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3  rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>
                  Approved Applications
                </span>
                <span className="badge badge-success text-xs">
                  {isLoading ? "--" : (data.approvedApplications ?? 0)}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3 bg-cyan-50 rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>
                  Completed Applications
                </span>
                <span className="badge badge-primary text-xs">
                  {isLoading ? "--" : (data.completedApplications ?? 0)}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3  rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>
                  Rejected Applications
                </span>
                <span className="badge badge-error text-xs">
                  {isLoading ? "--" : (data.rejectedApplications ?? 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Role Distribution Card */}
        <div className={`card bg-base-100 shadow-xl ${cardBg}`}>
          <div className="card-body">
            <h2 className={`card-title ${textColor}`}>User Statistics</h2>
            <div className="space-y-3">
              <div className={`flex justify-between items-center p-3 bg-cyan-50 rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>Total Students</span>
                <span className="font-bold text-lg text-cyan-600">
                  {isLoading ? "--" : (data.studentCount ?? 0)}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3  rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>Total Moderators</span>
                <span className="font-bold text-lg text-violet-600">
                  {isLoading ? "--" : (data.moderatorCount ?? 0)}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3  rounded-lg ${cardBg}`}>
                <span className={`text-sm font-medium ${textColor}`}>Total Admins</span>
                <span className="font-bold text-lg text-pink-600">
                  {isLoading ? "--" : (data.adminCount ?? 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
