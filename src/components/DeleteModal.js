import React from 'react';

const DeleteModal = ({ isDelete, setIsDelete, handleDelete }) => {
  return (
    <>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box text-center border-t-4 border-warning max-w-sm">

          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Do you really want to delete this records? This process cannot be undone.</p>
          <div className="modal-action !justify-center">
            <label
              htmlFor="delete-modal"
              className="btn btn-warning btn-sm text-xs"
              onClick={() => handleDelete(isDelete)}
            >Delete</label>
            <label
              htmlFor="delete-modal"
              className="btn btn-primary btn-sm text-xs"
              onClick={() => setIsDelete(false)}
            >Cancle</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;