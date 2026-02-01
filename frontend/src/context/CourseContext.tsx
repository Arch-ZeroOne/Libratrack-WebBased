import React, { useState, useContext } from "react";
const CourseContext = React.createContext({
  preferedCourse: "ALL",
  setPreferedCourse: (props: any) => {},
});
export const useCourse = () => {
  return useContext(CourseContext);
};
export const CourseProvider = ({ children }: any) => {
  const [preferedCourse, setPreferedCourse] = useState("ALL");

  return (
    <CourseContext.Provider value={{ preferedCourse, setPreferedCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
