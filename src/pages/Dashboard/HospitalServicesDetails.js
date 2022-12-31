import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

const HospitalServicesDetails = () => {
  const location = useLocation();
  const id = location.pathname.split('/dashboard/hospital-services/')[1];

  const { data: service = [], isLoading } = useQuery({
    queryKey: ['service'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/services/full-info/${id}`);
      const data = await res.json();

      return data;
    }
  });


  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <div>
      <h2 className="text-xl text-secondary font-bold mb-2">{service?.name}</h2>
      <p className='text-sm text-accent mb-2'>{`Price: $${service?.price} / Appointment`}</p>
      <p className='text-sm text-accent'>No spaces available</p>

      {
        service?.doctors.map(doctor => {
          return (
            <div className='flex gap-3 pt-2 pb-3 shadow-sm'>
              <div className='basis-14'>
                <img src={doctor?.image} className='w-full h-12 mt-1' alt="" />
              </div>
              <div className='basis-full'>
                <div>
                  <h3 className="text-lg text-secondary font-bold capitalize">{doctor?.name}</h3>
                  <p className='text-sm text-accent text-ellipsis'>{doctor?.designation}</p>
                </div>
                <p className='text-sm text-accent'>{doctor?.slots.length} spaces available</p>
                <div className='absolute top-2 right-2'>
                  <div className="tooltip tooltip-left" data-tip={doctor?.qualifications}>
                    <FaInfoCircle></FaInfoCircle>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }



    </div>
  );
};

export default HospitalServicesDetails;