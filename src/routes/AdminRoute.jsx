import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = () => {
    const {user, loading} = useAuth();
    const {role,roleLoading} = useRole();

   if(loading){
        return <span className="loading loading-dots loading-xl"></span>
    }

    if(user && user.role !== 'admin'){
        return <div className="text-center text-red-500">You are not authorized to access this page.</div>
    }
    return Children;
};

export default AdminRoute;