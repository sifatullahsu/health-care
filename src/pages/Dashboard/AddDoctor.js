import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useLocation } from 'react-router-dom';

const AddDoctor = () => {
  const doctor = useLoaderData();
  const location = useLocation();

  let addNew = '';
  if (location.pathname === '/dashboard/doctors/add-new') {
    addNew = [];
  }

  const { register, handleSubmit } = useForm();

  const [repeter, setRepeter] = useState(addNew ? addNew : doctor?.slots);

  const defaultSlots = [
    '08.00 AM - 08.30 AM', '08.30 AM - 09.00 AM', '09.00 AM - 9.30 AM', '09.30 AM - 10.00 AM',
    '10.00 AM - 10.30 AM', '10.30 AM - 11.00 AM', '11.00 AM - 11.30 AM', '11.30 AM - 12.00 AM',
    '1.00 PM - 1.30 PM', '1.30 PM - 2.00 PM', '2.00 PM - 2.30 PM', '2.30 PM - 3.00 PM',
    '3.00 PM - 3.30 PM', '3.30 PM - 4.00 PM', '4.00 PM - 4.30 PM', '4.30 PM - 5.00 PM'
  ]

  const remainingSlots = defaultSlots.filter(slot => !repeter.includes(slot));


  const handleAddDoctor = (data) => {
    console.log('Add', data);
    /* const { name, email, qualifications, designation, image, about } = data;
    const processData = { name, email, qualifications, designation, image, slots: repeter, about }

    console.log(data);

    fetch('http://localhost:5001/add-doctor', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(processData)
    })
      .then(req => req.json())
      .then(data => console.log(data)) */
  }

  const handleEditDoctor = (data) => {
    console.log('Edit', data);
    /* const { name, email, qualifications, designation, image, about } = data;
    const processData = { name, email, qualifications, designation, image, slots: repeter, about }

    console.log(data);

    fetch('http://localhost:5001/add-doctor', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(processData)
    })
      .then(req => req.json())
      .then(data => console.log(data)) */
  }


  const handleAddRepeter = () => {
    const newRepeter = [...repeter, ''];

    if (repeter[repeter.length - 1] || newRepeter.length === 1) {
      setRepeter(newRepeter);
    }
  }

  const handleRemoveRepeter = (index) => {
    const newRepeter = [...repeter];
    newRepeter.splice(index, 1);

    setRepeter(newRepeter);
  }



  return (
    <form onSubmit={handleSubmit(doctor ? handleEditDoctor : handleAddDoctor)}>
      <div className='flex flex-wrap'>
        <div className='col basis-4/5'>


          <section className='bg-white border'>
            <div className='border-b px-5 py-3 font-semibold uppercase'>Title</div>
            <div className="flex">
              <div className='basis-full p-5'>
                <div className="form-control">
                  <label className="label"><span className="label-text">Name</span></label>
                  <input {...register("name", { required: true })} defaultValue={doctor?.name} />
                </div>
              </div>
            </div>
          </section>

          <section className='bg-white border mt-5'>
            <div className='border-b px-5 py-3 font-semibold uppercase'>Settings</div>
            <div className="flex">
              <div className='basis-full p-5'>

                <div className="form-control sm">
                  <label className="label"><span className="label-text">Email</span></label>
                  <input {...register("email", { required: true })} type="mail" defaultValue={doctor?.email} required />
                </div>

                <div className="form-control sm mt-5">
                  <label className="label"><span className="label-text">Qualifications</span></label>
                  <input {...register("qualifications", { required: true })} defaultValue={doctor?.qualifications} required />
                </div>

                <div className="form-control sm mt-5">
                  <label className="label"><span className="label-text">Designation</span></label>
                  <input {...register("designation", { required: true })} defaultValue={doctor?.designation} required />
                </div>

                <div className="form-control sm mt-5">
                  <label className="label"><span className="label-text">Image URL</span></label>
                  <input {...register("image", { required: true })} defaultValue={doctor?.image} required />
                </div>

                <div className='form-control sm mt-5'>
                  <label className="label"><span className="label-text">Slots</span></label>
                  <div className='grid grid-cols-3 gap-x-5 gap-y-1'>
                    {
                      repeter.map((slot, index) => {
                        return (
                          <div
                            key={Math.random() * 100000000000000000000000000000000000}
                          >
                            <div className='flex flex-nowrap w-full'>
                              <div className="w-full basis-full">
                                <select
                                  name={`slot_${index}`}
                                  defaultValue={slot}
                                  onChange={
                                    (event) => {
                                      const value = event.target.value;
                                      const newArray = [...repeter];
                                      newArray[index] = value;
                                      setRepeter(newArray);
                                    }
                                  }
                                  required
                                >
                                  <option value=''>Select appointment slots</option>
                                  {
                                    defaultSlots.map(reSlot => {
                                      return (
                                        <option
                                          key={reSlot}
                                          value={reSlot}
                                          disabled={!remainingSlots.includes(reSlot)}
                                        >{reSlot}</option>
                                      );
                                    })
                                  }
                                </select>
                              </div>
                              <button className='btn btn-primary btn-sm basis-10' onClick={() => handleRemoveRepeter(index)}>-</button>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                  <div className='text-center mt-5 '>
                    {
                      (remainingSlots.length !== 0) &&
                      <button
                        onClick={() => handleAddRepeter()}
                        className='btn btn-primary btn-sm text-xs'
                      >Add New Slot</button>
                    }
                  </div>
                </div>

                <div className="form-control sm mt-5">
                  <label className="label"><span className="label-text">About</span></label>
                  <textarea
                    {...register("about", { required: true })}
                    className="textarea textarea-bordered h-24"
                    defaultValue={doctor?.about}
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className='col basis-1/5'>
          <div className='flex bg-white border'>
            <div className="col basis-full">
              <input type="submit" className='btn btn-primary btn-sm w-full' />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;