import React from 'react';

const Collapses = ({ data, tabIndex }) => {
  return (
    <>
      {
        data?.map((item, i) => (
          <div key={i} tabIndex={tabIndex} className="collapse collapse-arrow bg-white rounded-box">
            <div className="collapse-title !min-h-[unset] text-base text-secondary font-bold">{item.title}</div>
            <div className="collapse-content">
              <p className='text-sm text-accent'>{item.description}</p>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Collapses; 