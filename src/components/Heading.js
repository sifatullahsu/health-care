import React from 'react';
import icon from '../assets/images/health-care-icon.png';

const Heading = ({ title, text }) => {
  return (
    <div className='mb-5'>
      <div className='flex items-center space-x-2'>
        <div>
          <img src={icon} alt="" className='w-5' />
        </div>
        <h3 className="text-xl text-secondary font-bold">{title}</h3>
      </div>
      {text && <p className='text-sm text-accent mb-2'>{text}</p>}
    </div>
  );
};

export default Heading;