"use client";
import React, { useState, useEffect } from "react";

export const DateTime = ({ voice }) => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <>
      <g fill="#fff" fontFamily="Inter" fontSize={21.667} letterSpacing="0em">
        <text
          xmlSpace="preserve"
          fontWeight={600}
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={304.881} y={64.293}>
            {date.toLocaleTimeString()}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          fontWeight={500}
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={579.897} y={64.621}>
            voice : {voice}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          fontWeight={500}
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={884.778} y={64.621}>
            {date.toLocaleDateString()}
          </tspan>
        </text>
      </g>
    </>
  );
};

export default DateTime;
