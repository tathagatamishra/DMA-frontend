"use client";
import React, { useEffect, useState, useRef } from "react";
import ServiceCard from "../UI/ServiceCard";
import Image from "next/image";
import Rectangle159 from "@/component/assets/Rectangle159.png";
import trading from "@/component/assets/trading.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoAdd, IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { IoCallOutline } from "react-icons/io5";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import SidebarFab from "../UI/SidebarFab";
import Fab from "../UI/Fab";
import ServiceDropDown from "../UI/ServiceDropDown";
import { isIOS } from "react-device-detect";
import { IoCheckmarkCircle } from "react-icons/io5";
import Parser from "../UI/Parser";
import { FaRegFilePdf } from "react-icons/fa";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

const FAQItem = ({ question, answer, index, isVisible, toggleVisibility }) => (
  <div>
    <div
      className="flex justify-between items-center w-full cursor-pointer"
      onClick={() => toggleVisibility(index)}
    >
      <div className="font-[600] text-[12px] xsm2:text-[16px] leading-[27px] sm2:leading-[46px] w-[90%]">
        {Parser(question)}
      </div>
      <IoAdd
        className={`text-[20px] text-[#000] transition-transform duration-300 ${
          isVisible ? "rotate-45" : "rotate-0"
        }`}
        onClick={() => toggleVisibility(index)}
      />
    </div>
    {isVisible && (
      <div className="font-[400] xsm2:font-[500] text-[12px] xsm2:text-[14px] mb-[10px] sm2:mb-[16.5px]">
        {Parser(answer)}
      </div>
    )}
    <div className="w-full border-[0.59px] sm2:border-[1px] border-[#D3D3D3]"></div>
  </div>
);

