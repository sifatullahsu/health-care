import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllUsers = () => {

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/users/list`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full ">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className='text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((user, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.uid}</td>
                <td>{user?.role}</td>
                <td className='text-right'>
                  <Link to={`/dashboard/users/${user?._id}`}><FaRegEdit className='inline'></FaRegEdit></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;