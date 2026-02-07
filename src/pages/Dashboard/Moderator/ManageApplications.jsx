import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../../services/api';

const fetchApplications = async () => {
  const res = await api.get('/applications');
  return res.data;
}

const ManageApplications = () => {
  const { data: apps = [] } = useQuery(['applications'], fetchApplications);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manage Applications</h2>
      <div className="overflow-x-auto mt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(a => (
              <tr key={a._id || a.id}>
                <td>{a.applicantName}</td>
                <td>{a.applicantEmail}</td>
                <td>{a.universityName}</td>
                <td>{a.feedback || ''}</td>
                <td>{a.status}</td>
                <td>{a.paymentStatus}</td>
                <td>
                  <button className="btn btn-sm mr-2">Details</button>
                  <button className="btn btn-sm mr-2">Feedback</button>
                  <button className="btn btn-sm mr-2">Processing</button>
                  <button className="btn btn-sm btn-error">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageApplications;
