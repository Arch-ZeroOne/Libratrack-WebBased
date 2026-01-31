import React from "react";
import { useCourse } from "../../context/CourseContext";
function CourseFilter() {
  const { setPreferedCourse } = useCourse();

  return (
    <select
      defaultValue="ALL"
      className="select w-full"
      onChange={(e) => setPreferedCourse(e.target.value)}
    >
      <option disabled={true}>Filter By Course</option>
      <option value="ALL">ALL</option>
      <option value="BSIT">BSIT</option>
      <option value="BSBA">BSBA</option>
      <option value="BSA">BSA</option>
      <option value="BTLED">BTLED</option>
    </select>
  );
}

export default CourseFilter;
