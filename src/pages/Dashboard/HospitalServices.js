import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Services from '../../templates/loops/Services';
import { format } from 'date-fns';

const HospitalServices = () => {

  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);
  const formatedDate = format(selectedDate, 'PP');


  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/services/list`);
      const data = await res.json();

      return data;
    }
  });


  if (isLoading) return <progress className="progress"></progress>

  return (
    <div>
      <Services services={services?.data} selectedDate={selectedDate}></Services>
    </div>
  );
};

export default HospitalServices;