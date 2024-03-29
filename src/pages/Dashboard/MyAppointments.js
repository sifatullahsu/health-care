import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Heading from '../../components/Heading';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../contexts/AuthProvider';
import { useData } from '../../contexts/DataProvider';
import AppointmentGrid from '../../templates/grids/AppointmentGrid';
import { getAppointmentsByUserId } from '../../queries/appointments';

const MyAppointments = () => {

  const { user } = useAuth();
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('My Appointments'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: myAppointments = [], isLoading } = useQuery({
    queryKey: ['myAppointments', pagination],
    queryFn: () => getAppointmentsByUserId(user._id, pagination.page, pagination.size)
  });

  return (
    <>
      <Heading title='My Appointments'></Heading>

      {
        myAppointments?.data?.length === 0 && !isLoading &&
        <p>You have not take any appointments yet...</p>
      }

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-10'>
        {
          (isLoading ? Array(4).fill('') : myAppointments?.data).map((appointment, i) =>
            <AppointmentGrid
              key={appointment._id || i}
              appointment={appointment}
              isLoading={isLoading}
            ></AppointmentGrid>)
        }
      </div>

      <Pagination
        data={myAppointments?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>

    </>
  );
};

export default MyAppointments;