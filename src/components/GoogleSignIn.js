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
        navigate(from);
      })
      .catch(err => {
        toast.error('Something is wrong!!');
      })
  }

  return (
    <div className='text-center'>
      <button onClick={handleGoogleSignIn} className='btn btn-sm btn-primary text-xs'>
        <FcGoogle className='inline-block mr-2'></FcGoogle> CONTINUE WITH GOOGLE
      </button>
    </div>
  );
};

export default GoogleSignIn;