import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import GoogleSignIn from './GoogleSignIn';

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleSignUp = (data) => {

    try {
      createUser(data.email, data.password)
        .then(result => {

          if (result?.user) {
            fetch('http://localhost:5000/api/v1/users/create', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ name: data.name, role: 'subscriber', uid: result?.user?.uid })
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
    <div className='container my-24'>
      <div className='max-w-xl mx-auto'>
        <h2 className='text-4xl font-semibold uppercase text-center'>Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>

          <div className="form-control">
            <label className="label"> <span className="label-text">Name</span></label>
            <input type="text" {...register("name", {
              required: "Name is Required"
            })} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label"> <span className="label-text">Email</span></label>
            <input type="email" {...register("email", {
              required: true
            })} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label"> <span className="label-text">Password</span></label>
            <input type="password" {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be 6 characters long" },
            })} className="input input-bordered" />
          </div>

          <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />

        </form>
        <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
        <div className="divider">OR</div>
        <GoogleSignIn></GoogleSignIn>
      </div>
    </div>
  );
};

export default SignUp;