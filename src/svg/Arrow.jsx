import React from "react";

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{width:'20px',height:'20px', color:'white'}}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

export default Arrow;
