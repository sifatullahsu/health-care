import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const Service = ({ service, selectedDate }) => {
  const { _id, name, price, slots } = service;

  const serviceState = {
    _id,
    name,
    price,
    date: format(selectedDate, 'PP'),
    slots
  }

  return (
    <div className="card bg-white shadow-xl">
      <div className="card-body">
        <h2 className="text-xl text-secondary font-bold">{name}</h2>
        <p className='text-sm text-accent'>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
        <p className='text-sm text-accent'>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
        <Link to={`/dashboard/checkout/${_id}`} state={serviceState} className='btn btn-primary btn-sm mt-3'>Book Appointment</Link>
      </div>
    </div>
  );
};

export default Service;