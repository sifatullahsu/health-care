import React from 'react';
import Countdown from '../../components/Countdown';
import { useCountdown } from '../../hooks/useCountdown';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AppointmentGrid = ({ appointment, i }) => {

  const countdown = useCountdown(appointment.date);

  return (
    <div key={appointment?._id} className='card bg-white shadow-xl'>
      <div className='card-body relative'>
        <span className='text-xs text-gray-500'>ID: {appointment?._id}</span>
        <h3 className="text-lg text-secondary font-bold capitalize">{appointment?.doctor.name}</h3>
        <p className='text-sm text-accent'>MBBS (DMC), FRCS(Glasg), FCPS (Urol) FCPS(S), FACS(USA), MCPS</p>
        <p className='text-sm text-accent'>Senior Consultant</p>

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
    </div>
  );
};

export default AppointmentGrid;