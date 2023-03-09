import React from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';

const Pagination = ({ data, isLoading, state, setState }) => {
  return (
    <div className='flex flex-wrap items-center justify-between md:justify-end md:space-x-5 mt-5'>
      <div className='order-2 md:order-1'>
        <select
          defaultValue='10'
          className="select !select-sm select-bordered focus:outline-none bg-[#f0f0f0] border-[#ddd]"
          onChange={(e) => setState({ page: 1, size: e.target.value })}
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </div>
      <div className='order-1 md:order-2 basis-full md:basis-[unset] mb-4 md:mb-0'>
        {
          !isLoading ?
            <>
              {`showing ${data?.start} to ${data?.end} out of ${data?.totalDocuments}`}
            </>
            :
            <>
              <Skeleton width={200}></Skeleton>
            </>
        }
      </div>
      <div className='order-3'>
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
            pageCount={data?.totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={(e) => setState({ ...state, page: e.selected + 1 })}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={data?.currentPage - 1}
          />
        }
      </div>
    </div>
  );
};

export default Pagination;