import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import DashItem from '../../components/DashItem';
import { useAuth } from '../../contexts/AuthProvider';
import { useData } from '../../contexts/DataProvider';

const Dashboard = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Welcome'), [setBreadcrumbs]);

  const { user } = useAuth();

  const { data: dash = {}, isLoading } = useQuery({
    queryKey: ['dash'],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/dash-data/${user._id}`);
      const data = await res.json();

      return data.data;
    }
  });

  return (
    <div className='space-y-5'>
      <div className='space-y-1'>
        <h3 className="text-xl text-secondary font-bold capitalize">Welcome {user?.name}</h3>
        <p className="text-base text-accent">Here you can manage your appointment online!</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        <DashItem title='Total Spend' data={`$ ${dash?.totalSpend}`} isLoading={isLoading}></DashItem>
        <DashItem title='Appointments' data={dash?.appointments?.total} isLoading={isLoading}></DashItem>
        <DashItem title='Upcoming' data={dash?.appointments?.upcoming} isLoading={isLoading}></DashItem>
        <DashItem title='Completed' data={dash?.appointments?.completed} isLoading={isLoading}></DashItem>
      </div>
    </div>
  );
};

export default Dashboard;