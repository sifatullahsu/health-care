import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const SignUp = ({ from, loading, setLoading }) => {
  const { signUp, setIsUserCreating } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = (data) => {

    setLoading(true);

    signUp(data).then((results) => {
      setIsUserCreating(false);
      setLoading(false);

      if (results.status) {
        toast.success('user created successful!');
        navigate(from, { replace: true });
        reset();
      }
      else {
        toast.error(results.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>

      <p className='text-sm text-accent font-semibold mb-2'>Registration for free...</p>

      <div className="form-control sm">
        <label className="label"> <span className="label-text">Name</span></label>
        <input type="text" {...register("name", { required: "Name is Required" })} className="input input-bordered" />
      </div>

      <div className="form-control sm">
        <label className="label"> <span className="label-text">Email</span></label>
        <input type="email" {...register("email", { required: true })} className="input input-bordered" />
      </div>

      <div className="form-control sm relative">
        <label className="label"> <span className="label-text">Password</span></label>
        <span className='absolute right-1 top-10'>
          {
            passwordVisible ?
              <button type='button' className='btn-dash' onClick={() => setPasswordVisible(false)}>
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              </button>
              :
              <button type='button' className='btn-dash' onClick={() => setPasswordVisible(true)}>
                <AiOutlineEye></AiOutlineEye>
              </button>
          }
        </span>
        <input type={passwordVisible ? 'text' : 'password'} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be 6 characters long" }, })} className="input input-bordered" />
      </div>

      <input className='btn btn-primary btn-sm w-full h-[2.5rem] mt-6' value="Registration" type="submit" disabled={loading} />

    </form>
  );
};

export default SignUp;