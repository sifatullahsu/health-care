import React from 'react';
import { toast } from 'react-hot-toast';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const ContactPage = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    toast.success("Form submitted! We'll contacr very soon!");
    form.reset();
  }

  return (
    <section style={{ backgroundColor: "rgb(245, 247, 248)" }}>
      <div className='container py-16'>
        <div className='flex justify-between mb-5'>
          <div>
            <h3 className="text-xl text-secondary font-bold mb-2">Contact Us</h3>
            <p className='text-sm text-accent mb-2'>Submit form, we'll contact very soon!</p>
          </div>
        </div>

        <div className='grid md:grid-cols-3 gap-5'>
          <div className='bg-primary rounded p-5'>
            <h3 className="text-lg text-white font-bold mb-2">Health Care Team</h3>
            <p className=' text-white mb-2'>Already a customer or need help with a billing issue? Contact Support</p>

            <div className='mt-10 text-sm text-white space-y-2'>
              <p className='text-gray-400'>Phone / Email</p>
              <p>+8801611362214</p>
              <p>personal.sifat@gmail.com</p>
            </div>

            <div className='mt-10 text-white flex space-x-3'>
              <a href="https://www.linkedin.com/in/sifatullahsu/" target="_blank" rel="noreferrer" className='btn btn-ghost btn-dash' >
                <FaLinkedinIn></FaLinkedinIn>
              </a>
              <a href="https://github.com/sifatullahsu" target="_blank" rel="noreferrer" className='btn btn-ghost btn-dash'>
                <FaGithub></FaGithub>
              </a>
              <a href="https://www.facebook.com/sifatullahhh" target="_blank" rel="noreferrer" className='btn btn-ghost btn-dash'>
                <FaFacebookF></FaFacebookF>
              </a>
            </div>
          </div>
          <div className='col-span-2'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>

              <div className="form-control sm">
                <label className="label"><span className="label-text">First Name</span></label>
                <input name='firest_name' required />
              </div>

              <div className="form-control sm">
                <label className="label"><span className="label-text">Last Name</span></label>
                <input name='last_name' required />
              </div>

              <div className="form-control sm">
                <label className="label"><span className="label-text">Mobile</span></label>
                <input name='mobile' required />
              </div>

              <div className="form-control sm">
                <label className="label"><span className="label-text">Email</span></label>
                <input name='email' required />
              </div>

              <div className="form-control sm md:col-span-2">
                <label className="label"><span className="label-text">Message</span></label>
                <textarea name='message' className="textarea textarea-bordered h-24" required></textarea>
              </div>

              <input type="submit" className='btn btn-primary btn-sm w-full md:col-span-2 mt-5' />

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;