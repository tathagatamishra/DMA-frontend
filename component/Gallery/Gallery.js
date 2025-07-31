"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import Crousel from "../Crousel/Crousel";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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



const Gallery = ({ galleryData,usedIn }) => {
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const [isHover, setIsHover] = useState(false);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const custombreak = {
    lg: 5,
    md: 4,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`w-full flex flex-col overflow-y-scroll ${
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
        className="w-full min-h-[195px] md:min-h-[335px] h-fit pb-[16px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative"
        style={{
          backgroundImage: `url('${galleryData?.hero?.image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px] h-fit">
          <button className="z-10 w-[58px] md:w-[115px] h-[22px] md:h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms]">
            <p className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser( galleryData?.hero?.tag)}
            </p>
          </button>
          <p
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(galleryData?.hero?.heading)}
          </p>
          <p
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px] text-justify block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(galleryData?.hero?.description)}
          </p>
        </div>
      </div>

      <div
        className="w-full h-fit bg-cover bg-center lg-px-[70px] xl:px-[140px] pt-[61px] pb-[61px] flex flex-col gap-[41px]items-center justify-center"
        style={{
          backgroundImage: `url('/BestService.jpeg')`,
        }}
      >
        <p className="font-[700] text-[32px] text-[#000] flex items-center justify-center">
          Videos
        </p>
        <Crousel videoArr={galleryData?.video?.video} />
      </div>

      <div className="flex items-center justify-center px-[20px] pt-[24px] md:pt-[73px]">
        <p className="font-[600] md:font-[700] text-[16px] md:text-[32px] flex items-center justify-center">
          {Parser(galleryData?.image?.heading)}
        </p>
      </div>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 200: 1, 300: 2, 750: 3, 1000: 4, 1250: 5 }}
        className="pb-[28px] md:pb-[69px]"
      >
        <Masonry
          columnsCount={custombreak}
          gutter="15px"
          className="px-[20px] md:px-[50px] mt-[18px] md:mt-[61px]"
        >
          {galleryData?.image?.image?.map((d, i) => (
            <div
              className="relative rounded-[16px] h-fit w-fit overflow-hidden"
              key={i}
            >
              <img
                src={d[0]}
                className="h-auto w-fit object-cover rounded-[16px]"
                alt="Gallery Image"
              />
              <div
                className="absolute w-full h-full top-0 left-0 "
                style={{
                  background:
                    "linear-gradient(194.66deg, rgba(0, 0, 0, 0) 10.39%, rgba(0, 0, 0, 0.6) 67.39%, rgba(0, 0, 0, 0.6) 88.57%)",
                }}
              ></div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div className="lg:px-[82px] md:mb-[80px] md:px-[25px] md22:px-[40px]">
        <BrochureCard />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Gallery;
