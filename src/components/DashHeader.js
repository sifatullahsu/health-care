import React from 'react';
import { Link } from 'react-router-dom';

const DashHeader = () => {
  return (
    <header className='mb-5'>
      <div className="text-sm breadcrumbs text-accent">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to=''>Dashboard</Link></li>
          <li>Hospital Services</li>
        </ul>
        <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
    </header>
  );
};

export default DashHeader;