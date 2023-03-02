import React from 'react';
import { Link } from 'react-router-dom';
import successfulImg from '../assets/images/successful.png';

const CheckoutSuccessful = ({ successData }) => {
  return (
    <div>
      <img src={successfulImg} className='w-28 mx-auto' alt="" />
      <div className='text-center font-bold space-y-2'>
        <h3 className='text-3xl'>Payment Successful!</h3>
        <p className='text-lg'>Thanks for using our service.</p>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table max-w-xs mx-auto payment-table rounded-none">
          <tbody>
            <tr>
              <th>Amount Paid</th>
              <td className='uppercase'>{`$${successData?.data?.payment?.amount} `}</td>
            </tr>
            <tr>
              <th>Transaction ID</th>
              <td>{successData?.data?.payment?.id}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{`${successData?.data?.date}`} - (${successData?.data?.slot})</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='text-center'>
        <Link to='/dashboard/my-appointments' className='btn btn-primary btn-sm mt-8'>Go to Appointments</Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessful;