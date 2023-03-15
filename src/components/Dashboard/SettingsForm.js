import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAuth } from '../../contexts/AuthProvider';
import { editUser } from '../../queries/users';

const SettingsForm = () => {
  const { user, refetch, setRefetch, changePassword } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleForm = async (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const newPass = form.new_pass.value;

    const formData = { name, email }

    if (newPass) {
      try {
        await changePassword(newPass);
        toast.success('Password update successful!');
      }
      catch (error) {
        toast.error('Password update failed!');
        return;
      }
    }

    editUser(user._id, formData)
      .then(data => {
        if (data.status) {
          toast.success('User Update Successful!');
          setRefetch(!refetch);
        }
        else {
          toast.error('User Update Faild..');
        }
      })
      .catch(() => {
        toast.error('User Update Faild..');
      })
  }


  return (
    <div>
      <form onSubmit={handleForm}>
        <div className='flex flex-wrap md:flex-nowrap space-y-5 md:space-y-0 md:space-x-5'>
          <div className='basis-full md:basis-4/5'>

            <section className='bg-white border'>
              <div className='border-b px-5 py-3 font-semibold'>Unique ID</div>
              <div className="flex">
                <div className='basis-full p-5'>
                  <div className="form-control">
                    <input defaultValue={user?._id} readOnly />
                  </div>
                </div>
              </div>
            </section>

            <section className='bg-white border mt-5'>
              <div className='border-b px-5 py-3 font-semibold'>Settings</div>
              <div className="flex">
                <div className='basis-full p-5'>

                  <div className="form-control sm">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input name='name' defaultValue={user?.name} required />
                  </div>

                  <div className="form-control sm">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input name='email' defaultValue={user?.email} required />
                  </div>

                  {/* <div className="form-control sm">
                    <label className="label"><span className="label-text">Role</span></label>
                    <input name='role' defaultValue={user?.role} readOnly required />
                  </div> */}

                </div>
              </div>
            </section>

            <section className='bg-white border mt-5'>
              <div className='border-b px-5 py-3 font-semibold'>Password Change?</div>
              <div className="flex">
                <div className='basis-full p-5'>

                  <div className="form-control sm relative">
                    <label className="label"><span className="label-text">New password</span></label>
                    <span className='absolute right-1 top-10'>
                      {
                        passwordVisible ?
                          <button type="button" className='btn-dash' onClick={() => setPasswordVisible(false)}>
                            <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                          </button>
                          :
                          <button type="button" className='btn-dash' onClick={() => setPasswordVisible(true)}>
                            <AiOutlineEye></AiOutlineEye>
                          </button>
                      }
                    </span>
                    <input type={passwordVisible ? 'text' : 'password'} name='new_pass' />
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

export default SettingsForm;