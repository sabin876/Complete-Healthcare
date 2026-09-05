import React, { createContext, useContext } from 'react';

const SSRDataContext = createContext(null);

export function SSRDataProvider({ initialData, children }) {
  return (
    <SSRDataContext.Provider value={initialData || null}>
      {children}
    </SSRDataContext.Provider>
  );
}

export function useSSRData() {
  return useContext(SSRDataContext);
}

export default SSRDataContext;
