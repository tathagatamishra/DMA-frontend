import React from "react";

const WhatClientsayCard = (props) => {
  return (
    <div className="h-[201.41px] w-[208px] sm:h-[415px] sm:w-[430px] bg-[#FFFFFF3D] px-[25px] sm:px-[53px] sm:pt-[55px] pt-[27px] flex flex-col items-center sm:justify-center rounded-[6.79px] sm:rounded-[14px]">
      <img
        alt="img"
        src={props.image}
        className="object-cover w-[50px] h-[17px] sm:h-[35px] sm:w-[104px]"
      />
      <p className="text-[11px] sm:text-[24px] font-[700] text-[#fff] text-center mt-[26px] sm:mt-[54px]">
        {props.content}
      </p>
      <div className="flex flex-col mt-[23.77px] sm:mt-[50px] items-center justify-center">
        <p className="font-[700] text-[12px]  sm:text-[17px] text-[#fff] leading-[14px] sm:leading-[29px]">
          {props.name}
        </p>
        <p className=" sm:font-[600] font-[400] text-[11px] sm:text-[16px] text-[#fff] leading-[12.62px] sm:leading-[26px]">
          {props.designation}
        </p>
      </div>
    </div>
  );
};

export default WhatClientsayCard;
