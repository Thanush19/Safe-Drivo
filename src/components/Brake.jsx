import React, { useEffect, useState } from "react";

function Brake({ brake }) {
  const idle_color = "#317A3C";
  const low_color = "#32D74B";
  const med_color = "#D79F32";
  const high_color = "#D73232";
  const [low, setLow] = useState(idle_color);
  const [med, setMed] = useState(idle_color);
  const [high, setHigh] = useState(idle_color);
  useEffect(() => {
    console.log(brake);
    if (brake == "idle") {
      setLow(idle_color);
      setMed(idle_color);
      setHigh(idle_color);
    } else if (brake == "low") {
      setLow(low_color);
      setMed(idle_color);
      setHigh(idle_color);
    } else if (brake == "med") {
      setLow(low_color);
      setMed(med_color);
      setHigh(idle_color);
    } else if (brake == "high") {
      setLow(low_color);
      setMed(med_color);
      setHigh(high_color);
    }
  }, [brake]);
  return (
    <>
      {/* LOW */}
      <g filter="url(#j)">
        <path fill={low} d="M842 628.266v-23.835h47.67v23.835z" />
      </g>
      <g filter="url(#k)">
        <path fill={low} d="M892.852 628.266v-23.835h47.67v23.835z" />
      </g>
      <g filter="url(#l)">
        <path fill={low} d="M943.688 628.266v-23.835h47.67v23.835z" />
      </g>
      {/* MED */}
      <g fill={med}>
        <path d="M994.547 628.266v-23.835h47.67v23.835zM1045.39 628.266v-23.835h47.67v23.835z" />
      </g>
      {/* HIGH */}
      <g fill={high}>
        <path d="M1096.25 628.266v-23.835h47.67v23.835zM1147.09 628.266v-23.835h47.67v23.835z" />
      </g>
      <text
        xmlSpace="preserve"
        fill="#fff"
        fontFamily="Inter"
        fontSize={29.034}
        fontWeight="bold"
        letterSpacing="0em"
        style={{
          whiteSpace: "pre",
        }}
      >
        <tspan x={985.62} y={578.113}>
          {"BRAKE"}
        </tspan>
      </text>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M935.666 576.13a8.745 8.745 0 0 0 8.745-8.745 8.746 8.746 0 1 0-8.745 8.745Zm0 3.498c6.762 0 12.244-5.481 12.244-12.243 0-6.763-5.482-12.244-12.244-12.244s-12.244 5.481-12.244 12.244c0 6.762 5.482 12.243 12.244 12.243Zm-12.948-24.137c.773.58.929 1.677.349 2.449a15.662 15.662 0 0 0-3.147 9.445c0 3.546 1.17 6.813 3.147 9.444a1.749 1.749 0 0 1-2.798 2.101 19.166 19.166 0 0 1-3.847-11.545c0-4.33 1.432-8.33 3.847-11.546a1.75 1.75 0 0 1 2.449-.348Zm25.888 0a1.75 1.75 0 0 1 2.449.348 19.161 19.161 0 0 1 3.848 11.546 19.16 19.16 0 0 1-3.848 11.545 1.75 1.75 0 0 1-2.797-2.101 15.665 15.665 0 0 0 3.147-9.444c0-3.546-1.171-6.814-3.147-9.445a1.75 1.75 0 0 1 .348-2.449Zm-11.869 14.144.281-8.635h-2.622l.291 8.635h2.05Zm-2.033 1.768c-.251.239-.376.54-.376.905 0 .353.125.652.376.897.256.244.592.367 1.008.367.421 0 .757-.123 1.008-.367.25-.245.375-.544.375-.897 0-.365-.125-.666-.375-.905-.251-.245-.587-.368-1.008-.368-.416 0-.752.123-1.008.368Z"
        clipRule="evenodd"
      />
    </>
  );
}

export default Brake;
