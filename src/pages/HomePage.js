import React from 'react';
import { Link } from 'react-router-dom';
import icon1 from '../assets/images/icon-1.png';
import icon2 from '../assets/images/icon2.webp';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Services from '../templates/loops/Services';
import Doctors from '../templates/loops/Doctors';
import { getDoctors } from '../queries/doctors';
import { getServices } from '../queries/services';

import icon3 from '../assets/images/icon-3.png';
import icon4 from '../assets/images/icon-4.png';
import icon5 from '../assets/images/icon-5.png';
import icon6 from '../assets/images/icon-6.png';
import icon7 from '../assets/images/icon-7.png';

const HomePage = () => {

  const date = format(new Date(), 'PP');

  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => getServices(undefined, undefined, date)
  });

  const { data: doctors = [], isLoading: doctorsLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => getDoctors(undefined, 5)
  });

  const aboutHealthCare = [
    {
      img: icon3,
      title: "Quality",
      description: "We are committed to providing quality healthcare for every patient."
    },
    {
      img: icon4,
      title: "Integrity",
      description: "We do the right thing, every time."
    },
    {
      img: icon5,
      title: "Passion",
      description: "We are passionate abouthealthcare and this shows in the care we provide."
    },
    {
      img: icon6,
      title: "Respect",
      description: "We are respectful of everyone regardless of our differences and diversity."
    },
    {
      img: icon7,
      title: "Innovative",
      description: "We believe innovation allows us to improve experience to ensure the health of our business."
    },
  ];

  return (
    <div>
      <section id='hero' className='min-h-[90vh] text-white text-opacity-90'>
        <div className="container">
          <div className='max-w-xl py-20'>
            <h1 className='text-3xl md:text-5xl text-white capitalize mb-5'>We safeguard your
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
          <Services services={services?.data?.slice(0, 3)} selectedDate={date} isLoading={servicesLoading}></Services>

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
          <Doctors doctors={doctors?.data} isLoading={doctorsLoading}></Doctors>
          <div className='text-center mt-10'>
            <Link to='/doctors' className='btn btn-primary btn-sm px-10'>See More</Link>
          </div>
        </div>
      </section>

      <section className='container py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='flex items-center'>
            <div className='max-w-[250px]'>
              <h3 className="text-xl text-secondary font-bold mb-2">About Health Care</h3>
              <p className='text-sm text-accent mb-2'>To build a legacy of accessible, high quality, safe private healthcare for low and middle-income patients in emerging markets.</p>
            </div>
          </div>
          {
            aboutHealthCare.map((item, i) => (
              <div key={i} className='card bg-white shadow-xl'>
                <div className='card-body'>
                  <div className='max-w-[240px]'>
                    <img src={item.img} alt="" className='w-14 mb-5' />
                    <h3 className="text-xl text-secondary font-bold mb-2">{item.title}</h3>
                    <p className='text-sm text-accent mb-2'>{item.description}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

    </div>
  );
};

export default HomePage;