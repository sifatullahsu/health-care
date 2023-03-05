import React from 'react';
import { Link } from 'react-router-dom';
import icon1 from '../assets/images/icon-1.png';
import icon2 from '../assets/images/icon2.webp';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Services from '../templates/loops/Services';
import Doctors from '../templates/loops/Doctors';


const HomePage = () => {

  const date = format(new Date(), 'PP');

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/list?date=${date}`);
      const data = await res.json();

      return data;
    }
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/list?size=5`);
      const data = await res.json();

      return data;
    }
  });


  return (
    <div>
      <section id='hero' className='min-h-[90vh] text-white text-opacity-90'>
        <div className="container">
          <div className='max-w-xl py-20'>
            <h1 className='text-5xl text-white capitalize mb-5'>We safeguard your
              <span className='block mt-3'>health & beauty.</span>
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

            <Link to='/hospital-services' className='btn btn-secondary px-12'>Book Your Doctor</Link>
          </div>
        </div>
      </section>

      <section className='container py-16'>
        <div>
          <div className='flex justify-between mb-5'>
            <div>
              <h3 className="text-xl text-secondary font-bold mb-2">Hospital Servises</h3>
              <p className='text-sm text-accent mb-2'>These are all our services that we provide.</p>
            </div>
            <div>
              <div className='text-right text-sm text-accent mb-5 font-semibold'>Showing slots for {date}</div>
            </div>
          </div>
          <Services services={services?.data?.slice(0, 3)} selectedDate={date}></Services>

          <div className='text-center mt-10'>
            <Link to='/hospital-services' className='btn btn-primary btn-sm px-10'>See More</Link>
          </div>
        </div>
      </section>

      <section className='' style={{ backgroundColor: "rgb(245, 247, 248)" }}>
        <div className='container py-16'>
          <div className='flex justify-between mb-5'>
            <div>
              <h3 className="text-xl text-secondary font-bold mb-2">Our Doctors</h3>
              <p className='text-sm text-accent mb-2'>These are some our talented doctors.</p>
            </div>
          </div>
          <Doctors doctors={doctors?.data}></Doctors>
          <div className='text-center mt-10'>
            <Link to='/doctors' className='btn btn-primary btn-sm px-10'>See More</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;