import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { useData } from '../../contexts/DataProvider';

const Dashboard = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Welcome'), [setBreadcrumbs]);

  const { user } = useAuth();

  const { data: dash = {}, isLoading } = useQuery({
    queryKey: ['dash'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/appointments/dash-data/${user.data._id}`);
      const data = await res.json();

      return data.data;
    }
  });

  return (
    <div className='space-y-5'>
      <div className='space-y-1'>
        <h3 className="text-xl text-secondary font-bold capitalize">Welcome {user?.data?.name}</h3>
        <p className="text-base text-accent">Here you can manage your appointment online!</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <div className='bg-white p-5 rounded space-y-3'>
          <h3 className="text-lg text-secondary font-bold capitalize">Total Spend</h3>
          <p className="text-base text-accent">$ {dash?.totalSpend}</p>
        </div>
        <div className='bg-white p-5 rounded space-y-3'>
          <h3 className="text-lg text-secondary font-bold capitalize">Appointments</h3>
          <p className="text-base text-accent">{dash?.appointments?.total}</p>
        </div>
        <div className='bg-white p-5 rounded space-y-3'>
          <h3 className="text-lg text-secondary font-bold capitalize">Upcoming</h3>
          <p className="text-base text-accent">{dash?.appointments?.upcoming}</p>
        </div>
        <div className='bg-white p-5 rounded space-y-3'>
          <h3 className="text-lg text-secondary font-bold capitalize">Completed</h3>
          <p className="text-base text-accent">{dash?.appointments?.completed}</p>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;