import React, { ChangeEvent, useEffect, useState } from "react";

import { CalenderIcon } from "../../icons";
import { useDate } from "../../context/DateContext";

function DateFilter() {
  const { setLogDate } = useDate();

  return (
    <input
      type="datetime-local"
      className="input"
      onChange={(event) => setLogDate(event.target.value)}
    />
  );
}

export default DateFilter;
