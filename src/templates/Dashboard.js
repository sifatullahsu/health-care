import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Dashboard/AdminSidebar';
import DashHeader from '../components/DashHeader';

const DashboardTemp = () => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side lg:overflow-y-visible">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <AdminSidebar></AdminSidebar>
        </div>

        <div className="drawer-content" style={{ backgroundColor: '#F5F7F8' }}>
          <DashHeader></DashHeader>
          <div className='px-5 py-3'>
            <Outlet></Outlet>
          </div>
        </div>

      </div>
    </>
  );
};

export default DashboardTemp;