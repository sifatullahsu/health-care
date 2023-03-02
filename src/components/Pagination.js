import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ data, isLoading, state, setState }) => {
  return (
    <div className='flex items-center justify-end space-x-5 mt-5'>
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
      <div>
        {`showing ${data?.start} to ${data?.end} out of ${data?.totalDocuments}`}
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
  );
};

export default Pagination;