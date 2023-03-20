import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo2.png';
import { IoIosArrowUp } from 'react-icons/io';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {

  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [scrollUp]);

  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content relative">

      <button
        className='btn btn-accent btn-sm h-10 min-h-[2.5rem] w-10 absolute bottom-5 right-5'
        onClick={() => setScrollUp(!scrollUp)}
      >
        <IoIosArrowUp></IoIosArrowUp>
      </button>
      <div>
        <img src={logo} className='w-16' alt="" />
        <p className="font-bold">
          HEALTH CARE LTD. <br />Providing Reliable Medical Service Since 1992
        </p>
        <p>Copyright © 2022 - All right reserved</p>
      </div>
      <div>
        <div className='text-white flex space-x-2'>
          <a href="https://www.linkedin.com/in/sifatullahsu/" target="_blank" rel="noreferrer" className='btn !text-xl  btn-ghost btn-dash' >
            <FaLinkedinIn></FaLinkedinIn>
          </a>
          <a href="https://github.com/sifatullahsu" target="_blank" rel="noreferrer" className='btn !text-xl  btn-ghost btn-dash'>
            <FaGithub></FaGithub>
          </a>
          <a href="https://www.facebook.com/sifatullahhh" target="_blank" rel="noreferrer" className='btn !text-xl  btn-ghost btn-dash'>
            <FaFacebookF></FaFacebookF>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;