import React from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
  const { user, role } = useAuth() || {};
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      <div className="mt-4">
        <p><strong>Name: </strong>{user?.displayName || 'N/A'}</p>
        <p><strong>Email: </strong>{user?.email || 'N/A'}</p>
        <p><strong>Role: </strong>{role}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
// import React from 'react';

// const AdminProfile = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default AdminProfile;