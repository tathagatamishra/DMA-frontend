import React from "react";

const TeamCard = (props) => {
  return (
    <div key={props.key} className="flex flex-col gap-[6.14px] md:gap-[19px] items-center justify-center hover:scale-[107%] transition-[300ms]">
      <img
        alt="img"
        src={props.img}
        className="w-[156px] h-[165px] md:w-[269px] md:h-[286px] rounded-[12px] object-cover"
      ></img>
      <div className="flex flex-col items-center justify-center">
        <p className="font-[600] text-[16px] md:text-[24px] leading-[28px]">
          {props.name}
        </p>
        <p className="font-[400] text-[12px] md:text-[16px] leading-[28px]">
          {props.designation}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
