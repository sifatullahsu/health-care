import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import Heading from '../../components/Heading';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useData } from '../../contexts/DataProvider';
import { deleteDoctor, getDoctors } from '../../queries/doctors';
import { loop } from '../../utilities/utilities';

const AllDoctors = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Doctors'), [setBreadcrumbs]);


  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [isDelete, setIsDelete] = useState(false);


  const { data: doctors = [], isLoading, refetch } = useQuery({
    queryKey: ['doctors', pagination],
    queryFn: async () => getDoctors(pagination.page, pagination.size)
  });


  const handleDelete = id => {
    deleteDoctor(id)
      .then(data => {
        toast.success(data.message);
        refetch();
      })
      .catch(error => {
        toast.error(error.message);
      })
  }

  return (
    <>
      <Heading title='All Doctors'></Heading>

      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Name', 'Email', 'Designation', 'Actions']}></Thead>

          <tbody>
            {
              loop(doctors?.data, 10)?.map((doctor, index) =>
                <tr key={doctor?._id || index}>
                  {
                    !isLoading ?
                      <>
                        <th>{doctors?.pagination?.start + index}</th>
                        <td><img src={doctor?.image} className='w-6 h-6 inline-block mr-2' alt="" />{doctor?.name}</td>
                        <td>{doctor?.email}</td>
                        <td>{doctor?.designation}</td>
                        <td className='text-right'>
                          <Link to={`/dashboard/doctors/${doctor?._id}`} className='btn-dash'>
                            <FaRegEdit className='inline'></FaRegEdit>
                          </Link>
                          <label htmlFor="delete-modal" className='btn-dash' onClick={() => setIsDelete(doctor._id)}>
                            <AiOutlineDelete className='inline'></AiOutlineDelete>
                          </label>
                        </td>
                      </>
                      :
                      <>
                        <th><Skeleton /></th>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                      </>
                  }
                </tr>
              )
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

      <DeleteModal isDelete={isDelete} setIsDelete={setIsDelete} handleDelete={handleDelete}></DeleteModal>
    </>
  );
};

export default AllDoctors;