import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthProvider';

const ForgetPassword = ({ from, loading, setLoading, setIsForgetPassword }) => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const { forgetPassword } = useAuth();
  const [loginError, setLoginError] = useState('');

  const handleLogin = data => {
    setLoading(true);
    setLoginError('');
    forgetPassword(data.email)
      .then(() => {
        toast.success('Check your email, also spam area!');
        setIsForgetPassword(false);
        reset();
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setLoginError(error.message);
      });
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>

      <p className='text-sm text-accent font-semibold mb-2'>Forget your password...</p>

      <div className="form-control sm">
        <label className="label"><span className="label-text">Email</span></label>
        <input type="text" {...register("email", { required: "Email Address is required" })} />
        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
      </div>

      <div className='text-right my-2'>
        <button
          type='button'
          className='text-sm text-accent font-semibold hover:underline'
          onClick={() => setIsForgetPassword(false)}
        >Back to login area?</button>
      </div>

      <input className='btn btn-primary btn-sm w-full h-[2.5rem]' value="Forget Password" type="submit" disabled={loading} />

      <div>{loginError && <p className='text-red-600'>{loginError}</p>}</div>

    </form>
  );
};

export default ForgetPassword;