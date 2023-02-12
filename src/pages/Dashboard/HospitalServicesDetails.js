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
      const res = await fetch(`http://localhost:5000/api/v1/services/single/${id}`);
      const data = await res.json();

      return data?.status ? data.data : [];
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

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
        {
          service?.doctors.map(doctor => {
            return (
              <div className='card bg-white shadow-xl relative'>
                <div className='card-body'>
                  <p className='text-sm text-accent absolute top-5 right-5'>{doctor?.slots.length} spaces available</p>
                  <div key={doctor?._id} className='flex gap-3'>
                    <div className='basis-14'>
                      <img src={doctor?.image} className='w-full h-12 mt-1' alt="" />
                    </div>
                    <div className='basis-full'>
                      <div>
                        <h3 className="text-lg text-secondary font-bold capitalize">{doctor?.name}</h3>
                        <p className='text-sm text-accent text-ellipsis'>{`${doctor?.designation} - [${doctor.qualifications}]`}</p>
                      </div>
                    </div>
                  </div>
                  <p className='text-sm text-accent'>{doctor?.about.length > 160 ? <>{`${doctor.about.slice(0, 160)}...`}</> : doctor?.about}</p>
                  <div><button className='btn btn-primary btn-sm text-xs min-h-[25px] h-[25px]'>Book Now</button></div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default HospitalServicesDetails;