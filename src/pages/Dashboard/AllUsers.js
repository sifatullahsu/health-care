import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useData } from '../../contexts/DataProvider';
import { editUser, getUsers } from '../../queries/users';
import { loop } from '../../utilities/utilities';

const AllUsers = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Users'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });


  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users', pagination],
    queryFn: async () => getUsers(pagination.page, pagination.size)
  });


  const handleMakeDoctor = (isDoctor, id) => {
    const data = {
      role: isDoctor ? 'doctor' : 'subscriber'
    }

    editUser(id, data)
      .then(data => {
        if (data.status) {
          refetch();
          toast.success(data.message);
        }
      })
  }

  return (
    <>
      <Heading title='All Users'></Heading>

      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Name', 'Email', 'Role', 'Make Doctor', 'Actions']}></Thead>

          <tbody>
            {
              loop(users?.data, 10)?.map((user, index) =>
                <tr key={user?._id || index}>
                  {
                    !isLoading ?
                      <>
                        <th>{index + 1}</th>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.role}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="toggle toggle-xs"
                            defaultChecked={user?.role === 'doctor' ? true : false}
                            disabled={user?.role === 'admin' ? true : false}
                            onChange={(e) => handleMakeDoctor(e.target.checked, user._id)}
                          />
                        </td>
                        <td className='text-right'>
                          <Link to={`/dashboard/users/${user?._id}`} className='btn-dash'>
                            <FaRegEdit className='inline'></FaRegEdit>
                          </Link>
                        </td>
                      </>
                      :
                      <>
                        <th><Skeleton /></th>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                      </>
                  }
                </tr>
              )
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