import React from "react";

let count = 0;
export default function StateTest({ children }: any) {
  ++count;
  return (
    <>
      {children}
      <div>
        <small>r: {count}</small>
      </div>
    </>
  );
}
