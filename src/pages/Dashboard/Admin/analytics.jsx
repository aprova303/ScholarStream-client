import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';

const fetchStats = async () => {
  const res = await api.get('/analytics');
  return res.data;
}

const Analytics = () => {
  const { data = {} } = useQuery(['analytics'], fetchStats, { retry: false });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">Total Users: {data.totalUsers ?? 'N/A'}</div>
        <div className="card p-4">Total Fees Collected: {data.totalFees ?? 'N/A'}</div>
        <div className="card p-4">Total Scholarships: {data.totalScholarships ?? 'N/A'}</div>
      </div>
    </div>
  );
};

export default Analytics;