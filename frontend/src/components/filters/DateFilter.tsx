import React, { ChangeEvent, useEffect, useState } from "react";

import { CalenderIcon } from "../../icons";
function DateFilter() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(event.target.value));
  };

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return <input type="datetime-local" className="input" />;
}

export default DateFilter;
