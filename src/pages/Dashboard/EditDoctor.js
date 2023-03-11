import React from 'react';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import DoctorForm from '../../components/Dashboard/DoctorForm';
import Heading from '../../components/Heading';
import { useData } from '../../contexts/DataProvider';

const EditDoctor = () => {
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Edit Doctor'), [setBreadcrumbs]);

  const doctor = useLoaderData();

  return (
    <>
      <Heading title='Edit Doctor'></Heading>
      <DoctorForm data={doctor?.data}></DoctorForm>
    </>
  );
};

export default EditDoctor;