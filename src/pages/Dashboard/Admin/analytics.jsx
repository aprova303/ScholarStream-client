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

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

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
        <h1 className="text-4xl font-bold text-gray-800">
          Analytics & Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
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
            <h3 className="card-title text-lg">Fees Collected</h3>
            <p className="text-3xl md:text-4xl font-bold">
              ${isLoading ? "--" : (data.totalFees ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">Total revenue</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
          <div className="card-body p-4 md:p-6">
            <h3 className="card-title text-lg">Total Scholarships</h3>
            <p className="text-3xl md:text-4xl font-bold">
              {isLoading ? "--" : (data.totalScholarships ?? "N/A")}
            </p>
            <p className="text-sm opacity-75">Active scholarships</p>
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
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Applications Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">
                  Pending Applications
                </span>
                <span className="badge badge-warning text-xs">
                  {isLoading ? "--" : (data.pendingApplications ?? 0)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">
                  Completed Applications
                </span>
                <span className="badge badge-success text-xs">
                  {isLoading ? "--" : (data.completedApplications ?? 0)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">
                  Rejected Applications
                </span>
                <span className="badge badge-error text-xs">
                  {isLoading ? "--" : (data.rejectedApplications ?? 0)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                <span className="text-sm font-medium">
                  Processing Applications
                </span>
                <span className="badge badge-info text-xs">
                  {isLoading ? "--" : (data.processingApplications ?? 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Role Distribution Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                <span className="text-sm font-medium">Total Students</span>
                <span className="font-bold text-lg text-cyan-600">
                  {isLoading ? "--" : (data.studentCount ?? 0)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                <span className="text-sm font-medium">Total Moderators</span>
                <span className="font-bold text-lg text-violet-600">
                  {isLoading ? "--" : (data.moderatorCount ?? 0)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                <span className="text-sm font-medium">Total Admins</span>
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
