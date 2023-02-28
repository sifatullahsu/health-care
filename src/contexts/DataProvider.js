import React, { createContext } from 'react';
import { useState } from 'react';
import { useContext } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {

  const [breadcrumbs, setBreadcrumbs] = useState('');


  const pass = {
    breadcrumbs, setBreadcrumbs
  }

  return (
    <DataContext.Provider value={pass}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export default DataProvider;