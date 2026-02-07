import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';

const useRole = () => {
    const {user} = useAuth();
    const {isLoading: roleLoading,data: role = 'user'} = useQuery({
        queryKey: ['userRole',user?.email],
        queryFn: async () => {
            const res = await fetch(`/users/${user?.email}/role`);
            return res.data;
        }
    })
    return {role,roleLoading};
};

export default useRole;