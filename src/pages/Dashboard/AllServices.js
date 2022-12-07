import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AllServices = () => {

  const { data: services = [], refetch, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/services`);
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
          {services.map((service, index) => {
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllServices;