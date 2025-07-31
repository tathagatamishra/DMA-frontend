import React, { useEffect, useState } from "react";
import Parser from "./Parser";

const WhyChooseUsCard = (props) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [count, setCount] = useState(0);
  const [formattedCount, setFormattedCount] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const parseNumber = (str) => {
      const number = parseFloat(str.replace(/[^0-9.k]/g, "")); // Remove non-numeric characters except 'k' and '.'
      if (str.toLowerCase().includes("k")) {
        return number * 1000; // Multiply by 1000 if 'k' is present
      }
      return number; // Return the number as-is if 'k' is not present
    };

    const formatNumber = (num) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Format with one decimal place if necessary
      }
      return num.toString();
    };

    let start = 1;
    const end = parseNumber(props.number);
    const duration = 1000; // Duration of the animation in milliseconds
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    const timer = setInterval(() => {
      if (start <= 1000) {
        start += 1;
      } else {
        start += 100;
      }
      setCount(start);
      setFormattedCount(formatNumber(start));
      if (start >= end) {
        setFormattedCount(formatNumber(end));
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [props.number]);

  return (
    <div
      className="h-[111px] w-[125px] xsm1:w-[156px] xsm2:h-[141px] xsm2:w-[186px] xsm3:w-[212px] xsm3:h-[167px] sm:w-[254px] sm:h-[209px] sm2:w-[292px] rounded-[12px] flex flex-col gap-[13px] sm:gap-[23px] items-center justify-center px-[23.93px] hover:scale-[104%] transition-[300ms] z-[1] hover:z-[2]"
      style={{
        boxShadow: `${
          windowWidth >= 568
            ? "2px 2px 12px #00000021"
            : "2px 2px 8px #0000001a"
        }`,
      }}
    >
      <div className="flex items-center justify-center gap-[14px] xsm2:gap-[29px]">
        <img src={props.logo} className="sm:h-[48px] h-[28px] sm:w-[48px] w-[28px] object-contain" />
        <span className="font-[700] text-[11px] xsm1:text-[12.8px] xsm2:text-[14.6px] xsm3:text-[16.4px] sm:text-[18.2px] sm2:text-[20px] text-[#737373] max-w-[114px]">
          {Parser(props.title)}
        </span>
      </div>
      <p className="text-[#252B42] text-[23px] xsm1:text-[26.4px] xsm2:text-[29.8px] xsm3:text-[33.2px] sm:text-[36.6px] sm2:text-[40px] font-[700]">
        {formattedCount}
      </p>
    </div>
  );
};

export default WhyChooseUsCard;
