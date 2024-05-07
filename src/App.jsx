import { useEffect, useState } from "react";
import DateTime from "./components/DateTime";
import Acceleration from "./components/Acceleration";
import Brake from "./components/Brake";
import BPM from "./components/BPM";
import EAR from "./components/EAR";
import SeatBelt from "./components/SeatBelt";
import { db } from "./firebase/config";
import { onValue, ref, set } from "firebase/database";
import Alcohol from "./components/Alcohol";
import LeftLight from "./components/LeftLight";
import HeadLight from "./components/HeadLight";
import RightLight from "./components/RightLight";
import Steering from "./components/Steering";
import logo from "./assets/Accenture-logo.png";

function App() {
  const [data, setData] = useState({
    // acceleration: "low",
    // bpm: 75,
    // brake: "med",
    // ear: 1,
    // seatbelt: true,
  });

  const [showHistory, setShowHistory] = useState(false);

  function getCurrentDateAndTime() {
    const currentTime = new Date();

    // Get the current time in various formats
    const currentYear = currentTime.getFullYear(); // e.g., 2023
    const currentMonth = currentTime.getMonth(); // Note: Months are 0-indexed (0 - January, 11 - December)
    const currentDate = currentTime.getDate(); // e.g., 31
    const currentHour = currentTime.getHours(); // e.g., 15 (3:00 PM)
    const currentMinute = currentTime.getMinutes(); // e.g., 22
    const currentSecond = currentTime.getSeconds();

    const output =
      "Date : " +
      currentDate +
      "-" +
      currentMonth +
      "-" +
      currentYear +
      " " +
      "Time : " +
      currentHour +
      ":" +
      currentMinute +
      ":" +
      currentSecond;
    return output;
  }

  const [history, setHistory] = useState({
    start_time: "",
    acceleration: 0,
    bpm: 0,
    brake: 0,
    ear: 0,
    end_time: "",
  });

  useEffect(() => {
    getCurrentDateAndTime();
    let new_val = history;
    const start_time = getCurrentDateAndTime();
    Object.assign(new_val, { start_time: start_time });
    setHistory(new_val);
    //
    const query = ref(db, "sensor-values");
    return onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        console.log(val);
        setData(val);
        checkAbnormality(val);
      }
    });
  }, []);

  function checkAbnormality(val) {
    const { acceleration, brake, bpm, ear } = val;

    let new_val = history;

    if (acceleration == "high") {
      Object.assign(new_val, { acceleration: new_val.acceleration + 1 });
    }
    if (brake == "high") {
      Object.assign(new_val, { brake: new_val.brake + 1 });
    }
    if (bpm == 0) {
      Object.assign(new_val, { brake: new_val.bpm + 1 });
    }
    if (ear == 0) {
      Object.assign(new_val, { ear: new_val.ear + 1 });
    }

    const currentTime = new Date();

    // Get the current time in various formats
    const currentYear = currentTime.getFullYear(); // e.g., 2023
    const currentMonth = currentTime.getMonth(); // Note: Months are 0-indexed (0 - January, 11 - December)
    const currentDate = currentTime.getDate(); // e.g., 31
    const currentHour = currentTime.getHours(); // e.g., 15 (3:00 PM)
    const currentMinute = currentTime.getMinutes(); // e.g., 22
    const currentSecond = currentTime.getSeconds();

    const output =
      "Date : " +
      currentDate +
      "-" +
      currentMonth +
      "-" +
      currentYear +
      " " +
      "Time : " +
      currentHour +
      ":" +
      currentMinute +
      ":" +
      currentSecond;

    Object.assign(new_val, { end_time: output });

    setHistory(new_val);

    console.log(new_val);

    set(ref(db, "history"), new_val);
  }

  return (
    <section className="bg-black h-screen w-screen px-4 flex flex-col justify-center items-center relative">
      {/* <img src={logo} className="bg-white h-20 w-40 object-contain" /> */}
      <button
        className="text-black bg-white p-2 rounded-md absolute top-2 right-2"
        onClick={() => setShowHistory(!showHistory)}
      >
        {!showHistory ? "Check History" : "Close"}
      </button>
      {showHistory ? (
        <div className=" bg-slate-500 rounded-lg absolute top-2 left-2 text-white p-2">
          <h2 className="text-black text-xl font-semibold text-center">
            History
          </h2>
          <h3>
            Trip START Time :{" "}
            <span className="text-black font-semibold">
              {history.start_time}
            </span>
          </h3>
          <h3>
            Trip END Time :{" "}
            <span className="text-black font-semibold">{history.end_time}</span>
          </h3>
          <h2 className="text-black text-xl font-semibold text-center underline">
            Exceeded Limits
          </h2>
          <h2>
            Acceleration : <span>{history.acceleration} times</span>
          </h2>
          <h2>
            Brake : <span>{history.brake} times</span>
          </h2>
          <h2>
            BPM : <span>{history.bpm} times</span>
          </h2>
          <h2>
            EAR : <span>{history.ear} times</span>
          </h2>
        </div>
      ) : (
        <></>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1339 686"
        fill="none"
      >
        <g clipPath="url(#a)">
          <rect width={1339} height={686} fill="#202020" rx={214} />
          <g filter="url(#b)">
            <path
              fill="url(#c)"
              d="M263.203 68.263 210.938 18h918.802l-52.27 50.263a98.839 98.839 0 0 1-68.52 27.602H331.725a98.856 98.856 0 0 1-68.522-27.602Z"
              shapeRendering="crispEdges"
            />
          </g>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M1231.24 183.927c4.83 0 8.75-3.915 8.75-8.746 0-4.83-3.92-8.745-8.75-8.745s-8.74 3.915-8.74 8.745c0 4.831 3.91 8.746 8.74 8.746Zm0 3.498c6.77 0 12.25-5.481 12.25-12.244 0-6.762-5.48-12.243-12.25-12.243-6.76 0-12.24 5.481-12.24 12.243 0 6.763 5.48 12.244 12.24 12.244Zm-12.94-24.137c.77.58.92 1.677.34 2.449a15.702 15.702 0 0 0-3.14 9.445 15.7 15.7 0 0 0 3.14 9.444 1.75 1.75 0 0 1-.34 2.449 1.75 1.75 0 0 1-2.45-.348 19.136 19.136 0 0 1-3.85-11.545c0-4.33 1.43-8.33 3.85-11.546a1.75 1.75 0 0 1 2.45-.348Zm25.88 0a1.75 1.75 0 0 1 2.45.348 19.137 19.137 0 0 1 3.85 11.546c0 4.329-1.43 8.329-3.85 11.545a1.75 1.75 0 0 1-2.45.348 1.75 1.75 0 0 1-.34-2.449 15.7 15.7 0 0 0 3.14-9.444c0-3.546-1.17-6.814-3.14-9.445a1.75 1.75 0 0 1 .34-2.449Zm-13.85 13.598h1.83c.77 0 1.44-.127 2-.382s.99-.617 1.28-1.087c.3-.469.45-1.024.45-1.667 0-.633-.15-1.195-.45-1.687-.29-.492-.72-.877-1.28-1.155-.56-.282-1.23-.424-2-.424h-3.88v9.949h2.05v-3.547Zm0-1.598v-3.198h1.83c.39 0 .71.077.95.232.25.155.43.36.54.615.12.255.17.531.17.827 0 .292-.05.553-.17.786-.11.232-.29.414-.54.546-.24.128-.56.192-.95.192h-1.83ZM1198.74 129.771c4.83 0 8.75-3.916 8.75-8.746s-3.92-8.745-8.75-8.745-8.74 3.915-8.74 8.745c0 4.83 3.91 8.746 8.74 8.746Zm0 3.498c6.77 0 12.25-5.482 12.25-12.244s-5.48-12.244-12.25-12.244c-6.76 0-12.24 5.482-12.24 12.244s5.48 12.244 12.24 12.244Zm-12.94-24.137c.77.58.92 1.677.34 2.449a15.699 15.699 0 0 0-3.14 9.444c0 3.546 1.17 6.814 3.14 9.445a1.75 1.75 0 0 1-.34 2.449 1.75 1.75 0 0 1-2.45-.348 19.137 19.137 0 0 1-3.85-11.546c0-4.329 1.43-8.329 3.85-11.545a1.75 1.75 0 0 1 2.45-.348Zm25.88 0a1.75 1.75 0 0 1 2.45.348 19.136 19.136 0 0 1 3.85 11.545c0 4.33-1.43 8.33-3.85 11.546a1.75 1.75 0 0 1-2.45.348 1.75 1.75 0 0 1-.34-2.449 15.702 15.702 0 0 0 3.14-9.445c0-3.546-1.17-6.813-3.14-9.444a1.75 1.75 0 0 1 .34-2.449Zm-7.13 13.451c.02.091.03.192.03.303 0 .134-.02.254-.06.359a.584.584 0 0 1-.22.252c-.09.063-.23.094-.39.094-.15 0-.27-.019-.39-.056a.777.777 0 0 1-.28-.175.726.726 0 0 1-.17-.316 1.695 1.695 0 0 1-.06-.482h-1.25c0 .353.06.659.17.918.11.256.26.468.46.636.19.165.42.289.67.372.26.079.53.119.82.119.3 0 .56-.041.8-.124.24-.082.45-.199.62-.35.17-.154.3-.336.39-.546.09-.214.14-.45.14-.709 0-.262-.04-.496-.11-.701a1.896 1.896 0 0 0-.33-.551 2.541 2.541 0 0 0-.54-.444 5.038 5.038 0 0 0-.75-.367 4.295 4.295 0 0 1-.4-.175c-.12-.06-.23-.121-.32-.184a.926.926 0 0 1-.2-.217.53.53 0 0 1-.08-.278c0-.137.03-.259.08-.367a.54.54 0 0 1 .23-.261c.1-.065.23-.098.39-.098.17 0 .31.039.42.115.11.077.19.184.24.321.05.133.07.289.07.465h1.25c0-.373-.08-.703-.24-.991a1.768 1.768 0 0 0-.68-.679c-.29-.165-.64-.247-1.04-.247-.29 0-.56.041-.79.124-.24.082-.45.2-.62.354a1.44 1.44 0 0 0-.41.547c-.1.213-.14.451-.14.713 0 .267.05.501.15.7.1.197.24.367.41.513.17.145.37.273.58.384.22.108.44.211.67.307.2.083.36.163.47.239.13.077.22.154.28.231.07.077.11.161.13.252Zm-10.06-4.279H1193.35l-1.94 6.218h1.32l.33-1.281h1.72l.34 1.281h1.33l-1.96-6.218Zm.02 3.899h-1.18l.59-2.236.59 2.236Zm3.78 1.285v-1.678h.85c.16 0 .29.036.38.107.09.068.16.168.2.299.04.131.06.284.06.461 0 .157-.02.296-.06.418a.601.601 0 0 1-.23.287.67.67 0 0 1-.4.106h-.8Zm2.01-2.246a.801.801 0 0 1-.13.073c.11.032.21.079.3.141.2.136.34.316.43.538.09.219.13.452.13.7 0 .399-.07.735-.22 1.008-.15.27-.37.475-.66.615-.29.136-.64.205-1.06.205h-2.05v-6.218h1.92c.31 0 .58.034.83.103.24.068.45.172.62.311.17.14.3.316.39.53.09.213.14.465.14.756 0 .256-.05.492-.16.709-.1.216-.26.393-.48.529Zm-.94-.423a.91.91 0 0 1-.42.086h-.65v-1.563h.67c.17 0 .31.027.42.081.11.054.19.139.23.256.05.114.08.266.08.457 0 .165-.03.306-.08.423a.599.599 0 0 1-.25.26ZM1250.42 236.63c4.83 0 8.75-3.915 8.75-8.745 0-4.831-3.92-8.746-8.75-8.746s-8.74 3.915-8.74 8.746c0 4.83 3.91 8.745 8.74 8.745Zm0 3.498c6.77 0 12.25-5.481 12.25-12.243 0-6.763-5.48-12.244-12.25-12.244-6.76 0-12.24 5.481-12.24 12.244 0 6.762 5.48 12.243 12.24 12.243Zm-12.94-24.137c.77.58.92 1.677.34 2.449a15.702 15.702 0 0 0-3.14 9.445c0 3.546 1.17 6.813 3.14 9.444a1.75 1.75 0 0 1-.34 2.449 1.75 1.75 0 0 1-2.45-.348 19.136 19.136 0 0 1-3.85-11.545c0-4.33 1.43-8.33 3.85-11.546a1.75 1.75 0 0 1 2.45-.348Zm25.88 0a1.75 1.75 0 0 1 2.45.348 19.137 19.137 0 0 1 3.85 11.546c0 4.329-1.43 8.329-3.85 11.545a1.75 1.75 0 0 1-2.45.348 1.75 1.75 0 0 1-.34-2.449 15.699 15.699 0 0 0 3.14-9.444c0-3.546-1.17-6.814-3.14-9.445a1.75 1.75 0 0 1 .34-2.449Zm-11.87 14.144.29-8.635h-2.63l.29 8.635h2.05Zm-2.03 1.768c-.25.239-.37.54-.37.905 0 .353.12.652.37.897.26.244.59.367 1.01.367.42 0 .76-.123 1.01-.367.25-.245.37-.544.37-.897 0-.365-.12-.666-.37-.905-.25-.245-.59-.368-1.01-.368-.42 0-.75.123-1.01.368Z"
            clipRule="evenodd"
            opacity={0.4}
          />
          <g strokeLinecap="square" strokeWidth={4.063}>
            <path stroke="url(#d)" d="m632.076 399.203-85.99 268.802" />
            <path stroke="url(#e)" d="m708.589 399.203 85.989 268.802" />
          </g>
          <path
            fill="#E9ED26"
            fillRule="evenodd"
            d="M169.858 104.539c-.502-.864-.095-1.915.908-2.347l4.063-1.749c1.003-.432 2.223-.082 2.725.782.501.864.095 1.915-.909 2.347l-4.062 1.749c-1.004.432-2.224.082-2.725-.782Zm-23.016-2.526a2.67 2.67 0 0 0-1.764.656 3.167 3.167 0 0 0-.689.875c-.294.535-.504 1.198-.66 1.88-.318 1.394-.499 3.263-.499 5.335s.181 3.941.499 5.335c.156.682.366 1.345.66 1.88.145.264.362.59.689.875a2.67 2.67 0 0 0 1.764.656c.948 0 2.818-.415 4.462-1.707 1.745-1.37 3.098-3.611 3.098-7.039 0-3.428-1.353-5.669-3.098-7.04-1.644-1.291-3.514-1.706-4.462-1.706Zm.451 8.746c0-1.926.17-3.556.423-4.66.022-.1.045-.192.068-.278.243.115.513.271.783.483.8.629 1.773 1.886 1.773 4.455s-.973 3.826-1.773 4.455c-.27.212-.54.368-.783.483a6.346 6.346 0 0 1-.068-.278c-.253-1.104-.423-2.734-.423-4.66Zm.789-5.753-.005.007a.04.04 0 0 1 .005-.007Zm-.001 11.505.001.001-.005-.007.004.006Zm15.913-14.498c.835 0 1.43.365 1.764.656.327.284.544.611.689.875.294.535.504 1.198.66 1.88.318 1.394.498 3.263.498 5.335s-.18 3.941-.498 5.335c-.156.682-.366 1.345-.66 1.88-.145.264-.362.59-.689.875a2.67 2.67 0 0 1-1.764.656c-.949 0-2.818-.415-4.462-1.707-1.745-1.37-3.098-3.611-3.098-7.039 0-3.428 1.353-5.669 3.098-7.04 1.644-1.291 3.513-1.706 4.462-1.706Zm-.451 8.746c0-1.926-.171-3.556-.423-4.66a6.346 6.346 0 0 0-.068-.278 4.124 4.124 0 0 0-.783.483c-.8.629-1.773 1.886-1.773 4.455s.973 3.826 1.773 4.455c.27.212.54.368.783.483.023-.086.046-.178.068-.278.252-1.104.423-2.734.423-4.66Zm-.789-5.753Zm0 11.506.005-.007-.005.007Zm6.887-5.765c0-.966.909-1.749 2.031-1.749h4.062c1.122 0 2.032.783 2.032 1.749 0 .966-.91 1.749-2.032 1.749h-4.062c-1.122 0-2.031-.783-2.031-1.749Zm-30.473-1.749c1.122 0 2.031.783 2.031 1.749 0 .966-.909 1.749-2.031 1.749h-4.063c-1.121 0-2.031-.783-2.031-1.749 0-.966.91-1.749 2.031-1.749h4.063Zm.91-6.806c1.003.432 1.41 1.483.908 2.347-.502.864-1.722 1.214-2.725.782l-4.063-1.749c-1.003-.432-1.41-1.483-.908-2.347.502-.864 1.722-1.214 2.725-.782l4.063 1.749Zm29.78 14.772c-.502.864-.095 1.915.908 2.347l4.063 1.749c1.003.432 2.223.082 2.725-.782.501-.864.095-1.915-.909-2.347l-4.062-1.749c-1.004-.432-2.224-.082-2.725.782Zm-29.78 2.347c1.003-.432 1.41-1.483.908-2.347-.502-.864-1.722-1.214-2.725-.782l-4.063 1.749c-1.003.432-1.41 1.483-.908 2.347.502.864 1.722 1.214 2.725.782l4.063-1.749Z"
            clipRule="evenodd"
            opacity={0.5}
          />
          <HeadLight headlight={data.headlight} />
          <LeftLight left={data.left_in} />
          <RightLight right={data.right_in} />
          {/* DATETIME */}
          <DateTime voice={data.voice} />
          {/* ACCELARATION LEVELS */}
          <Acceleration acc={data.acceleration} />
          {/* BRAKE LEVELS */}
          <Brake brake={data.brake} />
          {/* ALCOHOL */}
          <Alcohol alcohol={data.alcohol} />
          {/* SEATBELT */}
          <SeatBelt seatbelt={data.seatbelt} />
          {/* BPM VALUE */}
          <BPM bpm={data.bpm} />
          {/* EYE ASPECT RATIO */}
          <EAR ear={data.ear} />
          <Steering steering={data.steering} />
          <text
            id="STEERING_2"
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="29.0341"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="605.198" y="656.058">
              STEERING
            </tspan>
          </text>
        </g>
        <defs>
          <filter
            id="b"
            width={1021.72}
            height={180.784}
            x={159.479}
            y={-19.917}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={13.542} />
            <feGaussianBlur stdDeviation={25.729} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <filter
            id="g"
            width={289.202}
            height={265.367}
            x={40.047}
            y={515.499}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={31.78} />
            <feGaussianBlur stdDeviation={60.383} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <filter
            id="h"
            width={289.202}
            height={265.367}
            x={90.899}
            y={515.499}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={31.78} />
            <feGaussianBlur stdDeviation={60.383} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <filter
            id="i"
            width={289.202}
            height={265.367}
            x={141.739}
            y={515.499}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={31.78} />
            <feGaussianBlur stdDeviation={60.383} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <filter
            id="k"
            width={289.202}
            height={265.367}
            x={708.563}
            y={515.507}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={31.78} />
            <feGaussianBlur stdDeviation={60.383} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <filter
            id="l"
            width={289.202}
            height={265.367}
            x={759.422}
            y={515.507}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={31.78} />
            <feGaussianBlur stdDeviation={60.383} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <filter
            id="m"
            width={289.202}
            height={265.367}
            x={810.258}
            y={515.507}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={31.78} />
            <feGaussianBlur stdDeviation={60.383} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <filter
            id="n"
            width={343.28}
            height={343.284}
            x={153.725}
            y={188.958}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={13.542} />
            <feGaussianBlur stdDeviation={25.729} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.1 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_3"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_202_3"
              result="shape"
            />
          </filter>
          <linearGradient
            id="c"
            x1={670.339}
            x2={670.339}
            y1={18}
            y2={95.865}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#01EBD4" />
            <stop offset={1} stopColor="#212121" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="d"
            x1={589.081}
            x2={589.081}
            y1={399.203}
            y2={668.005}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.063} stopColor="#fff" stopOpacity={0} />
            <stop offset={1} stopColor="#fff" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient
            id="e"
            x1={751.583}
            x2={751.583}
            y1={399.203}
            y2={668.005}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.063} stopColor="#fff" stopOpacity={0} />
            <stop offset={1} stopColor="#fff" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient
            id="o"
            x1={412.031}
            x2={245.469}
            y1={265.133}
            y2={417.815}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#01E4E0" stopOpacity={0} />
            <stop offset={0.336} stopColor="#01E4E0" />
          </linearGradient>
          <clipPath id="a">
            <rect width={1339} height={686} fill="#fff" rx={214} />
          </clipPath>
          <clipPath id="f">
            <path fill="#fff" d="M97.863 138.445h35.208v47.531H97.863z" />
          </clipPath>
          <clipPath id="j">
            <path fill="#fff" d="M171.703 540.609h54.167v54.167h-54.167z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}

export default App;
