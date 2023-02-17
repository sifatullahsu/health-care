import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Link, useLoaderData } from 'react-router-dom';

const HospitalServicesDetails = () => {
  const id = useLoaderData();

  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);
  const formatedDate = format(selectedDate, 'PP');

  const { data: service = [], isLoading } = useQuery({
    queryKey: ['service'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/services/single/${id}`);
      const data = await res.json();

      return data?.status ? data.data : [];
    }
  });


  const footer = selectedDate ? <p>You selected {format(selectedDate, 'PP')}.</p> : <p>Please pick a day.</p>;

  if (isLoading) return <div>loading</div>

  return (
    <div>
      <h3 className="text-xl text-secondary font-bold mb-2">{service?.name}</h3>
      <p className='text-sm text-accent mb-2'>{`Price: $${service?.price} / Appointment`}</p>
      <p className='text-sm text-accent'>No spaces available</p>

      <DayPicker
        mode="single"
        disabled={{ before: date }}
        selected={selectedDate}
        onSelect={(event) => {
          if (event) setSelectedDate(event);
        }}
        footer={footer}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
        {
          service?.doctors.map((doctor, i) => {
            return (
              <div key={i} className='card bg-white shadow-xl relative'>
                <div className='card-body justify-between'>
                  <div>
                    <p className='text-sm text-accent absolute top-5 right-5'>{doctor?.slots.length} spaces available</p>
                    <div key={doctor?._id} className='flex gap-3 min-h-[5rem]'>
                      <img src={doctor?.image} className='basis-14 h-12 mt-1' alt="" />
                      <div className='basis-full'>
                        <h3 className="text-lg text-secondary font-bold capitalize">{doctor?.name}</h3>
                        <p className='text-sm text-accent text-ellipsis'>{`${doctor?.designation} - [${doctor.qualifications}]`}</p>
                      </div>
                    </div>
                    <div className='text-accent'>
                      <p className='text-sm'>{doctor?.about.length > 160 ? <>{`${doctor.about.slice(0, 160)}...`}</> : doctor?.about}</p>
                      <div className='my-3'>
                        {doctor.slots.map(i => <span key={i} className='text-xs px-1 rounded-sm inline-block mr-2' style={{ background: "rgb(208 208 208)" }}>{i}</span>)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to='/dashboard/checkout'
                      className='btn btn-primary btn-sm text-xs min-h-[25px] h-[25px]'
                      state={{
                        appointment: {
                          date: formatedDate,
                          slot: '11.30 AM - 12.00 AM'
                        },
                        service: {
                          _id: service._id,
                          name: service.name,
                          price: service.price
                        },
                        doctor: {
                          _id: doctor._id,
                          name: doctor.name,
                          email: doctor.email,
                          qualifications: doctor.qualifications,
                          designation: doctor.designation,
                          image: doctor.image
                        }
                      }}
                    >Book Now</Link>
                  </div>
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