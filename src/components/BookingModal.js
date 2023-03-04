import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {

  const { user } = useContext(AuthContext);

  const { _id, name, slots } = treatment;
  const date = format(selectedDate, 'PP');

  const handleBooking = event => {
    event.preventDefault();
    const form = event.target;

    const slot = form.slot.value;
    const patientName = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      appointmentInfo: {
        treatmentId: _id,
        treatmentName: name,
        date,
        slot
      },
      patientInfo: {
        name: patientName,
        email,
        phone
      }
    }

    fetch('https://the-health-care.vercel.app/api/v1/bookings/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
      .then(res => res.json())
      .then(data => {
        toast('Booking Successful..');
        setTreatment(null);
        refetch();
      })
  }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
            <input type="text" disabled value={date} className="input w-full input-bordered " />
            <select name="slot" className="select select-bordered w-full">
              {
                slots.map((slot, i) => <option
                  value={slot}
                  key={i}
                >{slot}</option>)
              }
            </select>
            <input name="name" type="text" defaultValue={user?.displayName} placeholder="Your Name" className="input w-full input-bordered" required readOnly disabled />
            <input name="email" type="email" defaultValue={user?.email} placeholder="Email Address" className="input w-full input-bordered" required readOnly disabled />
            <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" required />
            <br />
            <input className='btn btn-accent w-full' type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;