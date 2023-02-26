import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

const MyAppointments = () => {

  const { user } = useAuth();

  const { data: myAppointments = [] } = useQuery({
    queryKey: ['myAppointments'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/appointments/list/${user?.data?._id}`);
      const data = await res.json();

      return data;
    }
  });

  console.log(myAppointments);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full ">
        <thead>
          <tr>
            <th>No.</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th className='text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myAppointments?.data?.map((appointment, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{appointment?.doctor?.name}</td>
                <td>{appointment?.date}</td>
                <td>{appointment?.slot}</td>
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

export default MyAppointments;