import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';
import useAuth from '../../../hooks/useAuth';

const fetchMyApplications = async (email) => {
  const res = await api.get(`/applications?email=${encodeURIComponent(email)}`);
  return res.data;
}

const MyApplications = () => {
  const { user } = useAuth() || {};
  const { data: apps = [] } = useQuery(['my-applications', user?.email], () => fetchMyApplications(user?.email), { enabled: !!user?.email });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Applications</h2>
      <div className="overflow-x-auto mt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>University</th>
              <th>Address</th>
              <th>Feedback</th>
              <th>Subject</th>
              <th>Application Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(a => (
              <tr key={a._id || a.id}>
                <td>{a.universityName}</td>
                <td>{a.universityAddress}</td>
                <td>{a.feedback}</td>
                <td>{a.subjectCategory}</td>
                <td>{a.applicationFees}</td>
                <td>{a.status}</td>
                <td>
                  <button className="btn btn-sm mr-2">Details</button>
                  {a.status === 'pending' && <button className="btn btn-sm mr-2">Edit</button>}
                  {a.status === 'pending' && a.paymentStatus === 'unpaid' && <button className="btn btn-sm mr-2">Pay</button>}
                  {a.status === 'pending' && <button className="btn btn-sm btn-error">Delete</button>}
                  {a.status === 'completed' && <button className="btn btn-sm">Add Review</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyApplications;
