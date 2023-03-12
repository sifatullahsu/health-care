import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../components/Dashboard/CheckoutForm'
import CheckoutSidebar from '../../components/CheckoutSidebar';
import CheckoutSuccessful from '../../components/CheckoutSuccessful';
import { useData } from '../../contexts/DataProvider';
import Heading from '../../components/Heading';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

const Checkout = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Checkout'), [setBreadcrumbs]);

  const state = useLocation().state;

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [successData, setSuccessData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

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
        setLoading(false);
      })
      .catch(() => setLoading(false))
  }, [state]);

  return (
    <>
      <div className='flex flex-wrap md:flex-nowrap space-y-5 md:space-y-0 md:space-x-5'>

        <div className='basis-full md:basis-4/6'>
          <Heading title="Checkout"></Heading>
          <ul className="checkout steps w-full text-xs uppercase mb-5">
            <li className={`step step-primary`}></li>
            <li className={`step step-primary`}></li>
            <li className={`step ${successData?.status && 'step-primary'}`}></li>
          </ul>

          {
            successData?.status &&
            <CheckoutSuccessful successData={successData}></CheckoutSuccessful>
          }

          {
            !loading ?
              <>
                {
                  stripePromise && clientSecret && !successData?.status &&
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm state={state} setSuccessData={setSuccessData}></CheckoutForm>
                  </Elements>
                }
              </>
              :
              <>
                <div className='grid grid-cols-2 gap-5 mb-5'>
                  <Skeleton height={40}></Skeleton>
                  <Skeleton height={40}></Skeleton>
                  <Skeleton height={40}></Skeleton>
                  <Skeleton height={40}></Skeleton>
                </div>
                <Skeleton height={260} className='mb-5'></Skeleton>
                <Skeleton height={40}></Skeleton>
              </>
          }



        </div>
        <div className='basis-full md:basis-2/6'>
          <CheckoutSidebar state={state}></CheckoutSidebar>
        </div>
      </div>
    </>
  );
};

export default Checkout;