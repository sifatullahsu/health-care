import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SlCalender } from 'react-icons/sl';

const HospitalServicesDetails = () => {
  const id = useLoaderData();
  const navigate = useNavigate();

  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);
  const formatedDate = format(selectedDate, 'PP');

  const { data: service = [], isLoading } = useQuery({
    queryKey: ['service', formatedDate],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/single/${id}?date=${formatedDate}`);
      const data = await res.json();

      return data?.status ? data.data : [];
    }
  });

  const totalSlots = service?.doctors?.map(({ slots }) => slots.length).reduce((a, b) => a + b, 0);

  const handleCheckout = (event, slotRadio, doctor) => {
    event.preventDefault();

    const slot = event.target[slotRadio].value;

    const stateData = {
      appointment: {
        date: formatedDate,
        slot: slot
      },
      service: {
        _id: service._id,
        name: service.name,
        price: service.price
      },
      doctor: { ...doctor }
    }

    navigate('/dashboard/checkout', { state: stateData })
  }


  const footer = selectedDate ? <p>You selected {format(selectedDate, 'PP')}.</p> : <p>Please pick a day.</p>;

  if (isLoading) return <div>loading</div>

  return (
    <div>
      <div className='flex justify-between mb-7'>
        <div>
          <h3 className="text-xl text-secondary font-bold mb-2">{service?.name}</h3>
          <p className='text-sm text-accent mb-2'>{`Price: $${service?.price} / Appointment`}</p>
          <p className='text-sm text-accent'>{totalSlots ? `Total ${totalSlots} slots available` : 'No slots available'}</p>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="form-control">
              <label className="input-group input-group-sm">
                <input type="text" defaultValue={formatedDate} readOnly className="input input-bordered !input-sm" />
                <span><SlCalender></SlCalender></span>
              </label>
            </div>
            <div tabIndex={0} className="dropdown-content p-2 shadow bg-base-100 rounded-box">
              <DayPicker
                mode="single"
                disabled={{ before: new Date(), after: new Date().setDate(date.getDate() + 6) }}
                selected={selectedDate}
                onSelect={(event) => {
                  if (event) setSelectedDate(event);
                }}
                footer={footer}
              />

            </div>
          </div>

        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {
          service?.doctors.map((doctor, i) => {
            return (
              <div key={i} className='card bg-white shadow-xl relative'>
                <form onSubmit={(event) => handleCheckout(event, `radio_${i}`, {
                  _id: doctor._id,
                  name: doctor.name,
                  email: doctor.email,
                  qualifications: doctor.qualifications,
                  designation: doctor.designation,
                  image: doctor.image
                })}>
                  <div className='card-body justify-between'>
                    <div>
                      <p className='text-sm text-accent absolute top-5 right-5'>{doctor?.slots.length} slots available</p>
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
                          {
                            doctor.slots.map((slot, index) => {
                              return (
                                <span key={index} className='inline-block'>
                                  <label
                                    className="label cursor-pointer text-xs py-0 pl-[6px] pr-2 rounded-sm mr-2"
                                    style={{ background: "rgb(208 208 208)" }}
                                  >
                                    <input
                                      type="radio"
                                      name={`radio_${i}`}
                                      value={slot}
                                      className="radio radio-xs checked:bg-red-500 mr-1"
                                      required
                                    />
                                    <span className="label-text">{slot}</span>
                                  </label>
                                </span>
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div>
                      {
                        doctor.slots.length > 0 ?
                          <button className='btn btn-primary btn-sm text-xs min-h-[25px] h-[25px]'>Book Now</button>
                          :
                          <div className='inline cursor-not-allowed'>
                            <button className='btn btn-primary btn-sm text-xs min-h-[25px] h-[25px]' disabled >Book Now</button>
                          </div>
                      }
                    </div>
                  </div>
                </form>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default HospitalServicesDetails;