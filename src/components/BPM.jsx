import React, { useEffect } from "react";

function BPM({ bpm }) {
  useEffect(() => console.log(bpm), []);
  return (
    <>
      <g filter="url(#n)">
        <path
          stroke="url(#o)"
          strokeLinecap="round"
          strokeWidth={11.51}
          d="M439.792 347.06a114.431 114.431 0 0 1-92.104 112.228 114.427 114.427 0 1 1 58.589-193.14"
          shapeRendering="crispEdges"
        />
      </g>
      <text
        xmlSpace="preserve"
        fill="#fff"
        fontFamily="Inter"
        fontSize={59.583}
        fontWeight={300}
        letterSpacing="0em"
        style={{
          whiteSpace: "pre",
        }}
      >
        <tspan x={291.343} y={356.651}>
          {bpm}
        </tspan>
      </text>
      <text
        xmlSpace="preserve"
        fill="#fff"
        fontFamily="Inter"
        fontSize={21.776}
        fontWeight={500}
        letterSpacing={0}
        style={{
          whiteSpace: "pre",
        }}
      >
        <tspan x={301.629} y={391.684}>
          {"BPM"}
        </tspan>
      </text>
    </>
  );
}

export default BPM;
