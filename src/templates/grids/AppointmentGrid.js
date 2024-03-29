import React from 'react';
import Countdown from '../../components/Countdown';
import { useCountdown } from '../../hooks/useCountdown';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const AppointmentGrid = ({ appointment, isLoading }) => {

  const countdown = useCountdown(appointment?.date);

  return (
    <div key={appointment?._id} className='card bg-white shadow-xl'>
      {
        !isLoading ?
          <>
            <div className='card-body relative'>
              <span className='text-xs text-gray-500'>ID: {appointment?._id}</span>
              <h3 className="text-lg text-secondary font-bold capitalize">{appointment?.doctor.name}</h3>
              <p className='text-sm text-accent'>{`${appointment?.doctor?.designation} - [${appointment?.doctor?.qualifications}]`}</p>

              <div className='text-sm text-accent font-semibold space-x-5 mt-5'>
                <span>Date: {appointment?.date}</span>
                <span>Slot: {appointment?.slot}</span>
              </div>

              <Countdown data={countdown} className='mt-3'></Countdown>
              <div className='absolute right-6'>
                <Link to={`/dashboard/my-appointments/${appointment?._id}`} className='btn btn-ghost btn-sm px-2'>
                  <AiOutlineEye className='text-xl'></AiOutlineEye>
                </Link>
              </div>
            </div>
          </>
          :
          <>
            <div className='card-body'>
              <div>
                <Skeleton width="35%"></Skeleton>
                <Skeleton width="65%" height={25}></Skeleton>
                <Skeleton width="55%" className='mt-2 mb-5'></Skeleton>
                <Skeleton count={4}></Skeleton>
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default AppointmentGrid;