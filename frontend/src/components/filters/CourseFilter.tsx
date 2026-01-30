import React from "react";

function CourseFilter() {
  return (
    <div className="dropdown dropdown-top dropdown-center">
      <div tabIndex={0} role="button" className="btn m-1">
        Click ⬆️
      </div>
      <ul
        tabIndex={Number("-1")}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <a>BSIT</a>
        </li>
        <li>
          <a>BSBA</a>
        </li>
        <li>
          <a>BTLED</a>
        </li>
        <li>
          <a>BSA</a>
        </li>
      </ul>
    </div>
  );
}

export default CourseFilter;
