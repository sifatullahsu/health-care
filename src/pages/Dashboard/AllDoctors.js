import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';

const AllDoctors = () => {

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctors', pagination],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/doctors/list?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Name', 'Email', 'Designation', 'Actions']}></Thead>

          <tbody>
            {
              doctors?.data?.map((doctor, index) =>
                <tr key={doctor?._id}>
                  <th>{doctors?.pagination?.start + index}</th>
                  <td>{doctor?.name}</td>
                  <td>{doctor?.email}</td>
                  <td>{doctor?.designation}</td>
                  <td className='text-right'>
                    <Link to={`/dashboard/doctors/${doctor?._id}`}>
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
        data={doctors?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>

    </>
  );
};

export default AllDoctors;