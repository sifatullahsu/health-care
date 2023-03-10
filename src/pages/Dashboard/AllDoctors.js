import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useData } from '../../contexts/DataProvider';

const AllDoctors = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Doctors'), [setBreadcrumbs]);

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctors', pagination],
    queryFn: async () => {
      const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/list?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <>
      <Heading title='All Doctors'></Heading>

      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Name', 'Email', 'Designation', 'Actions']}></Thead>

          <tbody>
            {
              !isLoading ?
                <>
                  {
                    doctors?.data?.map((doctor, index) =>
                      <tr key={doctor?._id}>
                        <th>{doctors?.pagination?.start + index}</th>
                        <td>
                          <img src={doctor?.image} className='w-6 h-6 inline-block mr-2' alt="" />
                          {doctor?.name}
                        </td>
                        <td>{doctor?.email}</td>
                        <td>{doctor?.designation}</td>
                        <td className='text-right'>
                          <Link to={`/dashboard/doctors/${doctor?._id}`}>
                            <FaRegEdit className='inline'></FaRegEdit>
                          </Link>
                        </td>
                      </tr>
                    )
                  }
                </>
                :
                <>
                  {
                    Array(10).fill('').map((_, i) =>
                      <tr key={i}>
                        <th><Skeleton /></th>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                      </tr>
                    )
                  }
                </>
            }

          </tbody>

        </table>
      </div>

      <Pagination
        data={doctors?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>

    </>
  );
};

export default AllDoctors;