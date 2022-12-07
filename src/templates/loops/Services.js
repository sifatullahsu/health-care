import React from 'react';
import Service from '../grids/Service';

const Services = ({ services, selectedDate }) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {
        services.map(service => <Service
          key={service._id}
          service={service}
          selectedDate={selectedDate}
        ></Service>)
      }
    </div>
  );
};

export default Services;