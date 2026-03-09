import React from 'react';
import logo from '../assets/logo.webp'
import logo5 from '../assets/logo5.png'
const Logo = () => {
    return (
        <div 
        className='flex items-end ml-3'
        >
            <img src={logo5} alt=""  className='w-10 h-10' />
            <h3 className='text-3xl font-bold'>ScholarStream</h3>
        </div>
    );
};

export default Logo;