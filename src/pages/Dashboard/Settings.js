import React from 'react';
import { useEffect } from 'react';
import SettingsForm from '../../components/Dashboard/SettingsForm';
import Heading from '../../components/Heading';
import { useAuth } from '../../contexts/AuthProvider';
import { useData } from '../../contexts/DataProvider';

const Settings = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Settings'), [setBreadcrumbs]);

  const { user } = useAuth();

  return (
    <>
      <Heading title='Settings'></Heading>
      <SettingsForm user={user} isSettings={true}></SettingsForm>
    </>
  );
};

export default Settings;