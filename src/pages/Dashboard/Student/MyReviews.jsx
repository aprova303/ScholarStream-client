import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';
import useAuth from '../../../hooks/useAuth';

const fetchMyReviews = async (email) => {
  const res = await api.get(`/reviews?email=${encodeURIComponent(email)}`);
  return res.data;
}

const MyReviews = () => {
  const { user } = useAuth() || {};
  const { data: reviews = [] } = useQuery(['my-reviews', user?.email], () => fetchMyReviews(user?.email), { enabled: !!user?.email });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Reviews</h2>
      <div className="overflow-x-auto mt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Scholarship</th>
              <th>University</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r._id || r.id}>
                <td>{r.scholarshipName}</td>
                <td>{r.universityName}</td>
                <td>{r.comment}</td>
                <td>{r.date}</td>
                <td>{r.rating}</td>
                <td>
                  <button className="btn btn-sm mr-2">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyReviews;
