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
import Collapses from '../templates/loops/Collapses';

import icon3 from '../assets/images/icon-3.png';
import icon4 from '../assets/images/icon-4.png';
import icon5 from '../assets/images/icon-5.png';
import icon6 from '../assets/images/icon-6.png';
import icon7 from '../assets/images/icon-7.png';
import hospitalImg from '../assets/images/hospital.jpg';

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

  const faq = [
    {
      title: "How is the Emergency Department staffed?",
      description: "The department is staffed with emergency medicine physicians and nurses, physician assistants, technicians, CNAs and unit coordinators along with specialists from the laboratory, cardiology, respiratory and radiology departments."
    },
    {
      title: "What happens if I am admitted?",
      description: "Upon admission to the hospital, you will remain in the Emergency Department until your inpatient room is ready. Your admitting physician will visit you during their designated patient rounds."
    },
    {
      title: "What procedures will I have in the Emergency Department?",
      description: "Treatments and procedures may include lab work, radiological studies, CAT scans, ultrasound, EKG for cardiac review, medication administration and physician evaluations."
    },
    {
      title: "When will I see a physician?",
      description: "All patients are first triaged by an ER nurse. Then patients are evaluated by a physician. Patients who have a higher acuity of illness (i.e. heart attack or stroke) may be treated before those patients with less severe conditions (laceration, sprained ankle, etc.). Your patience is always appreciated."
    },
    {
      title: "When will I be able to eat?",
      description: "Patients are able to eat after all their tests are completed and the physician has evaluated the results. On average, it is within three to four hours. However, it is sometimes necessary for patients to remain 'NPO' (nothing by mouth) until further tests and/or studies are completed."
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
            <p className='text-lg'>If you are looking for a reliable dentist in town, we are here to help. We are known for the best, affordable, and painless dental treatments with quick appointments and timely solutions.</p>

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
          {
            !servicesLoading &&
            <div className='text-center mt-10'>
              <Link to='/hospital-services' className='btn btn-primary btn-sm px-10'>See More</Link>
            </div>
          }
        </div>
      </section>

      <section style={{ backgroundColor: "rgb(245, 247, 248)" }}>
        <div className='container py-16'>
          <div className='flex justify-between mb-5'>
            <div>
              <h3 className="text-xl text-secondary font-bold mb-2">Our Doctors</h3>
              <p className='text-sm text-accent mb-2'>These are some our talented doctors.</p>
            </div>
          </div>
          <Doctors doctors={doctors?.data} isLoading={doctorsLoading}></Doctors>
          {
            !doctorsLoading &&
            <div className='text-center mt-10'>
              <Link to='/doctors' className='btn btn-primary btn-sm px-10'>See More</Link>
            </div>
          }
        </div>
      </section>

      <section className='container py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='flex items-center'>
            <div className='md:pr-10'>
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

      <section style={{ backgroundColor: "rgb(245, 247, 248)" }}>
        <div className='container py-16'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div>
              <div>
                <h3 className="text-xl text-secondary font-bold mb-2">Frequently asked questions</h3>
                <p className='text-sm text-accent mb-2'>Still have more questions about the services? Contact us and we'll get back to you as soon as possible.</p>
                <div className='mt-10'>
                  <Link to='/contact' className='btn btn-primary btn-sm px-10'>Contact Us</Link>
                </div>
              </div>
            </div>
            <div className='md:col-span-2 mt-5 md:mt-0 space-y-1'>
              <Collapses data={faq} tabIndex={0}></Collapses>
            </div>
          </div>
        </div>
      </section>

      <section className='container py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
          <div>
            <h3 className="text-xl text-secondary font-bold mb-2">Health Care Provider With <br /> Hospitals in Multiple Locations.</h3>
            <p className='text-sm text-accent mb-2'>We are certified doctors specialised in offering the best dental treatments in town. With adequate experience of over 12 years, we have mastered the skills of offering the best solutions with the latest technologies. If you are looking for a reliable dentist in town, we are here to help. We are known for the best, affordable, and painless dental treatments with quick appointments and timely solutions.</p>
          </div>
          <div className='md:ml-auto'>
            <iframe width="350" height="200" src="https://www.youtube.com/embed/yN-MkRcOJjY" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "rgb(245, 247, 248)" }}>
        <div className='container py-16'>
          <div className='flex flex-col-reverse md:flex-row flex-wrap'>
            <div className='basis-full md:basis-6/12 bg-white p-8 md:p-10'>
              <h3 className="text-xl text-secondary font-bold mb-2">Book an Appointment & You're Done!</h3>
              <p className='text-sm text-accent mb-2'>Book an Appointment & You're Done! Looking for the best & quick dental treatments without a long waiting time?</p>
              <p className='text-sm text-accent mb-2'>Simply reserve a time slot, walk in at the appointed time and get prioritized treatments at no extra cost.?</p>
              <div className='mt-10'>
                <Link to='/hospital-services' className='btn btn-primary btn-sm px-10'>Resarve A Slot</Link>
              </div>
            </div>
            <div className='basis-full md:basis-6/12'>
              <img src={hospitalImg} alt="" className='h-full object-cover' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;