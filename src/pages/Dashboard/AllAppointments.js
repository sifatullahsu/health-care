import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useData } from '../../contexts/DataProvider';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AiOutlineEye } from 'react-icons/ai';
import Heading from '../../components/Heading';

const AllAppointments = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Appointments'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments', pagination],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/list?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>
      <Heading title='All Appointments'></Heading>

      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Doctor', 'Patient', 'Time', 'Actions']}></Thead>

          <tbody>
            {
              !isLoading ?
                <>
                  {
                    appointments?.data?.map((appointment, index) =>
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{appointment?.doctor?.name}</td>
                        <td>{appointment?.patient?.name}</td>
                        <td>{`${appointment?.date} (${appointment?.slot})`}</td>
                        <td className='text-right'>
                          <Link to={`/dashboard/appointments/${appointment?._id}`}>
                            <AiOutlineEye className='inline'></AiOutlineEye>
                          </Link>
                        </td>
                      </tr>
                    )
                  }
                </>
                :
                <>
                  {
                    Array(10).fill('').map((_, i) =>
                      <tr key={i}>
                        <th><Skeleton /></th>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                      </tr>
                    )
                  }
                </>
            }
          </tbody>

        </table>
      </div>

      <Pagination
        data={appointments?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>
    </>
  );
};

export default AllAppointments;