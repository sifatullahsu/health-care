import React from 'react';
import { useEffect } from 'react';
import { useData } from '../../contexts/DataProvider';

const Dashboard = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Welcome'), [setBreadcrumbs]);

  return (
    <div>

    </div>
  );
};

export default Dashboard;