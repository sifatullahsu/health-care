import { PaymentElement, useElements, useStripe, } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthProvider';

const CheckoutForm = ({ state, setSuccessData }) => {

  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (data) => {

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
        payment_method_data: {
          billing_details: {
            name: data.name,
            email: user.email
          }
        }
      },
      redirect: 'if_required'
    })

    if (error) {
      return console.log(error);
    }

    setIsProcessing(false);

    const finalData = {
      date: state.appointment.date,
      slot: state.appointment.slot,
      service: { ...state.service },
      doctor: {
        _id: state.doctor._id,
        name: state.doctor.name
      },
      patient: {
        name: data.name,
        age: data.age,
        number: data.number,
        email: user.email
      },
      payment: {
        id: paymentIntent.id,
        amount: (paymentIntent.amount / 100).toFixed(2),
        currency: paymentIntent.currency
      },
      // metaInfo: {
      //   author: user.uid,
      //   created: '',
      //   lastModified: '',
      // }
    }

    fetch("http://localhost:5000/api/v1/appointment/create", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(finalData),
    })
      .then(res => res.json())
      .then(data => {
        setSuccessData({
          status: true,
          data: { ...finalData }
        });
        console.log(data);
      })
      .catch(err => console.log(err))

  }

  return (
    <form onSubmit={handleSubmit(handleCheckout)}>

      <div className='grid grid-cols-2 gap-x-5 gap-y-1'>
        <div className="form-control">
          <label className="label"><span className="label-text">Patient Name</span></label>
          <input {...register("name", { required: true })} />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Patient Age</span></label>
          <input {...register("age", { required: true })} type='number' min="1" max="70" />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Contact Number</span></label>
          <input {...register("number", { required: true })} type="tel" pattern="[0-9]{11}" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
            <span className="label-text-alt">Readonly field..</span>
          </label>
          <input defaultValue={user?.email} readOnly />
        </div>
      </div>

      <PaymentElement id='payment-element' className='mt-5'></PaymentElement>

      <button type="submit" className='btn btn-primary mt-5 w-full'>Confirm Booking</button>
    </form>
  );
};

export default CheckoutForm;