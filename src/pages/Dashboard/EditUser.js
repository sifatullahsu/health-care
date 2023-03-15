import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import SettingsForm from '../../components/Dashboard/SettingsForm';
import Heading from '../../components/Heading';
import { useData } from '../../contexts/DataProvider';

const EditUser = () => {
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Edit User'), [setBreadcrumbs]);

  const user = useLoaderData();

  return (
    <>
      <Heading title='Edit User'></Heading>
      <SettingsForm user={user.data}></SettingsForm>
    </>
  );
};

export default EditUser;