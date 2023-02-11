import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Services from '../../templates/loops/Services';
// import { DayPicker } from 'react-day-picker';
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


  const footer = selectedDate ? (
    <p>You selected {format(selectedDate, 'PP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );


  if (isLoading) {
    return (
      <progress className="progress"></progress>
    );
  }

  return (
    <div>
      {/* <div className='mb-10'>
        <DayPicker
          mode="single"
          disabled={{ before: date }}
          selected={selectedDate}
          onSelect={(event) => {
            if (event) {
              setSelectedDate(event);
            }
          }}
          footer={footer}
        />
      </div> */}
      <Services services={services?.data} selectedDate={selectedDate}></Services>


    </div>
  );
};

export default HospitalServices;