import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleSignIn from '../components/GoogleSignIn';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const AuthPage = () => {
  const location = useLocation();
  const from = location.state || '/dashboard';

  const [tab, setTab] = useState('login')

  return (
    <div className='container py-16'>

      <div className='max-w-lg mx-auto'>
        <div className='tabbed round'>
          <ul>
            <li className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Login</li>
            <li className={tab === 'registration' ? 'active' : ''} onClick={() => setTab('registration')}>Registration</li>
          </ul>
        </div>

        <div className='p-5 pt-7'>
          {tab === 'login' ? <Login from={from}></Login> : <SignUp></SignUp>}

          <div className="divider">OR</div>
          <GoogleSignIn></GoogleSignIn>
        </div>
      </div>

    </div>
  );
};

export default AuthPage;