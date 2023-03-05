import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../contexts/AuthProvider';
import { useData } from '../../contexts/DataProvider';
import AppointmentGrid from '../../templates/grids/AppointmentGrid';

const MyAppointments = () => {

  const { user } = useAuth();
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('My Appointments'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: myAppointments = [], isLoading } = useQuery({
    queryKey: ['myAppointments', pagination],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/list/${user?._id}?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>

      <div className='grid grid-cols-2 gap-5 mb-10'>
        {
          myAppointments?.data?.map((appointment, i) =>
            <AppointmentGrid
              key={appointment._id}
              appointment={appointment}
              i={i}
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