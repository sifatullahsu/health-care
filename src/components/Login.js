import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Login = ({ from, loading, setLoading }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = data => {
    setLoading(true);
    setLoginError('');
    signIn(data.email, data.password)
      .then(() => {
        toast.success('login successful!');
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch(error => {
        setLoading(false);
        setLoginError(error.message);
      });
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>

      <p className='text-sm text-accent font-semibold mb-2'>Welcome! please login...</p>

      <div className="form-control sm">
        <label className="label"><span className="label-text">Email</span></label>
        <input type="text" {...register("email", { required: "Email Address is required" })} />
        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
      </div>

      <div className="form-control sm">
        <label className="label"> <span className="label-text">Password</span></label>
        <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be 6 characters or longer' } })} className="input input-bordered" />
        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
      </div>

      <div className='text-right my-2'>
        <label><span className="label-text">Forget Password?</span></label>
      </div>

      <input className='btn btn-primary btn-sm w-full h-[2.5rem]' value="Login" type="submit" disabled={loading} />

      <div>{loginError && <p className='text-red-600'>{loginError}</p>}</div>

    </form>
  );
};

export default Login;