const PDFItem = ({ pdf }) => {
  // Function to extract filename from URL and remove prefix
  const getFileName = (url) => {
    try {
      // Get the last part of the path
      const fileName = url.split('/').pop();
      // Find the position after the random string prefix
      const underscorePos = fileName.indexOf('_');
      if (underscorePos !== -1) {
        // Return everything after the underscore, removing any query parameters
        return decodeURIComponent(fileName.substring(underscorePos + 1).split('?')[0]);
      }
      return "PDF Document";
    } catch {
      return "PDF Document";
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Open PDF in new window
    window.open(pdf, '_blank');
  };

  return (
   <div className="relative flex items-center gap-[10px] md:gap-[15px] cursor-pointer  p-2 mb-3"  onClick={handleClick}>
         {/* Background rectangle */}
         <div className="absolute inset-0 border border-gray-300 rounded-lg -z-10"></div>
         <span className="md:text-[25px]  ml-[10px] text-[20px] text-red-600 cursor-pointer" ><FaRegFilePdf /></span>
         <span 
          
           className="text-gray-800 font-medium truncate max-w-[85%] cursor-pointer hover:text-blue-600 text-[15px] xsm2:text-[16px] sm:text-[18px] md:text-[20px]"
         >
           {getFileName(pdf)}
         </span>
         
       </div>
  );
};



const SingleService = ({ serviceData, serviceList, usedIn }) => {
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
  const [show, setShow] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const router = useRouter();

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const toggleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  const groupImages = (images) => {
    const groupedImages = [];
    for (let i = 0; i < images.length; i += 2) {
      groupedImages.push(images.slice(i, i + 2));
    }
    return groupedImages;
  };

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (serviceList?.length) {
      const defaultOpenIndex = serviceList.findIndex(
        (service) => service._id === serviceData._id
      );
      if (defaultOpenIndex !== -1) {
        setOpenSections({ [defaultOpenIndex]: true });
      }
    }
  }, []);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
      <Header setIsOpen={setIsOpen} setIsHover={setIsHover} isHover={isHover} />

      {/* Hero Section */}
      <div
        className="w-full min-h-[195px] md:min-h-[335px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative pb-[16px]"
        style={{
          backgroundImage: `url('${serviceData.hero?.image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-fit h-fit rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms] px-[15px] py-[5px]">
            <div className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(serviceData?.hero?.tag)}
            </div>
          </button>
          <div
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0 ${
              show ? "opacity-100" : "opacity-0"
            } duration-500 animate-fade-in`}
          >
            {Parser(serviceData.hero?.heading)}
          </div>
          <div
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px] text-justify block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(serviceData.hero?.description)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-[20px] sm2:px-[30px] md:px-[35px] md22:px-[50px] lg:px-[80px] xl:px-[130px] flex gap-[20px] sm2:gap-[44px] flex-col sm2:flex-row">
        {/* Left Column */}
        <div className="w-full sm2:w-[64%] pt-[20px] sm2:pt-[60px] flex flex-col">
          <div className="sm2:hidden flex gap-[12px] px-[9px] items-center w-full h-[40px] border border-[#E3E3E3] bg-[#FAFAFAED] rounded-[8px]">
            <IoIosSearch className="text-[16px] text-[#88888C]" />
            <p className="text-[#88888C] text-[14px] font-[500]">Search</p>
          </div>

          <div className="font-[600] text-[15px] xsm2:text-[17px] sm:text-[22px] sm2:text-[26px] md:text-[32px] mt-[24px] sm2:mt-[0px]">
            {Parser(serviceData?.title)}
          </div>

          {/* Service Content */}
          <div className="flex flex-col gap-[12px] sm2:gap-[24px] mt-[10px] sm2:mt-[15px]">
            {serviceData?.layout?.map((d, index) => (
              <>
                {d.image &&
                  groupImages(d.image).map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      className={`flex w-full justify-between ${
                        d.image.length > 2 ? "mt-[20px]" : "mt-[0px]"
                      } ${group.length === 1 ? "w-full" : ""}`}
                    >
                      {group.map((imgSrc, imgIndex) => (
                        <img
                          alt="img"
                          key={imgIndex}
                          src={imgSrc}
                          className={`${
                            group.length === 1 ? "w-full" : "w-[47%]"
                          } h-[109px] sm2:h-[242px] rounded-[20px] object-cover`}
                        />
                      ))}
                    </div>
                  ))}
                {d.subtitle && (
                  <div className="font-[600] text-[15px] xsm2:text-[17px] sm:text-[26px] md:text-[28px]">
                    {Parser(d.subtitle)}
                  </div>
                )}
                {d.description && (
                  <div className="font-[400] sm:font-[500] text-[15px] xms2:text-[16px] md:text-[18px]">
                    {Parser(d.description)}
                  </div>
                )}
                {d.points && (
                  <div className="flex flex-wrap gap-x-[8px] sm2:gap-x-[18px] gap-y-[4px] sm2:gap-y-[18px]">
                    {d.points.map((data, index) => (
                      <div
                        className="flex gap-[8px] md:gap-[16px] items-start justify-center"
                        key={index}
                      >
                        <IoCheckmarkCircle className="text-[#0021f5] text-[20px] md:text-[26px] mt-[4px]" />
                        <div className="text-[#2F2F2F] text-[16px] sm2:text-[18px] md:text-[20px] font-[600] w-full">
                          {Parser(data)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Desktop FAQ Section */}
          <div className="hidden sm2:flex w-full flex-col pt-[50px] pb-[84px]">
            <p className="font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
              {serviceData.faqdata?.faq?.length > 0 && Parser(serviceData.faqdata?.heading)}
            </p>
            <div className="overflow-y-scroll">
              {serviceData.faqdata?.faq?.length > 0 &&
                serviceData.faqdata.faq?.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq[0]}
                    answer={faq[1]}
                    index={index}
                    isVisible={visibleIndex === index}
                    toggleVisibility={toggleVisibility}
                  />
                ))}
            </div>
          </div>

          <div className="hidden sm2:flex w-full flex-col pt-[50px] pb-[84px]">
          <div className="font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
              {serviceData.pdfdata?.pdf?.length > 0 &&
                Parser(serviceData.pdfdata?.heading)}
            </div>
            {serviceData.pdfdata?.pdf?.length > 0 && (
              <div>
                <div className="overflow-y-scroll">
                  {serviceData.pdfdata.pdf.map((pdf, index) => (
                    <PDFItem key={index} pdf={pdf} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full sm2:w-[31%] pt-[20px] sm2:pt-[65px] pb-[20px] flex flex-col gap-[40px]">
          {/* Services List */}
          <div className="rounded-[20px] pb-[37px] border border-[#C3C3C3] pl-[21px] pr-[20px] bg-white">
            <p className="font-[600] text-[20px] md:text-[22px] md22:text-[24px] pt-[28px]">
              The Best Of Our Services
            </p>
            <p className="block font-[400] text-[13px] md:text-[16px] pt-[12px]">
              Whether you have a team of 2 or 200, our shared team inboxes
            </p>
            <div className="flex flex-col pt-[5px]">
              {serviceList.map((service, index) => (
                <div key={service._id}>
                  <div
                    className="flex items-center justify-between mt-[24px] cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <div
                      className={`font-[600] text-[13px] md:text-[16px] md4:text-[20px] w-[85%] ${
                        openSections[index]
                          ? "text-[#335BF5]"
                          : "text-[#5E5E5E]"
                      }`}
                    >
                      {Parser(service.title)}
                    </div>
                    <div className="flex items-center justify-center w-[24px] h-[24px]">
                      {openSections[index] ? (
                        <IoIosArrowDown className="text-[24px] text-[#335BF5]" />
                      ) : (
                        <IoIosArrowForward className="text-[24px] text-[#5E5E5E]" />
                      )}
                    </div>
                  </div>
                  {openSections[index] && (
                    <div className="flex flex-col gap-[8px] pt-[8px] ml-[20px]">
                      {service.subService.map((sub) => (
                        <div
                          key={sub._id}
                          className="font-[500] text-[14px] sm2:text-[13px] md:text-[16px] leading-[22px] sm2:leading-[32px] text-[#272727] cursor-pointer"
                          onClick={() =>
                            router.push(`/service/subservice/${sub._id}`)
                          }
                        >
                          {Parser(sub.title)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Advertisement Section */}
          {usedIn !== "admin" && (
            <div className="mt-[10px]">
              <div
                className="w-full h-fit bg-cover bg-center rounded-[20px] flex pl-[24px] pt-[66px] pb-[30.54px]"
                style={{
                  backgroundImage: `url('/ads.png')`,
                }}
              >
                <div className="flex flex-col gap-[37px] md:gap-[57px]">
                  <div className="flex flex-col">
                    <p className="font-[700] text-[26px] md:text-[30px] md4:text-[32px] text-[#FFF]">
                      Let's Talk
                    </p>
                    <p className="font-[600] text-[14px] md:text-[16px] md4:text-[18px] text-[#FFF]">
                      If you have a project,
                      <br />
                      contact us!
                    </p>
                  </div>
                  <div className="h-[45px] md:h-[50px] md4:h-[52px] w-[140px] md:w-[160px] md4:w-[198px] rounded-[37px] flex items-center justify-center bg-[#FFF]">
                    <p className="font-[600] md:font-[700] text-[16px] md4:text-[18px]">
                      Learn Now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile FAQ Section */}
        <div className="w-full sm2:hidden flex flex-col mt-[10px] pb-[18px]">
          <div className="font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
            {Parser(serviceData.faqdata?.heading)}
          </div>
          <div className="overflow-y-scroll">
            {serviceData.faqdata?.faq?.length > 0 &&
              serviceData.faqdata.faq?.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq[0]}
                  answer={faq[1]}
                  index={index}
                  isVisible={visibleIndex === index}
                  toggleVisibility={toggleVisibility}
                />
              ))}
          </div>
        </div>

        {/* Mobile pdf Section */}
        <div className="w-full sm2:hidden flex flex-col mt-[10px] pb-[18px]">
        <div className="font-bold text-[20px] mb-4 text-gray-900">
          {Parser(serviceData.pdfdata?.heading)}
        </div>
        <div className="bg-gray-50 rounded-xl">
          <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            
            {serviceData.pdfdata?.pdf.map((pdf, index) => (
              <PDFItem key={index} pdf={pdf} />
            ))}
          </div>
        </div>
      </div>
       
      </div>
      {usedIn !== "admin" && <Footer></Footer>}
    </div>
  );
};

export default SingleService;
