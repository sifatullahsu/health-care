import React from 'react';
import DoctorGrid from '../grids/DoctorGrid';

const Doctors = ({ doctors, isLoading }) => {


  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
      {
        !isLoading ?
          <>
            {
              doctors?.map(doctor => <DoctorGrid
                key={doctor._id}
                doctor={doctor}
              ></DoctorGrid>)
            }
          </>
          :
          <>
            {
              Array(15).fill('data').map((_, i) => <DoctorGrid
                key={i}
                doctor={{}}
                isLoading={isLoading}
              ></DoctorGrid>)
            }
          </>
      }
    </div>
  );
};

export default Doctors;