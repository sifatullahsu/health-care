import React from 'react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const ServiceForm = ({ data }) => {

  const id = useLocation().pathname.split('/dashboard/services/')[1];

  const handleEditForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const price = form.price.value;

    const processData = { name, price, }

    fetch(`http://localhost:5001/services/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(processData)
    })
      .then(req => req.json())
      .then(data => {
        if (data.acknowledged) {
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


  const handleAddForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const price = form.price.value;

    const processData = { name, price }


    fetch('http://localhost:5001/services/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(processData)
    })
      .then(req => req.json())
      .then(data => {
        if (data.acknowledged) {
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
                    <label className="label"><span className="label-text">Price</span></label>
                    <input name='price' defaultValue={data?.price} required />
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

export default ServiceForm;