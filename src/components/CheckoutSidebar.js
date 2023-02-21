import React from 'react';

const CheckoutSidebar = ({ state }) => {
  return (
    <div className='bg-white p-5 border'>
      <div>
        <h3 className="text-xl text-secondary font-bold mb-2">{state.service.name}</h3>
        <p className='text-sm text-accent mb-5'>{`Price: $${state.service.price} / Appointment`}</p>

        <div className='flex space-x-3 mb-5'>
          <img src={state.doctor.image} className='basis-14 h-12 mt-1' alt="" />
          <div className='basis-full'>
            <h3 className="text-lg text-secondary font-bold capitalize">{state.doctor.name}</h3>
            <p className='text-sm text-accent'>{`${state.doctor.designation} - [${state.doctor.qualifications}]`}</p>
          </div>
        </div>

        <h3 className="text-base text-secondary font-bold mb-2">Appointment Time</h3>
        <ul className='list-disc pl-10 text-sm'>
          <li>{state.appointment.date}</li>
          <li>{state.appointment.slot}</li>
        </ul>
      </div>
      <div className='py-5'><div className='border-b'></div></div>
      <div>
        <h3 className="text-base text-secondary font-bold mb-2">Test Cards</h3>
        <ul className='list-disc pl-10 text-sm'>
          <li>4242424242424242</li>
          <li>4000056655665556</li>
          <li>5555555555554444</li>
          <li>2223003122003222</li>
          <li>5200828282828210</li>
        </ul>
        <p className='mt-3 text-sm text-accent'><strong>Expiration:</strong> Any future date</p>
        <p className='mt-3 text-sm text-accent'><strong>CVC:</strong> Any 3 digits</p>
        <p className='mt-3 text-sm text-accent'><strong>Country:</strong> Any country</p>
      </div>
    </div>
  );
};

export default CheckoutSidebar;