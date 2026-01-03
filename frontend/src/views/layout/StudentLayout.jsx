import React from "react";
import { Outlet } from "react-router";
function StudentLayout() {
  return (
    <div>
      <h1>StudentLayout</h1>
      <Outlet />
    </div>
  );
}

export default StudentLayout;
