import React from 'react';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import ServiceForm from '../../components/Dashboard/ServiceForm';
import Heading from '../../components/Heading';
import { useData } from '../../contexts/DataProvider';

const EditService = () => {
  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Edit Service'), [setBreadcrumbs]);

  const service = useLoaderData();

  return (
    <>
      <Heading title='Edit Service'></Heading>
      <ServiceForm data={service?.data}></ServiceForm>
    </>
  );
};

export default EditService;