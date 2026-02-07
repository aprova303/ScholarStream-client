import React from 'react';
import useAuth from '../../../hooks/useAuth';

const ModeratorProfile = () => {
  const { user, role } = useAuth() || {};
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Moderator Profile</h2>
      <div className="mt-4">
        <p><strong>Name: </strong>{user?.displayName || 'N/A'}</p>
        <p><strong>Email: </strong>{user?.email || 'N/A'}</p>
        <p><strong>Role: </strong>{role}</p>
      </div>
    </div>
  );
};

export default ModeratorProfile;