import React from 'react';
import logo from '../assets/images/health-care-icon.png';


const Loading = () => {
  return (
    <div className='-mt-14'>
      <img src={logo} alt="" className='block w-10 mx-auto mb-10 opacity-80' />
      <div className="loading">
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;