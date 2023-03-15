import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { getUserByUid, createUser } from '../queries/users';


const GoogleSignIn = ({ from, setLoading }) => {
  const { userSocialLogin, setIsUserCreating } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {

    try {
      setLoading(true);
      setIsUserCreating(true);
      const authenticate = await userSocialLogin('google');
      const isUserExist = await getUserByUid(authenticate.user.uid);

      if (!isUserExist.status) {

        const data = {
          name: authenticate.user.displayName,
          email: authenticate.user.email,
          role: 'subscriber',
          uid: authenticate.user.uid
        }

        const res = await createUser(data);

        if (res.status) {
          setIsUserCreating(false);
          setLoading(false);
          toast.success('Successfully logged in!!');
          navigate(from, { replace: true });
        }
        else {
          setIsUserCreating(false);
          setLoading(false);
          toast.error('Something is wrong!!');
        }
      }
      else {
        setIsUserCreating(false);
        setLoading(false);
        toast.success('Successfully logged in!!');
        navigate(from, { replace: true });
      }
    }
    catch (err) {
      setIsUserCreating(false);
      setLoading(false);
      toast.error('Something is wrong!!');
    }
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