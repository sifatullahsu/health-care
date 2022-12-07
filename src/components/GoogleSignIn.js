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
      <button onClick={handleGoogleSignIn} className='bg-white py-2 px-5 border border-border'>
        <FcGoogle className='inline'></FcGoogle> Google
      </button>
    </>
  );
};

export default GoogleSignIn;