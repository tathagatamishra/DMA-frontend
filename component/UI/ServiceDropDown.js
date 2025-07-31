import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import Parser from "./Parser";

const ServiceDropDown = ({ handleMouseEnter, handleMouseLeave, isHover }) => {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const getServiceList = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getServiceList`);
      setServices(data.serviceList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);

  return (
    <div
      className={`z-[100] top-[130px] absolute max-w-[1265px] bg-[#FFF] pt-[30px] pb-[32px] pl-[32px] pr-[23px] flex flex-wrap gap-x-[26px] gap-y-[20px] mx-[20px] ${
        isHover
          ? "block h-fit opacity-100 transform translate-y-0"
          : "hidden h-[0px] opacity-0 transform translate-y-10"
      }  duration-500 transition-transform ease-out overflow-hidden`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {services.map((service) => (
        <div key={service._id} className="flex flex-col w-[283px]">
          <span
            className="font-[700] text-[16px] leading-[24px] text-[#335BF5] mt-[4px] cursor-pointer"
            onClick={() => {
              router.push(`/service/${service._id}`);
            }}
          >
            {Parser(service.title)}
          </span>
          <div className="w-full border border-[#335BF587]"></div>
          <div className="flex flex-col gap-[8px] mt-[12px]">
            {service.subService.map((sub) => (
              <span
                key={sub._id}
                className="font-[600] hover:text-[#335BF5] text-[12px] leading-[18px] cursor-pointer"
                onClick={() => {
                  router.push(`/service/subservice/${sub._id}`);
                }}
              >
                {Parser(sub.title)}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceDropDown;
