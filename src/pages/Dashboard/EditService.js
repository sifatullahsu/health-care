import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ServiceForm from '../../components/Dashboard/ServiceForm';

const EditService = () => {
  const service = useLoaderData();

  return (
    <ServiceForm data={service?.data}></ServiceForm>
  );
};

export default EditService;