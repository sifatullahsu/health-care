import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Countdown from '../../components/Countdown';
import { useCountdown } from '../../hooks/useCountdown';
import Skeleton from 'react-loading-skeleton';

import successfulImg from '../../assets/images/successful.png';
import { useData } from '../../contexts/DataProvider';
import { getAppointment } from '../../queries/appointments';


const MyAppointmentsDetails = () => {
  const id = useLoaderData();

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Appointment Details'), [setBreadcrumbs]);

  const { data: details = {}, isLoading } = useQuery({
    queryKey: [`appointments-${id}`],
    queryFn: () => getAppointment(id)
  });

  const countdown = useCountdown(details?.data?.date);

  return (
    <div className='relative'>
      {
        !isLoading ?
          <>
            <h3 className="text-xl text-secondary font-bold mb-2">{details?.data?.service?.name}</h3>
            <p className='text-sm text-accent mb-10'>{`Price: $${details?.data?.service?.price} / Appointment`}</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <div className='mb-5'>
                  <h3 className="text-lg text-secondary font-bold capitalize">{details?.data?.doctor?.name}</h3>
                  <p className='text-sm text-accent max-w-xs'>{`${details?.data?.doctor?.designation} - [${details?.data?.doctor?.qualifications}]`}</p>
                </div>

                <div className='space-y-3'>
                  <div>
                    <span className='text-xs text-gray-500'>Remaining Time</span>
                    <Countdown data={countdown} className='mt-2'></Countdown>
                  </div>
                  <div>
                    <span className='text-xs text-gray-500'>Appointment Time</span>
                    <ul className='list-disc pl-5 text-sm'>
                      <li>{details?.data?.date}</li>
                      <li>{details?.data?.slot}</li>
                    </ul>
                  </div>
                </div>
                {
                  details?.data?.meeting?.id &&
                  <div className='mt-10'>
                    <a href={details?.data?.meeting.joinUrl} target='_blank' rel='noreferrer' className='btn btn-primary btn-sm px-10'>Join Meeting</a>
                  </div>
                }
              </div>

              <div>
                <h3 className="text-lg text-secondary font-bold ">More Details</h3>
                <div className="overflow-x-auto">
                  <table className="table payment-table details rounded-none">
                    <tbody>
                      <tr>
                        <th>Amount Paid</th>
                        <td className='uppercase'>{`$${details?.data.payment?.amount} `}</td>
                      </tr>
                      <tr>
                        <th>Transaction ID</th>
                        <td>{details?.data.payment?.id}</td>
                      </tr>
                      <tr>
                        <th>Patient Name</th>
                        <td>{details?.data?.patient?.name}</td>
                      </tr>
                      <tr>
                        <th>Patient Age</th>
                        <td>{details?.data?.patient?.age}</td>
                      </tr>
                      <tr>
                        <th>Contact Number</th>
                        <td>{details?.data?.patient?.number}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{details?.data?.patient?.email}</td>
                      </tr>
                      <tr>
                        <th>ID</th>
                        <td>{details?.data?.metaInfo?.author}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <img src={successfulImg} className='w-14 md:w-28 absolute -top-10 -right-3 md:right-0' alt="" />
            <p className='text-lg font-semibold mt-10 md:mt-20 text-gray-500'>Thanks for using our service!!</p>

          </>
          :
          <>
            <Skeleton width={250} height={25} />
            <Skeleton width={130} className='mb-10 md:mb-14' />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 max-w-4xl'>
              <div>
                <Skeleton width={200} height={25} />
                <Skeleton width={100} className='mb-8' />
                <Skeleton count={5} />
              </div>
              <Skeleton count={7} height={23} />
            </div>

            <Skeleton width={200} className='mt-20' />
          </>
      }
    </div>
  );
};

export default MyAppointmentsDetails;