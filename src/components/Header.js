import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = () => {

  const menu = () => {
    return (
      <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/appointment'>Appointment</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>SignUp</Link></li>
      </>
    );
  }

  return (
    <header className='bg-primary'>
      <div className="navbar container">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBars className='text-white'></FaBars>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menu()}
            </ul>
          </div>
          <div>
            <Link to='/'>
              <img src={logo} className='w-[200px]' alt="" />
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-white p-0">
            {menu()}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to='/dashboard' className="btn btn-primary">Dashboard</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;