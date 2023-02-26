import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';

const AllAppointments = () => {

  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/appointments/list`);
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
            <th>Doctor</th>
            <th>Patient</th>
            <th>Time</th>
            <th className='text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.data?.map((appointment, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{appointment?.doctor?.name}</td>
                <td>{appointment?.patient?.name}</td>
                <td>{`${appointment?.date} (${appointment?.slot})`}</td>
                <td className='text-right'>
                  <Link to={`/dashboard/appointments/${appointment?._id}`}><FaRegEdit className='inline'></FaRegEdit></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointments;