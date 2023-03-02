import React from 'react';
import { Link } from 'react-router-dom';
import icon1 from '../assets/images/icon-1.png';
import icon2 from '../assets/images/icon2.webp';

const HomePage = () => {
  return (
    <div>
      <section id='hero' className='min-h-[90vh] text-white text-opacity-90'>
        <div className="container">
          <div className='max-w-xl py-20'>
            <h1 className='text-5xl text-white uppercase mb-5'>We safeguard your
              <small className='block mt-3'>health & beauty.</small>
            </h1>
            <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quod obcaecati qui dignissimos quia libero consequuntur fugit incidunt, delectus nihil corrupti quod obcaecati.</p>

            <div className='my-10'>
              <div className="grid grid-cols-2 gap-3">
                <div className='flex space-x-3'>
                  <div className='w-32'>
                    <img src={icon1} alt="" />
                  </div>
                  <div className=''>
                    <h4 className='text-xl font-semibold mb-3'>Whitening</h4>
                    <p>Completely iterate covalent strategic theme areas via accurate e-markets.</p>
                  </div>
                </div>
                <div className='flex space-x-3'>
                  <div className='w-32'>
                    <img src={icon2} alt="" />
                  </div>
                  <div className=''>
                    <h4 className='text-xl font-semibold mb-3'>Prosthesis</h4>
                    <p>Holistically foster superior methodologies without market-driven best practices.</p>
                  </div>
                </div>
              </div>
            </div>

            <Link to='/appointment' className='btn btn-primary px-12'>Book Your Doctor</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;