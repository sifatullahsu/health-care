import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Services from '../../templates/loops/Services';
import { format } from 'date-fns';

const HospitalServices = () => {

  const date = format(new Date(), 'PP');

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/services/list?date=${date}`);
      const data = await res.json();

      return data;
    }
  });


  if (isLoading) return <progress className="progress"></progress>

  return (
    <div>
      <div className='flex justify-between mb-5'>
        <div>
          <h3 className="text-xl text-secondary font-bold mb-2">Hospital Servises</h3>
          <p className='text-sm text-accent mb-2'>These are all our services that we provide.</p>
        </div>
        <div>
          <div className='text-right text-sm text-accent mb-5 font-semibold'>Showing slots for {date}</div>
        </div>
      </div>
      <Services services={services?.data} selectedDate={date}></Services>
    </div>
  );
};

export default HospitalServices;