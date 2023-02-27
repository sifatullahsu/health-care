import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';

const AllServices = () => {

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', pagination],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/services/list?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Name', 'Price', 'Actions']}></Thead>

          <tbody>
            {
              services?.data?.map((service, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{service.name}</td>
                    <td>${service.price}</td>
                    <td className='text-right'>
                      <Link to={`/dashboard/services/${service._id}`}><FaRegEdit className='inline'></FaRegEdit></Link>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>

        </table>
      </div>

      <Pagination
        data={services?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>
    </>
  );
};

export default AllServices;