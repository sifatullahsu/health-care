import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useAuth } from '../../contexts/AuthProvider';
import { useData } from '../../contexts/DataProvider';

const MyAppointments = () => {

  const { user } = useAuth();
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('My Appointments'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: myAppointments = [], isLoading } = useQuery({
    queryKey: ['myAppointments', pagination],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/appointments/list/${user?.data?._id}?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>

      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Doctor', 'Date', 'Time', 'Actions']}></Thead>

          <tbody>
            {
              myAppointments?.data?.map((appointment, index) =>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{appointment?.doctor?.name}</td>
                  <td>{appointment?.date}</td>
                  <td>{appointment?.slot}</td>
                  <td className='text-right'>
                    <Link to={`/dashboard/appointments/${appointment?._id}`}>
                      <FaRegEdit className='inline'></FaRegEdit>
                    </Link>
                  </td>
                </tr>
              )
            }
          </tbody>

        </table>
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