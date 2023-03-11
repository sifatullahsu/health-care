import React from 'react';
import { useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import logo from '../../assets/images/logo.png';
import { toast } from 'react-hot-toast';
import { BsXCircleFill } from 'react-icons/bs'
import { useData } from '../../contexts/DataProvider';

const AdminSidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const { user, logOut } = useContext(AuthContext);
  const { setIsDashOpen } = useData();

  const handleLogout = () => {
    logOut().then(data => {
      toast.success('Logout Successfull');
      navigate('/authentication');
    });
  }



  const adminMenu = () => {
    return (
      <>
        <div className='relative'><span>Admin</span></div>

        <li>
          <NavLink to='/dashboard/doctors'>Doctors</NavLink>
          <ul className="bg-primary">
            <li>
              <NavLink
                to='/dashboard/doctors'
                className={({ isActive }) => isActive && path === '/dashboard/doctors' ? 'active' : ''}
              >All Doctors</NavLink></li>
            <li><NavLink to='/dashboard/doctors/add-new'>Add New</NavLink></li>
          </ul>
        </li>

        <li>
          <NavLink to='/dashboard/services'>Services</NavLink>
          <ul className="bg-primary">
            <li><NavLink
              to='/dashboard/services'
              className={({ isActive }) => isActive && path === '/dashboard/services' ? 'active' : ''}
            >All Services</NavLink></li>
            <li><NavLink to='/dashboard/services/add-new'>Add New</NavLink></li>
          </ul>
        </li>

        <li>
          <NavLink to='/dashboard/appointments'>Appointments</NavLink>
          {/* <ul className="bg-primary">
            <li><NavLink
              to='/dashboard/appointments'
              className={({ isActive }) => isActive && path === '/dashboard/appointments' ? 'active' : ''}
            >All Appointments</NavLink></li>
            <li><NavLink to='/dashboard/appointments/add-new'>Add New</NavLink></li>
          </ul> */}
        </li>

        <li>
          <NavLink to='/dashboard/users'>Users</NavLink>
          {/* <ul className="bg-primary">
            <li><NavLink
              to='/dashboard/users'
              className={({ isActive }) => isActive && path === '/dashboard/users' ? 'active' : ''}
            >All Users</NavLink></li>
            <li><NavLink to='/dashboard/users/add-new'>Add New</NavLink></li>
          </ul> */}
        </li>
      </>
    );
  }


  return (
    <div className='bg-primary text-gray-300'>
      <div className='mt-5 mb-10 px-4 flex justify-between'>
        <div className='w-[120px] lg:w-[200px]'>
          <Link to='/'>
            <img src={logo} className="lg:w-[80%]" alt="" />
          </Link>
        </div>
        <div className="btn btn-ghost btn-sm drawer-button lg:hidden" onClick={() => setIsDashOpen(false)}>
          <BsXCircleFill />
        </div>
      </div>
      <ul className="menu">

        <li>
          <NavLink to='/dashboard'
            className={({ isActive }) => isActive && path === '/dashboard' ? 'active' : ''}
          >Dashboard</NavLink>
        </li>

        <li>
          <NavLink to='/dashboard/hospital-services'
            className={path.includes('/checkout') && 'active'}
          >Hospital Services</NavLink>
        </li>

        {
          user?.uid && user?.role === 'admin' &&
          adminMenu()
        }

        {
          user?.uid && user?.role === 'doctor' &&
          <>
            <div className='relative'><span>Doctors</span></div>
            <li><NavLink to='/dashboard/appointments'>Appointments</NavLink></li>
          </>
        }

        <div className='relative'><span>Account</span></div>
        <li><NavLink to='/dashboard/my-appointments'>My Appointments</NavLink></li>
        <li><NavLink to='/dashboard/settings'>Settings</NavLink></li>
        <li><button onClick={handleLogout}>Logout</button></li>

      </ul>
      <div className='px-4'></div>
    </div>
  );
};

export default AdminSidebar;