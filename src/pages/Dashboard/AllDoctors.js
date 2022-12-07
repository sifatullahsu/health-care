import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllDoctors = () => {

  const { data: doctors = [], refetch, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/doctors`);
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
            <th>Price</th>
            <th className='text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{doctor?.name}</td>
                <td>${doctor?.price}</td>
                <td className='text-right'>
                  <Link to={`/dashboard/doctors/${doctor?._id}`}><FaRegEdit className='inline'></FaRegEdit></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllDoctors;