import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useData } from '../../contexts/DataProvider';

const AllUsers = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Users'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', pagination],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/list?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>
      <Heading title='All Users'></Heading>

      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Name', 'Email', 'Role']}></Thead>

          <tbody>
            {
              !isLoading ?
                <>
                  {
                    users?.data?.map((user, index) =>
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{user?.name}</td>
                        <td>{user?.uid}</td>
                        <td>{user?.role}</td>
                        {/* <td className='text-right'>
                          <Link to={`/dashboard/users/${user?._id}`}><FaRegEdit className='inline'></FaRegEdit></Link>
                        </td> */}
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
                        {/* <td><Skeleton /></td> */}
                      </tr>
                    )
                  }
                </>
            }
          </tbody>

        </table>
      </div>

      <Pagination
        data={users?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>
    </>
  );
};

export default AllUsers;