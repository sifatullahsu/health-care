import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';


const ServicesSingle = () => {

  const service = useLoaderData();
  const { register, handleSubmit } = useForm();

  const [repeter, setRepeter] = useState(service.slots);

  const defaultSlots = [
    '08.00 AM - 08.30 AM', '08.30 AM - 09.00 AM', '09.00 AM - 9.30 AM', '09.30 AM - 10.00 AM',
    '10.00 AM - 10.30 AM', '10.30 AM - 11.00 AM', '11.00 AM - 11.30 AM', '11.30 AM - 12.00 AM',
    '1.00 PM - 1.30 PM', '1.30 PM - 2.00 PM', '2.00 PM - 2.30 PM', '2.30 PM - 3.00 PM',
    '3.00 PM - 3.30 PM', '3.30 PM - 4.00 PM', '4.00 PM - 4.30 PM', '4.30 PM - 5.00 PM'
  ]

  const remainingSlots = defaultSlots.filter(slot => !repeter.includes(slot));


  const handleSingleService = (data) => {
    console.log(repeter);
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
    <form onSubmit={handleSubmit(handleSingleService)}>
      <div className='flex flex-wrap'>
        <div className='col basis-4/5'>


          <section className='bg-white border'>
            <div className='border-b px-5 py-3 font-semibold uppercase'>Title</div>
            <div className="flex">
              <div className='basis-full p-5'>
                <div className="form-control">
                  <input {...register("title", { required: true })} defaultValue={service?.name} />
                </div>
              </div>
            </div>
          </section>

          <section className='bg-white border mt-5'>
            <div className='border-b px-5 py-3 font-semibold uppercase'>Settings</div>
            <div className="flex">
              <div className='basis-full p-5'>
                <div className="form-control sm">
                  <label className="label"><span className="label-text">Price</span></label>
                  <input {...register("price", { required: true })} defaultValue={service?.price} />
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

export default ServicesSingle;
