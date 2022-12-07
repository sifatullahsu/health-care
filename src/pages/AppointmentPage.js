import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import AppointmentOption from '../components/AppointmentOption';
import BookingModal from '../components/BookingModal';
import { useQuery } from '@tanstack/react-query';

const AppointmentPage = () => {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const footer = selectedDate ? (
    <p>You selected {format(selectedDate, 'PP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );


  // =======================================================

  const [treatment, setTreatment] = useState(null);

  const date = format(selectedDate, 'PP');

  const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
    queryKey: ['appointments', date],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/appointments?date=${date}`);
      const data = await res.json();

      return data;
    }
  });



  /*
    // Type: 01

    const [appointmentOptions, setAppointmentOptions] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5001/appointments')
        .then(res => res.json())
        .then(data => setAppointmentOptions(data))
    }, []);
  */

  /* 
    // Type: 02
  
    const { data: appointmentOptions = [] } = useQuery({
      queryKey: ['appointments'],
      queryFn: async () => {
        const res = await fetch('http://localhost:5001/appointments');
        const data = await res.json();
  
        return data;
      }
    });
  */


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">

      <section>
        <DayPicker
          mode="single"
          disabled={{ before: new Date() }}
          selected={selectedDate}
          onSelect={(event) => {
            if (event) {
              setSelectedDate(event);
            }
          }}
          footer={footer}
        />
      </section>

      <section className='my-16'>
        <p className='text-center text-secondary font-bold mb-5'>Available Appointments on {format(selectedDate, 'PP')}</p>
        <div className='grid gap-6 grid-cols-3'>
          {
            appointmentOptions.map(option => <AppointmentOption
              key={option._id}
              appointmentOption={option}
              setTreatment={setTreatment}
            ></AppointmentOption>)
          }
        </div>
      </section>

      {
        treatment &&
        <BookingModal
          selectedDate={selectedDate}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      }
    </div>
  );
};

export default AppointmentPage;