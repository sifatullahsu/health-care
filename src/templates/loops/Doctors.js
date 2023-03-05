import React from 'react';
import DoctorGrid from '../grids/DoctorGrid';

const Doctors = ({ doctors }) => {


  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
      {
        doctors?.map(doctor => <DoctorGrid
          key={doctor._id}
          doctor={doctor}
        ></DoctorGrid>)
      }
    </div>
  );
};

export default Doctors;