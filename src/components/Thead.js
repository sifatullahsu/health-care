import React from 'react';

const Thead = ({ data }) => {
  return (
    <thead>
      <tr>
        {data?.map((item, i) => <th key={i}>{item}</th>)}
      </tr>
    </thead>
  );
};

export default Thead;