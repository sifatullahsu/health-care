import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../components/Dashboard/CheckoutForm'
import CheckoutSidebar from '../../components/CheckoutSidebar';
import CheckoutSuccessful from '../../components/CheckoutSuccessful';
import { useData } from '../../contexts/DataProvider';

const Checkout = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Checkout'), [setBreadcrumbs]);

  const state = useLocation().state;

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [successData, setSuccessData] = useState(false);

  useEffect(() => {
    fetch("https://the-health-care.vercel.app/api/v1/appointments/create-payment-intent", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ price: state.service.price }),
    })
      .then(res => res.json())
      .then(data => {
        setStripePromise(loadStripe(data.publishableKey));
        setClientSecret(data.clientSecret);
      })
  }, [state]);

  return (
    <div className='flex flex-wrap md:flex-nowrap space-y-5 md:space-y-0 md:space-x-5'>

      <div className='basis-full md:basis-4/6'>

        <ul className="steps w-full text-xs uppercase mb-7">
          <li className={`step step-primary`}>Billing Area</li>
          <li className={`step ${successData?.status && 'step-primary'}`}>Successful</li>
        </ul>

        {
          successData?.status &&
          <CheckoutSuccessful successData={successData}></CheckoutSuccessful>
        }

        {
          stripePromise && clientSecret && !successData?.status &&
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm state={state} setSuccessData={setSuccessData}></CheckoutForm>
          </Elements>
        }

      </div>
      <div className='basis-full md:basis-2/6'>
        <CheckoutSidebar state={state}></CheckoutSidebar>
      </div>
    </div>
  );
};

export default Checkout;