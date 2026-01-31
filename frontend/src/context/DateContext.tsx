import React, { useState, useContext } from "react";
const RowContext = React.createContext({
  logDate: null,
  setLogDate: (props: any) => {},
});
export const useDate = () => {
  return useContext(RowContext);
};
export const DateContextProvider = ({ children }: any) => {
  const [logDate, setLogDate] = useState(null);

  return (
    <RowContext.Provider value={{ logDate, setLogDate }}>
      {children}
    </RowContext.Provider>
  );
};
