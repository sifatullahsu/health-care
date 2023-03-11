import React, { createContext } from 'react';
import { useState } from 'react';
import { useContext } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {

  const [breadcrumbs, setBreadcrumbs] = useState('');
  const [isDashOpen, setIsDashOpen] = useState(false);


  const pass = {
    breadcrumbs, setBreadcrumbs,
    isDashOpen, setIsDashOpen,
  }

  return (
    <DataContext.Provider value={pass}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export default DataProvider;