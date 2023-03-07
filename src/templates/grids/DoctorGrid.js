import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DoctorGrid = ({ doctor, isLoading }) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        {
          !isLoading ?
            <>
              <img src={doctor.image} className='w-full' alt="Shoes" />
              <div>
                <h3 className="text-base md:text-lg font-semibold truncate">{doctor.name}</h3>
                <p className='text-sm text-accent font-semibold truncate'>{doctor.designation}</p>
              </div>
              <p className='text-accent hidden lg:block'>{doctor.about.slice(0, 73)}...</p>
            </>
            :
            <>
              <Skeleton className='h-28 md:h-24 xl:h-40'></Skeleton>
              <Skeleton className='h-6'></Skeleton>
              <Skeleton width="40%"></Skeleton>
            </>
        }
      </div>
    </div>
  );
};

export default DoctorGrid;