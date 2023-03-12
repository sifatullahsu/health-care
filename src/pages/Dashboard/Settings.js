import React from 'react';
import { useEffect } from 'react';
import Heading from '../../components/Heading';
import { useData } from '../../contexts/DataProvider';

const Settings = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Settings'), [setBreadcrumbs]);

  return (
    <>
      <Heading title='Settings'></Heading>
    </>
  );
};

export default Settings;