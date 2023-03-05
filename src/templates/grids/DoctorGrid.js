import React from 'react';

const DoctorGrid = ({ doctor }) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <img src={doctor.image} className='w-full' alt="Shoes" />
        <div>
          <h3 className="text-base md:text-lg font-semibold truncate">{doctor.name}</h3>
          <p className='text-sm text-accent font-semibold truncate'>{doctor.designation}</p>
        </div>
        <p className='text-accent hidden lg:block'>{doctor.about.slice(0, 73)}...</p>
      </div>
    </div>
  );
};

export default DoctorGrid;