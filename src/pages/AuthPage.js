import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleSignIn from '../components/GoogleSignIn';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import spinner from '../assets/images/spinner.webp';
import ForgetPassword from '../components/ForgetPassword';

const AuthPage = () => {
  const location = useLocation();
  const from = location.state || '/dashboard';
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState('login');
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  return (
    <section style={{ backgroundColor: "rgb(245, 247, 248)" }}>
      <div className='container py-16' >

        <div className='max-w-4xl mx-auto px-8 pt-5 pb-8 bg-white shadow-xl grid grid-cols-1 md:grid-cols-3 gap-10'>

          <div className='md:col-span-2 relative'>
            <div className="tabs">
              <div className={`tab md:tab-lg tab-bordered ${tab === 'login' ? 'tab-active' : ''}`} onClick={() => {
                setTab('login');
                setIsForgetPassword(false);
              }}>Login</div>
              <div className={`tab md:tab-lg tab-bordered ${tab === 'registration' ? 'tab-active' : ''}`} onClick={() => setTab('registration')}>Registration</div>
            </div>

            <div className='pt-5'>
              {
                tab === 'login' ?
                  !isForgetPassword ?
                    <Login from={from} loading={loading} setLoading={setLoading} setIsForgetPassword={setIsForgetPassword}></Login>
                    :
                    <ForgetPassword from={from} loading={loading} setLoading={setLoading} setIsForgetPassword={setIsForgetPassword}></ForgetPassword>
                  :
                  <SignUp from={from} loading={loading} setLoading={setLoading}></SignUp>
              }
              <div className="divider">OR</div>
              <GoogleSignIn from={from} setLoading={setLoading}></GoogleSignIn>
            </div>

            {
              loading &&
              <div className='absolute top-0 right-0'>
                <img src={spinner} alt="" className='w-10' />
              </div>
            }
          </div>

          <div>
            <h3 className="text-xl text-secondary font-bold mb-2">Our Accounts!</h3>
            <p className='text-sm text-accent mb-2'>You can also logged in via existing accounts.</p>
            <div className='text-sm text-accent'>
              <p><span className='font-bold'>Admin:</span> admin@email.com</p>
              <p><span className='font-bold'>Doctor:</span> doctor@email.com</p>
              <p><span className='font-bold'>User:</span> user@email.com</p>
              <p className='mt-3'><span className='font-bold'>Password:</span> 123456</p>
            </div>
          </div>

        </div>

      </div>
    </section>

  );
};

export default AuthPage;

/* 
<div className='tabbed round'>
  <ul>
    <li className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Login</li>
    <li className={tab === 'registration' ? 'active' : ''} onClick={() => setTab('registration')}>Registration</li>
  </ul>
</div> 
*/