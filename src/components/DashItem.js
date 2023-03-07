import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DashItem = ({ title, data, isLoading }) => {
  return (
    <div className='bg-white p-5 rounded space-y-3'>
      {
        !isLoading ?
          <>
            <h3 className="text-lg text-secondary font-bold capitalize">{title}</h3>
            <p className="text-base text-accent">{data}</p>
          </>
          :
          <>
            <div><Skeleton height={20}></Skeleton></div>
            <div><Skeleton width={50}></Skeleton></div>
          </>
      }
    </div>
  );
};

export default DashItem;