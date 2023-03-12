import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Dashboard/AdminSidebar';
import DashHeader from '../components/DashHeader';
import ScrollToTop from '../components/ScrollToTop';
import { useData } from '../contexts/DataProvider';

const DashboardTemp = () => {
  const { isDashOpen, setIsDashOpen } = useData();

  return (
    <>
      <div className="drawer drawer-mobile" onClick={() => setIsDashOpen(false)}>
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle"
          onChange={(e) => setIsDashOpen(e.target.checked)}
          checked={isDashOpen}
        />

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
      <ScrollToTop></ScrollToTop>
    </>
  );
};

export default DashboardTemp;