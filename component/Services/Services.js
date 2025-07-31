"use client";
import React, { useEffect, useState } from "react";
import ServiceCard from "../UI/ServiceCard";
import Image from "next/image";
import Rectangle159 from "@/component/assets/Rectangle159.png";
import trading from "@/component/assets/trading.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { IoCallOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import SidebarFab from "../UI/SidebarFab";
import Fab from "../UI/Fab";
import ServiceDropDown from "../UI/ServiceDropDown";
import { isIOS } from "react-device-detect";
import BrochureCard from "../UI/BrochureCard";
import Parser from "../UI/Parser";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

const Services = ({ serviceData, serviceList, usedIn }) => {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [isThirdOpen, setIsThirdOpen] = useState(false);
  const [isForthOpen, setIsForthOpen] = useState(false);
  const [isFifthOpen, setIsFifthOpen] = useState(false);
  const [isSixthOpen, setIsSixthOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const [show, setShow] = useState(false);

  function truncateDES(text, maxLength = 175) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }

  useEffect(() => {
    setShow(true);
  }, []);

  const truncateText = (text, maxWords) => {
    // Split the text into words
    const words = text.split(" ");
    // Return the first `maxWords` words joined back together
    return words.slice(0, maxWords).join(" ");
  };
  const truncatedDescription = truncateText(serviceData.hero?.description, 25);

  function trimToTwoWords(text) {
    const words = text.split(" ");
    if (words.length <= 2) {
      return text;
    }
    return words.slice(0, 2).join(" ") + "...";
  }

  return (
    <div
      className={`w-fill flex flex-col overflow-y-scroll ${
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
        className="w-full min-h-[195px] md:min-h-[335px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative pb-[16px]"
        style={{
          backgroundImage: `url('${serviceData.hero?.image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-[58px] md:w-[115px] h-[22px] md:h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms]">
            <p className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser ( serviceData.hero?.tag)}
            </p>
          </button>
          <p
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(serviceData.hero?.heading)}
          </p>
          <p
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px] text-justify  block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(serviceData?.hero?.description)}
          </p>
        </div>
      </div>

      <div className="px-[20px] pt-[20px] md:hidden">
        <div className="md:hidden w-full h-[40px] rounded-[10px] bg-[#FAFAFAED] border border-[#CACACA] px-[9px] flex items-center">
          <div className="w-full flex gap-[8px] items-center justify-center">
            <IoSearch className="text-[#88888C] text-[16px]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-[37px] font-[500] text-[14px] outline-none text-[#3C3C4399] bg-[#FAFAFAED] "
            />
          </div>
        </div>
      </div>

      <div className="w-full h-fit pl-[20px] pr-[20px] md:pl-[40px] md:pr-[40px]  lg:pl-[70px] lg:pr-[70px] xl:pl-[130px] xl:pr-[109px] pt-[24px] md:pt-[65px] flex justify-between flex-col md:flex-row">
        <div className="mt-[15px] md:mt-[0px] w-full md:w-[50.4%] flex flex-col gap-[12px] md:gap-[23px] order-2 md:order-1 items-center md:items-start">
          <p className="font-[600] text-[14.8px] md:text-[28px] lg:text-[36px] leading-[20.72px] md:leading-[40px]">
            {Parser(serviceData?.title)}
          </p>
          <p className="font-[400] md:font-[500] text-[14px] md:text-[20px] leading-[21px] md:leading-[32px] text-justify">
            {Parser(serviceData?.description)}
          </p>
          <button
            className="mt-[27px] md:mt-[0px] rounded-[37px] bg-[#335BF5] h-[36px] md:h-[52px] w-[128px] md:w-[198px] flex items-center justify-center"
            onClick={() => {
              router.push("/contact");
            }}
          >
            <p className="font-[600] md:font-[700] text-[16px] md:text-[18px] text-[#FFF]">
              Discover
            </p>
          </button>
        </div>
        <img
          alt="img"
          src={serviceData?.coverimage}
          className="h-[180px] md:h-[381px] w-full md:w-[45.33%] rounded-[13.41px] md:rounded-[20px] object-cover order-1 md:order-2"
        ></img>
      </div>
      <div className="pt-[39px] md:pt-[74px] pl-[20px] pr-[20px] md:pl-[60px] md:pr-[60px] lg:pl-[80px] lg:pr-[80px] xl:pl-[116px] xl:pr-[109px] pb-[20px] md:pb-[152px] flex flex-wrap gap-x-[16px] gap-y-[16px] md:gap-x-[30px] md:gap-y-[40px] justify-center">
        {serviceList.length > 0 &&
          serviceList?.map((d) => (
            <ServiceCard
              key={d._id}
              id={d._id}
              icon={d.icon}
              title={trimToTwoWords(d.title)}
              description={truncateDES(d.description)}
            />
          ))}
      </div>
      <div className="lg:px-[82px md:mb-[80px] md:px-[25px] md22:px-[40px]">
        <BrochureCard />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Services;
