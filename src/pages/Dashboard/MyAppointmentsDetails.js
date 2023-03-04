import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Countdown from '../../components/Countdown';
import { useCountdown } from '../../hooks/useCountdown';

import successfulImg from '../../assets/images/successful.png';


const MyAppointmentsDetails = () => {
  const id = useLoaderData();

  const { data: details = [], isLoading } = useQuery({
    queryKey: ['myAppointmentsDetails'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/appointments/single/${id}`);
      const data = await res.json();

      return data.data;
    }
  });

  const countdown = useCountdown(details?.date);

  return (
    <div className='relative'>
      <h3 className="text-xl text-secondary font-bold mb-2">{details?.service?.name}</h3>
      <p className='text-sm text-accent mb-10'>{`Price: $${details?.service?.price} / Appointment`}</p>

      <div className='grid grid-cols-2 gap-5'>
        <div>
          <div className='mb-5'>
            <h3 className="text-lg text-secondary font-bold capitalize">{details?.doctor?.name}</h3>
            <p className='text-sm text-accent max-w-xs'>{`${details?.doctor?.designation} - [${details?.doctor?.qualifications}]`}</p>
          </div>

          <div className=' top-7 right-10 space-y-3'>
            <div>
              <span className='text-xs text-gray-500'>Remaining Time</span>
              <Countdown data={countdown} className='mt-2'></Countdown>
            </div>
            <div>
              <span className='text-xs text-gray-500'>Appointment Time</span>
              <ul className='list-disc pl-5 text-sm'>
                <li>{details?.date}</li>
                <li>{details?.slot}</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg text-secondary font-bold ">More Details</h3>
          <div className="overflow-x-auto">
            <table className="table payment-table details rounded-none">
              <tbody>
                <tr>
                  <th>Amount Paid</th>
                  <td className='uppercase'>{`$${details.payment?.amount} `}</td>
                </tr>
                <tr>
                  <th>Transaction ID</th>
                  <td>{details.payment?.id}</td>
                </tr>
                <tr>
                  <th>Patient Name</th>
                  <td>{details?.patient?.name}</td>
                </tr>
                <tr>
                  <th>Patient Age</th>
                  <td>{details?.patient?.age}</td>
                </tr>
                <tr>
                  <th>Contact Number</th>
                  <td>{details?.patient?.number}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <img src={successfulImg} className='w-28 absolute -top-10 right-0' alt="" />
      <p className='text-lg font-semibold  mt-20 text-gray-500'>Thanks for using our service!!</p>

    </div>
  );
};

export default MyAppointmentsDetails;