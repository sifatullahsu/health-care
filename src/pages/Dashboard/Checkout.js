import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Navigate, useLoaderData, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Checkout = () => {
  const paramsId = useLoaderData();
  const state = useLocation().state;
  const { _id, name, price, date, slots } = state;
  const { user } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const handleCheckout = (data) => {
    console.log(data);
  }

  const { data: service = {} } = useQuery({
    queryKey: ['service', paramsId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/services/${paramsId}`);
      const data = await res.json();

      return data?.[0];
    }
  });

  console.log(service);

  if (!state) {
    return <Navigate to='/dashboard/hospital-services'></Navigate>
  }

  return (
    <div>
      <ul className="steps w-full">
        <li className="step step-primary">Payment</li>
        <li className="step">Successful</li>
      </ul>

      <form onSubmit={handleSubmit(handleCheckout)}>
        <div className='grid grid-cols-1 gap-5'>
          <div>
            <input {...register("serviceID")} defaultValue={_id} readOnly hidden />
            <input {...register("serviceName")} defaultValue={name} readOnly hidden />
            <input {...register("price")} defaultValue={price} readOnly hidden />
            <input {...register("appointmentDate")} defaultValue={date} readOnly hidden />
            <input {...register("appointmentSlot")} readOnly hidden />

            <div className='grid grid-cols-2 gap-5'>
              <div className="form-control">
                <label className="label"><span className="label-text">First Name</span></label>
                <input {...register("firstName", { required: true })} />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Last Name</span></label>
                <input {...register("lastName", { required: true })} />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Age</span></label>
              <input {...register("age", { required: true })} type='number' min="1" max="70" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Appointment slots</span>
                <span className="label-text-alt">{state.date}</span>
              </label>
              <select {...register("slots", { required: true })}>
                <option value=''>Select appointment slots</option>
                {
                  state.slots.map((slot, index) => {
                    return (
                      <option key={index} value={slot}>{slot}</option>
                    );
                  })
                }
              </select>
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
              <input {...register("email", { required: true })} defaultValue={user?.email} readOnly />
            </div>
          </div>
          <div>

          </div>
        </div>

        <button type="submit" className='btn btn-primary mt-5 w-full'>Confirm Booking</button>
      </form>
    </div>
  );
};

export default Checkout;