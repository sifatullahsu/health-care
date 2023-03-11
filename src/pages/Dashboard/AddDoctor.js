import React from 'react';
import { useEffect } from 'react';
import DoctorForm from '../../components/Dashboard/DoctorForm';
import Heading from '../../components/Heading';
import { useData } from '../../contexts/DataProvider';

const AddDoctor = () => {
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Add Doctor'), [setBreadcrumbs]);

  return (
    <>
      <Heading title='Add New Doctor'></Heading>
      <DoctorForm></DoctorForm>
    </>
  );
};

export default AddDoctor;