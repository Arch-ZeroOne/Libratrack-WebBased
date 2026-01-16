import React, { useState, useContext } from "react";
const RowContext = React.createContext({
  rowData: null,
  setRowData: (props: any) => {},
});
export const useRow = () => {
  return useContext(RowContext);
};
export const LogsProvider = ({ children }: any) => {
  const [rowData, setRowData] = useState(null);

  return (
    <RowContext.Provider value={{ rowData, setRowData }}>
      {children}
    </RowContext.Provider>
  );
};
