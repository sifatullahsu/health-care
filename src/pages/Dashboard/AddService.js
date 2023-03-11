import React, { useEffect } from 'react';
import ServiceForm from '../../components/Dashboard/ServiceForm';
import Heading from '../../components/Heading';
import { useData } from '../../contexts/DataProvider';

const AddService = () => {
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Add Service'), [setBreadcrumbs]);

  return (
    <>
      <Heading title='Add New Service'></Heading>
      <ServiceForm></ServiceForm>
    </>
  );
};

export default AddService;