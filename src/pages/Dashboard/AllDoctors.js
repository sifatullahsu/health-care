import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const AllDoctors = () => {

  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctors', pagination],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/doctors/list?page=${pagination.page}&size=${pagination.size}`);
      const data = await res.json();

      return data;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th className='text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors?.data?.map((doctor, index) => {
            return (
              <tr key={doctor?._id}>
                <th>{doctors?.pagination?.start + index}</th>
                <td>{doctor?.name}</td>
                <td>{doctor?.email}</td>
                <td>{doctor?.designation}</td>
                <td className='text-right'>
                  <Link to={`/dashboard/doctors/${doctor?._id}`}><FaRegEdit className='inline'></FaRegEdit></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='flex items-center justify-end space-x-5 mt-5'>
        <select
          defaultValue='10'
          className="select !select-sm select-bordered focus:outline-none bg-[#f0f0f0] border-[#ddd]"
          onChange={(e) => setPagination({ ...pagination, size: e.target.value })}
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
        <div>
          {`showing ${doctors?.pagination?.start} to ${doctors?.pagination?.end} out of ${doctors?.pagination?.totalDocuments}`}
        </div>
        {
          !isLoading &&
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={doctors?.pagination?.totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={(e) => setPagination({ ...pagination, page: e.selected + 1 })}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={doctors?.pagination?.currentPage - 1}
          />
        }
      </div>
    </div>
  );
};

export default AllDoctors;