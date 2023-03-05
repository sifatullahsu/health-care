import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import Service from '../grids/Service';

const Services = ({ services, selectedDate }) => {
  const { user } = useAuth();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
        services?.map(service => <Service
          key={service._id}
          service={service}
          selectedDate={selectedDate}
          user={user}
        ></Service>)
      }
    </div>
  );
};

export default Services;