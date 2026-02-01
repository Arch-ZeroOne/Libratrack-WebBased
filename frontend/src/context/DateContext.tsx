import React, { useState, useContext } from "react";
import * as util from "../util/util.ts";
const today = new Date();
const formattedDateUTC = today.toISOString().split("T")[0];
const RowContext = React.createContext({
  logDate: util.getFormattedDate(formattedDateUTC),
  setLogDate: (props: any) => {},
});
export const useDate = () => {
  return useContext(RowContext);
};
export const DateContextProvider = ({ children }: any) => {
  const [logDate, setLogDate] = useState(
    util.getFormattedDate(formattedDateUTC),
  );

  return (
    <RowContext.Provider value={{ logDate, setLogDate }}>
      {children}
    </RowContext.Provider>
  );
};
