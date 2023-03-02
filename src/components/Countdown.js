import React from 'react';

const Countdown = ({ data, className }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {
        (data?.days || data?.days === 0) &&
        <div>
          <span className="countdown text-accent font-semibold text-xl">
            <span style={{ "--value": `${data?.days}` }}></span>
          </span>
          <span className='text-sm text-gray-500'>day</span>
        </div>
      }

      {
        (data?.hours || data?.hours === 0) &&
        <div>
          <span className="countdown text-accent font-semibold text-xl">
            <span style={{ "--value": `${data?.hours}` }}></span>
          </span>
          <span className='text-sm text-gray-500'>hour</span>
        </div>
      }

      {
        (data?.minutes || data?.minutes === 0) &&
        <div>
          <span className="countdown text-accent font-semibold text-xl">
            <span style={{ "--value": `${data?.minutes}` }}></span>
          </span>
          <span className='text-sm text-gray-500'>min</span>
        </div>
      }

      {
        (data?.seconds || data?.seconds === 0) &&
        <div>
          <span className="countdown text-accent font-semibold  text-xl">
            <span style={{ "--value": `${data?.seconds}` }}></span>
          </span>
          <span className='text-sm text-gray-500'>sec</span>
        </div>
      }



    </div>
  );
};

export default Countdown;