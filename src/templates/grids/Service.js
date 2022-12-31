import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

const Service = ({ service, selectedDate }) => {
  const { _id, name, price, doctors } = service;

  return (
    <div className="card bg-white shadow-xl">
      <div className="card-body">
        <h2 className="text-xl text-secondary font-bold">{name}</h2>
        <p className='text-sm text-accent'>{`Price: $${price} / Appointment`}</p>
        <p className='text-sm text-accent'>No spaces available</p>
        <Swiper
          slidesPerView={1}
          grid={{
            rows: 2,
            fill: "row",
          }}
          spaceBetween={5}
          navigation={true}
          modules={[Grid, Navigation]}
          className="mySwiper"
        >
          {doctors.map((doctor) => {
            return (
              <SwiperSlide key={doctor._id}>
                <div className='flex gap-3 pt-2 pb-3 shadow-sm'>
                  <div className='basis-14'>
                    <img src={doctor.image} className='w-full h-12 mt-1' alt="" />
                  </div>
                  <div className='basis-full'>
                    <div>
                      <h3 className="text-lg text-secondary font-bold capitalize">{doctor.name}</h3>
                      <p className='text-sm text-accent text-ellipsis'>{doctor.designation}</p>
                    </div>
                    <p className='text-sm text-accent'>{doctor.slots.length} spaces available</p>
                    <div className='absolute top-2 right-2'>
                      <div className="tooltip tooltip-left" data-tip={doctor.qualifications}>
                        <FaInfoCircle></FaInfoCircle>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Link to={`/dashboard/hospital-services/${_id}`} className='btn btn-primary btn-sm mt-3'>Book Appointment</Link>
      </div>
    </div>
  );
};

export default Service;











/* 

 const { _id, name, price, slots } = service;

  const serviceState = {
    _id,
    name,
    price,
    date: format(selectedDate, 'PP'),
    slots
  }

  return (
    <div className="card bg-white shadow-xl">
      <div className="card-body">
        <h2 className="text-xl text-secondary font-bold">{name}</h2>
        <p className='text-sm text-accent'>{slots?.length > 0 ? slots[0] : 'Try Another day'}</p>
        <p className='text-sm text-accent'>{slots?.length} {slots?.length > 1 ? 'spaces' : 'space'} available</p>
        <Link to={`/dashboard/checkout/${_id}`} state={serviceState} className='btn btn-primary btn-sm mt-3'>Book Appointment</Link>
      </div>
    </div>
  );



*/