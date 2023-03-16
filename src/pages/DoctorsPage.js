import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getDoctors } from '../queries/doctors';
import Doctors from '../templates/loops/Doctors';

const DoctorsPage = () => {

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctorsPage'],
    queryFn: () => getDoctors(undefined, 20)
  });

  return (
    <section style={{ backgroundColor: "rgb(245, 247, 248)" }}>
      <div className='container py-16'>
        <div className='flex justify-between mb-5'>
          <div>
            <h3 className="text-xl text-secondary font-bold mb-2">Our Doctors</h3>
            <p className='text-sm text-accent mb-2'>These are some our talented doctors.</p>
          </div>
        </div>
        <Doctors doctors={doctors.data} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default DoctorsPage;