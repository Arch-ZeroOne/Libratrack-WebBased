import { useDate } from "../../context/DateContext";
import * as util from "../../util/util.ts";
function DateFilter() {
  const { logDate, setLogDate } = useDate();

  return (
    <input
      type="date"
      className="input"
      value={logDate}
      onChange={(event) => setLogDate(event.target.value)}
    />
  );
}

export default DateFilter;
