import React from "react";

function CourseFilter() {
  return (
    <>
      {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
      {/* For TSX uncomment the commented types below */}
      <button
        className="btn btn-primary"
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
      >
        Filter By Course
      </button>

      <ul
        className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}
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
    </>
  );
}

export default CourseFilter;
