import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { getAssociateDoctorsSearch } from '../../queries/doctors';
import { createService, editService } from '../../queries/services';

const ServiceForm = ({ data }) => {
  const id = useLocation().pathname.split('/dashboard/services/')[1];

  const customDoctors = data?.doctors?.map(i => {
    return { value: i._id, label: `${i.name} (${i.email})` }
  });

  const [serviceDoctors, setServiceDoctors] = useState(customDoctors);


  const handleEditForm = (data, form) => {

    editService(id, data)
      .then(data => {
        if (data.status) {
          toast.success('Service Update Successful..')
        }
        else {
          toast.error('Service Added Faild..');
        }
      })
      .catch(error => {
        toast.error('Service Update Faild..');
      })
  }

  const handleAddForm = (data, form) => {

    createService(data)
      .then(data => {
        if (data.status) {
          toast.success('Service Added Successful..');
          form.reset();
        }
        else {
          toast.error('Service Added Faild..');
        }
      })
      .catch(error => {
        toast.error('Service Added Faild..');
      })
  }

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const price = form.price.value;
    const doctors = serviceDoctors?.map(i => i.value);

    const formData = { name, price, doctors }

    return data ? handleEditForm(formData, form) : handleAddForm(formData, form);
  }


  const promiseOptions = (inputValue, callback) => {

    if (inputValue.length >= 3) {
      getAssociateDoctorsSearch(inputValue)
        .then(data => {
          callback(data?.status ? data.data : []);
        })
        .catch(error => {
          toast.error('Doctor Loaded Faild..');
        })
    }
  };


  return (
    <div>
      <form onSubmit={handleForm}>
        <div className='flex flex-wrap md:flex-nowrap space-y-5 md:space-y-0 md:space-x-5'>
          <div className='basis-full md:basis-4/5'>

            <section className='bg-white border'>
              <div className='border-b px-5 py-3 font-semibold'>Title</div>
              <div className="flex">
                <div className='basis-full p-5'>
                  <div className="form-control">
                    <input name='name' defaultValue={data?.name} required />
                  </div>
                </div>
              </div>
            </section>

            <section className='bg-white border mt-5'>
              <div className='border-b px-5 py-3 font-semibold'>Settings</div>
              <div className="flex">
                <div className='basis-full p-5'>

                  <div className="form-control sm">
                    <label className="label"><span className="label-text">Price</span></label>
                    <input name='price' defaultValue={data?.price} required />
                  </div>

                  <div className="form-control sm mt-5">
                    <label className="label"><span className="label-text">Associate Doctors</span></label>
                    <AsyncSelect
                      isMulti
                      name="doctors"
                      closeMenuOnSelect={false}
                      defaultValue={serviceDoctors}
                      loadOptions={promiseOptions}
                      onChange={(items) => setServiceDoctors(items)}
                    />

                  </div>

                </div>
              </div>
            </section>

          </div>
          <div className='basis-full md:basis-1/5'>
            <div className='flex bg-white border'>
              <div className="p-3 basis-full">
                <input type="submit" className='btn btn-primary btn-sm w-full' />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;