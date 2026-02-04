import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Logo';

const AuthLayout = () => {
    return (
        <div className='max-w-xl mx-auto'>
            <Logo></Logo>
              <div>
            <Outlet></Outlet>
        </div>
        </div>
      
    );
};

export default AuthLayout;