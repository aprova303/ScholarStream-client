import React from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
    const authInfo = (AuthContext);

    return authInfo
};

export default useAuth;