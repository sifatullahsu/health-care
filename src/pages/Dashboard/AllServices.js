import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import Heading from '../../components/Heading';
import Pagination from '../../components/Pagination';
import Thead from '../../components/Thead';
import { useData } from '../../contexts/DataProvider';
import { deleteService, getServices } from '../../queries/services';
import { loop } from '../../utilities/utilities';

const AllServices = () => {

  const { setBreadcrumbs } = useData();
  useEffect(() => setBreadcrumbs('Services'), [setBreadcrumbs]);


  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [isDelete, setIsDelete] = useState(false);


  const { data: services = [], isLoading, refetch } = useQuery({
    queryKey: ['services', pagination],
    queryFn: () => getServices(pagination.page, pagination.size, undefined)
  });


  const handleDelete = id => {
    deleteService(id)
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
      <Heading title='All Services'></Heading>

      <div className="overflow-x-auto">
        <table className="dash-table">

          <Thead data={['No.', 'Name', 'Price', 'Actions']}></Thead>

          <tbody>
            {
              loop(services?.data, 10)?.map((service, index) =>
                <tr key={service?._id || index}>
                  {
                    !isLoading ?
                      <>
                        <th>{index + 1}</th>
                        <td>{service.name}</td>
                        <td>${service.price}</td>
                        <td className='text-right'>
                          <Link to={`/dashboard/services/${service._id}`} className='btn-dash'>
                            <FaRegEdit className='inline'></FaRegEdit>
                          </Link>
                          <label htmlFor="delete-modal" className='btn-dash' onClick={() => setIsDelete(service._id)}>
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
                      </>
                  }
                </tr>
              )
            }
          </tbody>

        </table>
      </div>

      <Pagination
        data={services?.pagination}
        isLoading={isLoading}
        state={pagination}
        setState={setPagination}
      ></Pagination>

      <DeleteModal isDelete={isDelete} setIsDelete={setIsDelete} handleDelete={handleDelete}></DeleteModal>
    </>
  );
};

export default AllServices;