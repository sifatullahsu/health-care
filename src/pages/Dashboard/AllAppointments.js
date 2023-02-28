import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';

const AllAppointments = () => {

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments', pagination],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/appointments/list?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Doctor', 'Patient', 'Time', 'Actions']}></Thead>

          <tbody>
            {
              appointments?.data?.map((appointment, index) =>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{appointment?.doctor?.name}</td>
                  <td>{appointment?.patient?.name}</td>
                  <td>{`${appointment?.date} (${appointment?.slot})`}</td>
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
        data={appointments?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>
    </>
  );
};

export default AllAppointments;