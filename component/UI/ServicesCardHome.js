import React, { useState } from "react";
import Parser from "./Parser";

const ServicesCardHome = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative min-w-[300px] xsm1:min-w-[360px] sm:min-w-[364px] h-[391px] xsm1:h-[386px] sm:h-[480px] bg-cover bg-center"
      style={{
        outline: "1px solid #d8d8d8",
        backgroundImage: `url(${props.coverimage})`,
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={props.onClick}
    >
      {/* Overlay */}
      <div
        className="absolute w-full h-full top-0 left-0 transition-colors duration-300"
        style={{ backgroundColor: isHovered ? "#335BF5C9" : "#00000066" }}
      ></div>
      {/* Content */}
      <div className="relative pl-[20px] sm:pl-[24px] pt-[185px] sm:pt-[272px] pr-[49px]">
        <p className="text-[20px] sm:text-[24px] font-[700] text-[#FFF] z-10">
          {Parser(props.title)}
        </p>
        <p className="text-overflow-clamp text-[14px] font-[500] text-[#FFF] z-10">
          {Parser(props.description)}
        </p>
      </div>

      <div className="absolute flex gap-[8px] items-center pl-[20px] sm:pl-[24px] bottom-[28px]">
        <p className="text-[14px] font-[700] text-[#FFF] hover:scale-[103%] transition-[300ms]">
          Read More
        </p>
        <svg
          className="text-white animate-pulse"
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_19_2357)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.8598 0.695773C10.9217 0.633716 10.9953 0.58448 11.0762 0.550886C11.1572 0.517292 11.244 0.5 11.3316 0.5C11.4193 0.5 11.5061 0.517292 11.587 0.550886C11.668 0.58448 11.7415 0.633716 11.8034 0.695773L15.8017 4.69404C15.8637 4.75594 15.913 4.82947 15.9466 4.91043C15.9802 4.99139 15.9975 5.07818 15.9975 5.16583C15.9975 5.25348 15.9802 5.34027 15.9466 5.42123C15.913 5.50219 15.8637 5.57573 15.8017 5.63763L11.8034 9.63589C11.6783 9.76102 11.5086 9.83131 11.3316 9.83131C11.1547 9.83131 10.985 9.76102 10.8598 9.63589C10.7347 9.51076 10.6644 9.34105 10.6644 9.16409C10.6644 8.98714 10.7347 8.81743 10.8598 8.6923L14.3876 5.16583L10.8598 1.63936C10.7978 1.57746 10.7485 1.50393 10.7149 1.42297C10.6814 1.34201 10.6641 1.25522 10.6641 1.16757C10.6641 1.07992 10.6814 0.993126 10.7149 0.912168C10.7485 0.831209 10.7978 0.757674 10.8598 0.695773Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 5.16638C0 4.98964 0.0702075 4.82015 0.195178 4.69518C0.320147 4.57021 0.489643 4.5 0.666377 4.5H14.6603C14.837 4.5 15.0065 4.57021 15.1315 4.69518C15.2565 4.82015 15.3267 4.98964 15.3267 5.16638C15.3267 5.34311 15.2565 5.51261 15.1315 5.63758C15.0065 5.76255 14.837 5.83275 14.6603 5.83275H0.666377C0.489643 5.83275 0.320147 5.76255 0.195178 5.63758C0.0702075 5.51261 0 5.34311 0 5.16638Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_19_2357">
              <rect width="16" height="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default ServicesCardHome;
