import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleSignUp = (data) => {

    try {
      createUser(data.email, data.password)
        .then(result => {

          if (result?.user) {
            fetch('https://the-health-care.vercel.app/api/v1/users/create', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ name: data.name, email: data.email, role: 'subscriber', uid: result?.user?.uid })
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                toast('User Created Successfully.');
                navigate('/');
              })
          }

        })
    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>

      <div className="form-control">
        <label className="label"> <span className="label-text">Name</span></label>
        <input type="text" {...register("name", { required: "Name is Required" })} className="input input-bordered" />
      </div>

      <div className="form-control">
        <label className="label"> <span className="label-text">Email</span></label>
        <input type="email" {...register("email", { required: true })} className="input input-bordered" />
      </div>

      <div className="form-control">
        <label className="label"> <span className="label-text">Password</span></label>
        <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be 6 characters long" }, })} className="input input-bordered" />
      </div>

      <input className='btn btn-primary btn-sm w-full h-[2.5rem] mt-6' value="Registration" type="submit" />

    </form>
  );
};

export default SignUp;