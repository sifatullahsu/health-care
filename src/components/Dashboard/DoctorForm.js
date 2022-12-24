import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const DoctorForm = ({ data }) => {

  const id = useLocation().pathname.split('/dashboard/doctors/')[1];

  const [repeter, setRepeter] = useState(data ? data?.slots : []);

  const defaultSlots = [
    '08.00 AM - 08.30 AM', '08.30 AM - 09.00 AM', '09.00 AM - 9.30 AM', '09.30 AM - 10.00 AM',
    '10.00 AM - 10.30 AM', '10.30 AM - 11.00 AM', '11.00 AM - 11.30 AM', '11.30 AM - 12.00 AM',
    '1.00 PM - 1.30 PM', '1.30 PM - 2.00 PM', '2.00 PM - 2.30 PM', '2.30 PM - 3.00 PM',
    '3.00 PM - 3.30 PM', '3.30 PM - 4.00 PM', '4.00 PM - 4.30 PM', '4.30 PM - 5.00 PM'
  ]

  const remainingSlots = defaultSlots.filter(slot => !repeter.includes(slot));

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

  const handleEditForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const qualifications = form.qualifications.value;
    const designation = form.designation.value;
    const image = form.image.value;
    const slots = repeter;
    const about = form.about.value;

    const processData = { name, email, qualifications, designation, image, slots, about }

    fetch(`http://localhost:5001/doctors/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(processData)
    })
      .then(req => req.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Doctor Update Successful..')
        }
        else {
          toast.error('Doctor Added Faild..');
        }
      })
      .catch(error => {
        toast.error('Doctor Update Faild..');
      })
  }


  const handleAddForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const qualifications = form.qualifications.value;
    const designation = form.designation.value;
    const image = form.image.value;
    const slots = repeter;
    const about = form.about.value;

    const processData = { name, email, qualifications, designation, image, slots, about }


    fetch('http://localhost:5001/doctors/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(processData)
    })
      .then(req => req.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Doctor Added Successful..')
        }
        else {
          toast.error('Doctor Added Faild..');
        }
      })
      .catch(error => {
        toast.error('Doctor Added Faild..');
      })
  }

  const handleForm = (event) => {
    event.preventDefault();

    return data ? handleEditForm(event) : handleAddForm(event);
  }


  return (
    <div>
      <form onSubmit={handleForm}>
        <div className='flex flex-wrap'>
          <div className='col basis-4/5'>


            <section className='bg-white border'>
              <div className='border-b px-5 py-3 font-semibold uppercase'>Title</div>
              <div className="flex">
                <div className='basis-full p-5'>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input name='name' defaultValue={data?.name} required />
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
                    <input name='email' type="mail" defaultValue={data?.email} required />
                  </div>

                  <div className="form-control sm mt-5">
                    <label className="label"><span className="label-text">Qualifications</span></label>
                    <input name='qualifications' defaultValue={data?.qualifications} required />
                  </div>

                  <div className="form-control sm mt-5">
                    <label className="label"><span className="label-text">Designation</span></label>
                    <input name='designation' defaultValue={data?.designation} required />
                  </div>

                  <div className="form-control sm mt-5">
                    <label className="label"><span className="label-text">Image URL</span></label>
                    <input name='image' defaultValue={data?.image} required />
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
                      name='about'
                      className="textarea textarea-bordered h-24"
                      defaultValue={data?.about}
                      required
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
    </div>
  );
};

export default DoctorForm;