import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Parser from "./Parser";

const RecentPostcard = (props) => {
  const router = useRouter();
  function timeAgo(date) {
    const now = new Date();
    const givenDate = new Date(date);

    const nowDateOnly = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const givenDateOnly = new Date(
      givenDate.getFullYear(),
      givenDate.getMonth(),
      givenDate.getDate()
    );

    const diffInMilliseconds = nowDateOnly - givenDateOnly;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays < 30) {
      return diffInDays === 1
        ? "1 day ago"
        : `${Math.floor(diffInDays)} days ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  }
  return (
    <div
      className="flex flex-row sm2:flex-col lg:flex-row gap-[12px] sm2:gap-[16px] lg:gap-[22px]"
      onClick={() => {
        router.push(`/blogs/${props.id}`);
      }}
    >
      <img
        alt="img"
        className="w-[106px] sm2:w-[135px] h-full sm2:h-full object-cover rounded-[15px]"
        src={props.img}
      ></img>
      <div className="flex flex-col gap-[4px] sm2:gap-[10px] lg:gap-[16px]">
        <div className="flex gap-[7px] sm2:gap-[4px] items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_19_3107)">
              <path
                d="M13.332 2.00033H12.6654V0.666992H11.332V2.00033H4.66536V0.666992H3.33203V2.00033H2.66536C1.93203 2.00033 1.33203 2.60033 1.33203 3.33366V14.0003C1.33203 14.7337 1.93203 15.3337 2.66536 15.3337H13.332C14.0654 15.3337 14.6654 14.7337 14.6654 14.0003V3.33366C14.6654 2.60033 14.0654 2.00033 13.332 2.00033ZM13.332 14.0003H2.66536V5.33366H13.332V14.0003Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_19_3107">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="text-[12px] sm2:text-[16px] font-[400]">
            {timeAgo(props.date)}
          </p>
        </div>
        <div className="text-[15.5px] sm2:text-[20px] font-[600] sm2:font-[500] w-full">
          {Parser(props.title)}
        </div>
      </div>
    </div>
  );
};

export default RecentPostcard;
