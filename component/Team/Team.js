"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Image from "next/image";
import mem1 from "@/component/assets/mem1.png";
import mem2 from "@/component/assets/mem2.png";
import mem3 from "@/component/assets/mem3.png";
import mem4 from "@/component/assets/mem4.png";
import fullblog1 from "@/component/assets/fullblog1.jpeg";
import TeamCard from "../UI/TeamCard";
import { IoCallOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import BrochureCard from "../UI/BrochureCard";
import Fab from "../UI/Fab";
import SidebarFab from "../UI/SidebarFab";
import ServiceDropDown from "../UI/ServiceDropDown";
import { isIOS } from "react-device-detect";
import Parser from "../UI/Parser";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

const Team = ({ teamData,usedIn }) => {
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
 
  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  const truncateText = (text, maxWords) => {
    // Split the text into words
    const words = text.split(" ");
    // Return the first `maxWords` words joined back together
    return words.slice(0, maxWords).join(" ");
  };
  const truncatedDescription = truncateText(teamData.hero?.description, 25);
  return (
    <div
     className={`w-full flex flex-col items-center overflow-y-scroll ${
            isIOS ? "pb-[60px]" : "pb-[0px]"
          }`}
    >
      {showRequestCallback && (
        <SidebarFab
          showRequestCallback={showRequestCallback}
          setShowRequestCallback={setShowRequestCallback}
        />
      )}

      {showRequestBrochure && (
        <SideBarBrochureFab
          setShowRequestBrochure={setShowRequestBrochure}
          showRequestBrochure={showRequestBrochure}
        />
      )}

      {!showRequestCallback && !showRequestBrochure && usedIn !== "admin" && (
        <Fab
          show={show}
          showRequestCallback={showRequestCallback}
          setShowRequestCallback={setShowRequestCallback}
          setShowRequestBrochure={setShowRequestBrochure}
          showRequestBrochure={showRequestBrochure}
        />
      )}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Header setIsOpen={setIsOpen} setIsHover={setIsHover} isHover={isHover}/>

      <div
  className="w-full min-h-[195px] md:min-h-[335px] lg:min-h-[500px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative pb-[16px]"
  style={{
    backgroundImage: `url('${teamData.hero?.image}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>


        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-[58px] md:w-[115px] h-[22px] md:h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms]">
            <span className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser (teamData.hero?.tag)}  
                        </span>
          </button>
          <span
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser (teamData.hero?.heading)}  

          </span>
          <span
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px] text-justify block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser (teamData.hero?.description)}  

          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[14px] md:gap-[44px] pt-[28px] pl-[20px] pr-[20px] md:pl-[40px] md:pr-[40px] lg:pl-[80px] lg:pr-[80px] xl:pl-[130px] xl:pr-[138px] md:pt-[48px] pb-[20px] md:pb-[88px]">
        <span className="font-[600] text-[16px] md:text-[36px]">
          {Parser (teamData.team?.heading)}
        </span>
        <div className="flex flex-wrap md:gap-x-[32px] md:gap-y-[50px] gap-x-[8px] gap-y-[16px] justify-center items-center">
          {teamData?.team?.member?.map((d, i) => (
            <TeamCard
              key={i}
              img={d.image}
              name={Parser (d.name)}
              designation={Parser (d.designation)}
            ></TeamCard>
          ))}
        </div>
      </div>

      <div className="lg:px-[82px] md:mb-[80px] md:px-[25px] md22:px-[40px]">
        <BrochureCard />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Team;
