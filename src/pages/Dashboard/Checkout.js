import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../components/Dashboard/CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_PK);

const Checkout = () => {

  const state = useLocation().state;

  return (
    <div className='flex space-x-5'>

      <div className='basis-4/6'>

        <ul className="steps w-full">
          <li className="step step-primary">Payment</li>
          <li className="step">Successful</li>
        </ul>

        <Elements stripe={stripePromise}>
          <CheckoutForm state={state}></CheckoutForm>
        </Elements>

      </div>
      <div className='basis-2/6'>
        <div className='bg-white p-5'>
          <h3 className="text-xl text-secondary font-bold mb-2">{state.service.name}</h3>
          <p className='text-sm text-accent mb-5'>{`Price: $${state.service.price} / Appointment`}</p>

          <div className='flex space-x-3 mb-5'>
            <img src={state.doctor.image} className='basis-14 h-12 mt-1' alt="" />
            <div className='basis-full'>
              <h3 className="text-lg text-secondary font-bold capitalize">{state.doctor.name}</h3>
              <p className='text-sm text-accent'>{`${state.doctor.designation} - [${state.doctor.qualifications}]`}</p>
            </div>
          </div>

          <h3 className="text-base text-secondary font-bold mb-2">Appointment Time</h3>
          <ul className='list-disc pl-10 text-sm'>
            <li>{state.appointment.date}</li>
            <li>{state.appointment.slot}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;