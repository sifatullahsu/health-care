import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useData } from '../../contexts/DataProvider';

const AllServices = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Services'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', pagination],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/list?page=${pagination.page}&size=${pagination.size}`);
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
              !isLoading ?
                <>
                  {
                    services?.data?.map((service, index) =>
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{service.name}</td>
                        <td>${service.price}</td>
                        <td className='text-right'>
                          <Link to={`/dashboard/services/${service._id}`}>
                            <FaRegEdit className='inline'></FaRegEdit>
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
                      </tr>
                    )
                  }
                </>
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