import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { FcGoogle } from 'react-icons/fc';


const GoogleSignIn = ({ from }) => {
  const { userSocialLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    userSocialLogin('google')
      .then(res => {
        toast.success('Successfully logged in!!');
        navigate('/');
      })
      .catch(err => {
        toast.error('Something is wrong!!');
      })
  }

  return (
    <>
      <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>
        <FcGoogle className='inline-block mr-2'></FcGoogle> CONTINUE WITH GOOGLE
      </button>
    </>
  );
};

export default GoogleSignIn;