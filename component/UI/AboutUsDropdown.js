import React from "react";
import { useRouter } from "next/navigation";

const AboutDropDown = ({ handleMouseEnterAbout, handleMouseLeaveAbout, isHoverAbout }) => {
  const router = useRouter();
  
  const aboutOptions = [
    {
      id:1,
      title:"Who we are",
      path:"/about"
    },
    {
      id: 2,
      title: "Founder",
      path: "/about/founder"
    },
    {
      id: 3,
      title: "Testimonials",
      path: "/testimonials"
    },
    // {
    //   id: 3,
    //   title: "Company Culture",
    //   path: "/company-culture"
    // }
  ];

  return (
    <div
      className={`z-[100] top-[110px] absolute max-w-[265px] bg-[#FFF] pt-[30px] pb-[32px] pl-[32px] pr-[23px] flex flex-wrap gap-x-[26px] gap-y-[20px] ml-0 md:mr-[170px] lg:mr-[350px] mr-[100px] shadow-lg before:content-[''] before:absolute before:h-[20px] before:w-full before:top-[-20px] before:left-0 ${
        isHoverAbout
          ? "block h-fit opacity-100 transform translate-y-0"
          : "hidden h-[0px] opacity-0 transform translate-y-10"
      }  duration-500 transition-transform ease-out overflow-hidden`}
      onMouseEnter={handleMouseEnterAbout}
      onMouseLeave={handleMouseLeaveAbout}
    >
      {aboutOptions.map((option) => (
        <div key={option.id} className="flex flex-col w-[283px]">
          <p
            className="font-[600] hover:text-[#335BF5] text-[14px] leading-[15px] cursor-pointer"
            onClick={() => {
              router.push(option.path);
            }}
          >
            {option.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutDropDown;