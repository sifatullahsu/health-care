import React from 'react';
import { useEffect } from 'react';
import { useData } from '../../contexts/DataProvider';

const Settings = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Settings'), [setBreadcrumbs]);

  return (
    <div>

    </div>
  );
};

export default Settings;