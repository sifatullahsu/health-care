import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataProvider';
import Header from './Header';

const DashHeader = () => {

  const { breadcrumbs } = useData();

  return (
    <header className='mb-5'>
      <div className='lg:hidden'><Header></Header></div>

      <div className="text-sm breadcrumbs text-accent px-5 py-3">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li>{breadcrumbs}</li>
        </ul>
      </div>
    </header>
  );
};

export default DashHeader;