import React, { useEffect, useState } from "react";

function Acceleration({ acc }) {
  const idle_color = "#317A3C";
  const low_color = "#32D74B";
  const med_color = "#D79F32";
  const high_color = "#D73232";
  const [low, setLow] = useState(idle_color);
  const [med, setMed] = useState(idle_color);
  const [high, setHigh] = useState(idle_color);
  useEffect(() => {
    console.log(acc);
    if (acc == "idle") {
      setLow(idle_color);
      setMed(idle_color);
      setHigh(idle_color);
    } else if (acc == "low") {
      setLow(low_color);
      setMed(idle_color);
      setHigh(idle_color);
    } else if (acc == "med") {
      setLow(low_color);
      setMed(med_color);
      setHigh(idle_color);
    } else if (acc == "high") {
      setLow(low_color);
      setMed(med_color);
      setHigh(high_color);
    }
  }, [acc]);
  return (
    <>
      {/* LOW */}
      <g filter="url(#g)">
        <path fill={low} d="M160.812 628.32v-23.835h47.67v23.835z" />
      </g>
      <g filter="url(#h)">
        <path fill={low} d="M211.664 628.32v-23.835h47.67v23.835z" />
      </g>
      <g filter="url(#i)">
        <path fill={low} d="M262.504 628.32v-23.835h47.67v23.835z" />
      </g>
      {/* MEDIUM */}
      <g fill={med}>
        <path d="M313.359 628.32v-23.835h47.67v23.835zM364.203 628.32v-23.835h47.67v23.835z" />
      </g>
      {/* HIGH */}
      <g fill={high}>
        <path d="M415.059 628.32v-23.835h47.67v23.835zM465.906 628.32v-23.835h47.67v23.835z" />
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
        <tspan x={240.002} y={578.105}>
          {"ACCELERATION"}
        </tspan>
      </text>
      <g clipPath="url(#j)">
        <path
          fill="#fff"
          fillOpacity={0.9}
          d="M206.452 586.88c10.696 0 19.525-8.829 19.525-19.506 0-10.678-8.847-19.507-19.544-19.507-10.678 0-19.488 8.829-19.488 19.507 0 10.677 8.829 19.506 19.507 19.506Zm0-3.886c-8.659 0-15.583-6.961-15.583-15.62 0-8.659 6.924-15.602 15.564-15.602 8.659 0 15.62 6.943 15.639 15.602.019 8.659-6.961 15.62-15.62 15.62Zm-.019-24.355a1.965 1.965 0 0 0 1.943-1.943 1.953 1.953 0 0 0-1.943-1.943 1.924 1.924 0 0 0-1.924 1.943c0 1.057.868 1.943 1.924 1.943Zm-7.452 3.283a1.952 1.952 0 0 0 1.943-1.943 1.951 1.951 0 0 0-1.943-1.943 1.965 1.965 0 0 0-1.943 1.943c0 1.056.887 1.943 1.943 1.943Zm4.49 8.414c1.604 1.565 3.811 1.207 5.094-.642l6.923-9.829c.774-1.131-.358-2.245-1.471-1.49l-9.923 6.848c-1.849 1.264-2.189 3.49-.623 5.113Zm-7.621-1.019a1.953 1.953 0 0 0 1.943-1.943 1.94 1.94 0 0 0-1.943-1.943 1.951 1.951 0 0 0-1.943 1.943c0 1.056.886 1.943 1.943 1.943Zm21.185 0a1.965 1.965 0 0 0 1.943-1.943 1.951 1.951 0 0 0-1.943-1.943 1.94 1.94 0 0 0-1.943 1.943c0 1.056.868 1.943 1.943 1.943Zm-18.016 7.395a1.953 1.953 0 0 0 1.943-1.943 1.94 1.94 0 0 0-1.943-1.943 1.953 1.953 0 0 0-1.943 1.943c0 1.056.887 1.943 1.943 1.943Zm14.847 0a1.965 1.965 0 0 0 1.943-1.943 1.953 1.953 0 0 0-1.943-1.943 1.94 1.94 0 0 0-1.943 1.943c0 1.056.868 1.943 1.943 1.943Z"
        />
      </g>
    </>
  );
}

export default Acceleration;
