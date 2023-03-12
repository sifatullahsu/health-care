import React from 'react';
import logo from '../assets/images/health-care-icon.png';


const Loading = () => {
  return (
    <div>
      <img src={logo} alt="" className='w-10 -mt-16 opacity-80' />
      <div className="loading">
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;