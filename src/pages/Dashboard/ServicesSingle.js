import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';


const ServicesSingle = () => {

  const service = useLoaderData();
  const { register, handleSubmit, setValue } = useForm();

  if (true) {
    setValue("title", service?.name);
    setValue("price", service?.price);
  }


  const handleServiceForm = () => {

  }

  return (
    <form onSubmit={handleSubmit(handleServiceForm)}>
      <div className='flex flex-wrap'>
        <div className='col basis-4/5'>


          <section className='bg-white border'>
            <div className='border-b px-5 py-3 font-semibold uppercase'>Title</div>
            <div className="flex">
              <div className='basis-full p-5'>
                <div className="form-control">
                  <input {...register("title", { required: true })} />
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
                  <input {...register("price", { required: true })} />
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
