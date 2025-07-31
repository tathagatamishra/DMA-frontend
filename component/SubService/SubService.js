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
import {
  BsDot,
  BsInstagram,
  BsLinkedin,
  BsMailbox,
  BsPhone,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import SidebarFab from "../UI/SidebarFab";
import Fab from "../UI/Fab";
import ServiceDropDown from "../UI/ServiceDropDown";
import { isIOS } from "react-device-detect";
import { IoCheckmarkCircle } from "react-icons/io5";
import BrochureCard from "../UI/BrochureCard";
import Parser from "../UI/Parser";
import { FaCheck, FaCircle, FaFacebook, FaRegFilePdf, FaSlash, FaWhatsapp } from "react-icons/fa";
import CenterModal from "../Modal/CenterModal";
import axios from "axios";
import { serverUrl } from "@/config";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

const FAQItem = ({ question, answer, index, isVisible, toggleVisibility }) => (
  <div>
    <div className="flex justify-between items-center w-full">
      <p className="font-[600] text-[12px] xsm2:text-[16px] leading-[27px] sm2:leading-[46px] w-[90%]">
        {Parser(question)}
      </p>
      {isVisible ? (
        <RxCross2
          className="text-[18px] text-[#000]"
          onClick={() => toggleVisibility(index)}
        />
      ) : (
        <IoAdd
          className="text-[20px] text-[#000]"
          onClick={() => toggleVisibility(index)}
        />
      )}
    </div>
    {isVisible && (
      <p className="font-[400] xsm2:font-[500] text-[12px] xsm2:text-[14px] mb-[10px] sm2:mb-[16.5px]">
        {Parser(answer)}
      </p>
    )}
    <div className="w-full border-[0.59px] sm2:border-[1px] border-[#D3D3D3]"></div>
  </div>
);

const PDFItem = ({ pdf, setShowLeadGen, setPdfName, setOpenPdf }) => {
  // Function to extract filename from URL and remove prefix
  const getFileName = (url) => {
    try {
      // Get the last part of the path
      const fileName = url.split("/").pop();
      // Find the position after the random string prefix
      const underscorePos = fileName.indexOf("_");
      if (underscorePos !== -1) {
        // Return everything after the underscore, removing any query parameters
        return decodeURIComponent(
          fileName.substring(underscorePos + 1).split("?")[0]
        );
      }
      return "PDF Document";
    } catch {
      return "PDF Document";
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = getFileName(pdf);
    console.log(fileName);
    setPdfName(fileName);
    setShowLeadGen(true);
    setOpenPdf(pdf);

    // Open PDF in new window
    // window.open(pdf, "_blank");
  };

  return (
    <div
      className="relative flex items-center gap-[10px] md:gap-[15px] cursor-pointer  p-2 mb-3"
      onClick={handleClick}
    >
      {/* Background rectangle */}
      <div className="absolute inset-0 border border-gray-300 rounded-lg -z-10"></div>
      <span className="md:text-[25px] ml-[10px] text-[20px] text-red-600 cursor-pointer">
        <FaRegFilePdf />
      </span>
      <span className="text-gray-800 font-medium truncate max-w-[85%] cursor-pointer hover:text-blue-600 text-[15px] xsm2:text-[16px] sm:text-[18px] md:text-[20px]">
        {getFileName(pdf)}
      </span>
    </div>
  );
};

// const SocialIcon = ({ Icon , url }) => (
//   <Link target="blank" href={`${url}`} className={`${url.length > 0 ? "block" : "hidden"} h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center`}>
//     <Icon  className="text-lg sm:text-xl text-[#335BF5]" />
//   </Link>
// );

const SubService = ({ serviceData, serviceList, usedIn, serviceId }) => {
  // console.log(serviceList);
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
  const containerRef = useRef(null);
  const faqRef = useRef(null);
  const brochureRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [containerTop, setContainerTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState("120%");
  const [stopSticky, setStopSticky] = useState(false);
  const [fixedTop, setFixedTop] = useState(0);
  const [showLeadGen, setShowLeadGen] = useState(false);
  const [showLeadGenTeam, setShowLeadGenTeam] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [openPdf, setOpenPdf] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  //  const handleLeadGen=()=>{
  //    setShowLeadGen(true)
  //  }

  const [formData, setFormData] = useState({
    type: "Lead",
    name: "",
    email: "",
    phone: "",
    pdfName: pdfName,
  });
  const [ContactData, setContactData] = useState({
    type: "help",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formDataTeam, setFormDataTeam] = useState({
    type: "Team",
    name: "",
    email: "",
    phone: "",
    pdfName: "",
  });

  useEffect(() => {}, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        pdfName: pdfName,
      };
      setFormData(updatedFormData);

      await axios.post(`${serverUrl}/createLead`, updatedFormData);

      setShowLeadGen(false);

      setTimeout(() => {
        window.open(openPdf, "_blank");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeamSubmit = async (e) => {
    await setFormDataTeam((prev) => ({
      ...prev,
      pdfName: pdfName,
    }));
    e.preventDefault();
    try {
      // Send POST request
      await axios.post(`${serverUrl}/createLead`, formDataTeam);
      setShowLeadGen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/createRequest`, ContactData);
      setContactData(() => ({
        type: "help",
        name: "",
        email: "",
        phone: "",
        message: "",
      }));
      setShowContactForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setShowContactForm(() => false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeContactForm = (e) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeTeam = (e) => {
    const { name, value } = e.target;
    setFormDataTeam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const [hasRightContent, setHasRightContent] = useState(true);

  const [visibleIndex, setVisibleIndex] = useState(null);

  // const faqs = faqdata.faq.map((question, index) => ({
  //   question: question[0],
  //   answer: question[1] || "No answer available",
  // }));
  // console.log(faqs);

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

  const truncateText = (text, maxWords) => {
    // Split the text into words
    const words = text.split(" ");
    // Return the first `maxWords` words joined back together
    return words.slice(0, maxWords).join(" ");
  };
  // const truncatedDescription = truncateText(serviceData.hero.description, 25);

  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    if (serviceList?.length) {
      const defaultOpenIndex = serviceList.findIndex(
        (service) => service._id === serviceData.mainServiceId
      );
      if (defaultOpenIndex !== -1) {
        setOpenSections({ [defaultOpenIndex]: true });
      }
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerTop(rect.top + window.scrollY);
      setFixedTop(rect.top);
      setContainerWidth(`${containerRef.current.offsetWidth}px`);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !faqRef.current || !brochureRef.current)
        return;

      const isLargeScreen = window.innerWidth >= 768;
      if (!isLargeScreen) {
        setIsSticky(false);
        setStopSticky(false);
        return;
      }

      const scrollPosition = window.scrollY;
      const faqBottom =
        faqRef.current.getBoundingClientRect().bottom + scrollPosition;
      const brochureTop =
        brochureRef.current.getBoundingClientRect().top + scrollPosition;

      // Sticky and stop logic
      if (
        scrollPosition >= containerTop - 20 &&
        scrollPosition + containerRef.current.offsetHeight < faqBottom - 30
      ) {
        setIsSticky(true);
        setStopSticky(false);
      } else if (
        scrollPosition + containerRef.current.offsetHeight >= faqBottom - 30 &&
        scrollPosition < brochureTop - 30
      ) {
        setIsSticky(false);
        setStopSticky(true);
      } else if (scrollPosition >= brochureTop - 30) {
        setIsSticky(false);
        setStopSticky(false);
      } else {
        setIsSticky(false);
        setStopSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerTop]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const PointIcon = ({ type, index }) => {
    switch (type) {
      case "bullet":
        return <FaCircle className="text-[#0021f5] text-[16px] md:text-[20px] md:mt-[5.5px] " />;
      case "checkmark":
        return (
          <FaCheck className="text-[#0021f5] text-[20px] md:text-[26px]" />
        );
       case "default":
        return (
          <IoCheckmarkCircle className="text-[#0021f5] text-[20px] md:text-[26px]" />
        );
       default:
        return (
          <IoCheckmarkCircle className="text-[#0021f5] text-[20px] md:text-[26px]" />
        );
    }
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
      <div
        className="w-full min-h-[195px] md:min-h-[335px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative pb-[16px]"
        style={{
          backgroundImage: `url('${serviceData.hero?.image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-fit h-fit rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms] px-[15px] py-[5px]">
            <span className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(serviceData.hero?.tag)}
            </span>
          </button>
          <span
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(serviceData.hero?.heading)}
          </span>
          <span
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px] text-justify block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(serviceData.hero?.description)}
          </span>
        </div>
      </div>
      <div className="w-full px-[20px] sm2:px-[30px] md:px-[35px] md22:px-[50px] lg:px-[80px] xl:px-[130px] flex gap-[30px] sm2:gap-[64px] flex-col sm2:flex-row">
        <div className="w-full sm2:w-[64%] pt-[20px] sm2:pt-[60px] flex flex-col">
          <div className="sm2:hidden flex gap-[12px] px-[9px] items-center  w-full h-[40px] border border-[#E3E3E3] bg-[#FAFAFAED] rounded-[8px]">
            <IoIosSearch className="text-[16px] text-[#88888C]" />
            <p className="text-[#88888C] text-[14px] font-[500]">Search</p>
          </div>
          <span className="font-[600] text-[15px] xsm2:text-[17px] sm:text-[22px] sm2:text-[26px]  md:text-[32px] mt-[24px] sm2:mt-[0px]">
            {Parser(serviceData.title)}
          </span>
          <div className="flex flex-col gap-[12px] sm2:gap-[24px] mt-[10px] sm2:mt-[15px]">
            {serviceData.layout?.map((d, index) => (
              <>
                {/* {d.image &&
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
                  ))} */}
                {d.image && (
                  <img
                    className="w-full h-[109px] sm2:h-[242px] rounded-[20px] object-cover"
                    src={d.image}
                    alt="service"
                  />
                )}
                {d.subtitle && (
                  <span className="font-[600] text-[15px] xsm2:text-[17px] sm:text-[26px] md:text-[28px]">
                    {Parser(d.subtitle)}
                  </span>
                )}
                {d.description && (
                  <span className="font-[400] sm:font-[500] text-[15px] xms2:text-[16px] md:text-[18px] text-justify">
                    {Parser(d.description)}
                  </span>
                )}
                {d.points && Array.isArray(d.points) && !d.points.type && (
                  <div className="flex flex-wrap  gap-x-[8px] sm2:gap-x-[18px] gap-y-[4px] sm2:gap-y-[18px]">
                    {d?.points?.map((data, index) => (
                      <div
                        className="flex gap-[8px] md:gap-[16px] items-center justify-center"
                        key={index}
                      >
                        <IoCheckmarkCircle className="text-[#0021f5] text-[20px] md:text-[26px]" />
                        <span className="text-[#2F2F2F] text-[16px] sm2:text-[18px] md:text-[20px] text-justify font-[600] w-full">
                          {Parser(data)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {d.points && d.points.type && Array.isArray(d.points.value) && (
                  <div className="flex flex-wrap gap-x-[8px] sm2:gap-x-[18px] gap-y-[4px] sm2:gap-y-[18px]">
                    {d?.points?.value.map((data, index) => (
                      <div
                        className="flex gap-[8px] md:gap-[16px] items-center justify-center"
                        key={index}
                      >
                        <PointIcon type={d.points.type} index={index} />
                        <span className="text-[#2F2F2F] text-[16px] sm2:text-[18px] md:text-[20px] text-justify font-[600] w-full">
                          {Parser(data)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
          {/* Card*/}
          <div
            className={`${
              serviceData?.team?.name ||
              serviceData?.team?.quote ||
              serviceData?.team?.title ||
              serviceData?.team?.whatsapp ||
              serviceData?.team?.facebook ||
              serviceData?.team?.instagram ||
              serviceData?.team?.linkedin ||
              serviceData?.team?.gmail ||
              serviceData?.team?.youtube
                ? "block"
                : "hidden"
            }`}
          >
            <div className="max-w-4xl mx-auto p-6">
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Profile Image */}
                  <div className="w-48 h-48 flex-shrink-0">
                    <img
                      src={serviceData?.team?.image}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    {/* Name and Title */}
                    <div className="mb-4">
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {serviceData?.team?.name}
                      </h2>
                      <p className="text-xl text-gray-500 italic">
                        {serviceData?.team?.title}
                      </p>
                    </div>
                    {/* Social Icons */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <Link
                        target="_blank"
                        href={`https://wa.me/${serviceData.team?.whatsapp}`}
                        className={` ${
                          serviceData.team?.whatsapp?.length > 0
                            ? "block"
                            : "hidden"
                        } p-2 bg-green-500 text-white rounded-full hover:bg-green-600`}
                      >
                        <FaWhatsapp size={20} />
                      </Link>
                      <Link
                        target="_blank"
                        href={`${serviceData.team?.facebook}`}
                        className={` ${
                          serviceData.team?.facebook?.length > 0
                            ? "block"
                            : "hidden"
                        } p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700`}
                      >
                        <FaFacebook size={20} />
                      </Link>
                      <Link
                        target="_blank"
                        href={`${serviceData.team?.instagram}`}
                        className={` ${
                          serviceData.team?.instagram?.length > 0
                            ? "block"
                            : "hidden"
                        } p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700`}
                      >
                        <BsInstagram size={20} />
                      </Link>
                      <Link
                        target="_blank"
                        href={`${serviceData.team?.linkedin}`}
                        className={` ${
                          serviceData.team?.linkedin?.length > 0
                            ? "block"
                            : "hidden"
                        } p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600`}
                      >
                        <BsLinkedin size={20} />
                      </Link>
                      <Link
                        target="_blank"
                        href={`mailto:${serviceData.team?.gmail}`}
                        className={` ${
                          serviceData.team?.gmail?.length > 0
                            ? "block"
                            : "hidden"
                        } p-2 bg-red-500 text-white rounded-full hover:bg-red-600`}
                      >
                        <MdEmail size={20} />
                      </Link>
                      <Link
                        target="_blank"
                        href={`${serviceData.team?.youtube}`}
                        className={` ${
                          serviceData.team?.youtube?.length > 0
                            ? "block"
                            : "hidden"
                        } p-2 bg-red-600 text-white rounded-full hover:bg-red-700`}
                      >
                        <BsYoutube size={20} />
                      </Link>
                    </div>
                    {/* Quote */}
                    <div className="mb-6">
                      <p className="text-xl text-gray-600 italic">
                        {serviceData?.team?.quote}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {/* <button className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        View Profile
                      </button> */}
                      <button
                        onClick={() => setShowLeadGenTeam(true)}
                        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Discuss With Expert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CenterModal
            onModal={showLeadGenTeam}
            onClick={() => setShowLeadGenTeam(false)}
            text="Discuss With Expert"
            borderTopWidth="0px"
            marginTop="0.8rem"
            marginBottom="-0.3rem"
          >
            <div className="space-y-6 my-4 ">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formDataTeam.name}
                  onChange={handleChangeTeam}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formDataTeam.email}
                  onChange={handleChangeTeam}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formDataTeam.phone}
                  onChange={handleChangeTeam}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(123) 456-7890"
                />
              </div>

              <button
                type="button"
                onClick={handleTeamSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </CenterModal>
          <div
            ref={faqRef}
            className="hidden sm2:flex w-full flex-col pt-[50px] pb-[84px]"
          >
            <p className=" font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
              {serviceData.faqdata?.faq?.length > 0 &&
                serviceData.faqdata?.heading}
            </p>
            <div className="overflow-y-scroll text-justify">
              {serviceData.faqdata?.faq?.length > 0 &&
                serviceData.faqdata?.faq?.map((faq, index) => (
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
          {/* PDF Section  */}
          <div className="hidden sm2:flex w-full flex-col pt-[50px] pb-[84px]">
            <div className="font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
              {serviceData.pdfdata?.pdf?.length > 0 &&
                Parser(serviceData.pdfdata?.heading)}
            </div>
            {serviceData.pdfdata?.pdf?.length > 0 && (
              <div>
                <div className="overflow-y-scroll">
                  {serviceData.pdfdata.pdf.map((pdf, index) => (
                    <PDFItem
                      key={index}
                      pdf={pdf}
                      index={index}
                      setShowLeadGen={setShowLeadGen}
                      setPdfName={setPdfName}
                      setOpenPdf={setOpenPdf}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <CenterModal
            onModal={showLeadGen}
            onClick={() => setShowLeadGen(false)}
            borderTopWidth="0px"
            marginTop="0.8rem"
            marginBottom="-0.3rem"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(123) 456-7890"
                />
              </div>

              <button
                type="button"
                onClick={handleLeadSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </CenterModal>
        </div>
        <div className="relative w-full sm2:w-[41%] pt-[65px] flex flex-col gap-[40px] pb-[20px]">
          <div
            ref={containerRef}
            style={{
              position: isSticky
                ? "fixed"
                : stopSticky
                ? "absolute"
                : "relative",
              top: isSticky ? "20px" : "auto",
              bottom: stopSticky
                ? `${brochureRef.current.offsetHeight}px`
                : "auto",
              left: stopSticky ? 0 : "auto",
              width: isSticky || stopSticky ? containerWidth : "auto",
              transition: "none",
            }}
          >
            <div className="rounded-[20px] pb-[37px] border border-[#C3C3C3] pl-[21px] pr-[20px] bg-white">
              <span className="font-[600] text-[20px] md:text-[22px] md22:text-[24px] pt-[28px]">
                {Parser(
                  serviceData.rightsection?.title || "The Best Of Our Services"
                )}
              </span>
              <span className="block font-[400] text-[13px] md:text-[16px] pt-[12px]">
                {Parser(
                  serviceData.rightsection?.description ||
                    "The Best Of Our Services Whether you have a team of 2 or 200, our shared team inboxes"
                )}
              </span>
              <div className="flex flex-col pt-[5px]">
                {serviceList.map((service, index) => (
                  <div key={service._id}>
                    <div
                      className="flex items-center justify-between mt-[24px] cursor-pointer"
                      onClick={() => toggleSection(index)}
                    >
                      <span
                        className={`font-[600] text-[13px] md:text-[16px] md4:text-[20px] w-[85%] ${
                          openSections[index]
                            ? "text-[#335BF5]"
                            : "text-[#5E5E5E]"
                        }`}
                      >
                        {Parser(service.title)}
                      </span>
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
                          <span
                            key={sub._id}
                            className={`font-[500] text-[13px] md:text-[16px] leading-[32px] cursor-pointer ${
                              sub._id === serviceId
                                ? "text-[#335BF5]"
                                : "text-[#272727]"
                            }`}
                            onClick={() =>
                              router.push(`/service/subservice/${sub._id}`)
                            }
                          >
                            {Parser(sub.title)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Advertisement Section */}
            {usedIn !== "admin" && (
              <>
                <div className="mt-[40px]">
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
                        <button
                          onClick={() => setShowContactForm(true)}
                          className="font-[600] md:font-[700] text-[16px] md4:text-[18px]"
                        >
                          Learn Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <CenterModal
                  onModal={showContactForm}
                  onClick={() => setShowContactForm(false)}
                  text="Contact With Us"
                  borderTopWidth="0px"
                  marginTop="0.8rem"
                  marginBottom="-0.3rem"
                >
                  <div className="space-y-6 my-4 ">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={ContactData.name}
                        onChange={handleChangeContactForm}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={ContactData.email}
                        onChange={handleChangeContactForm}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={ContactData.phone}
                        onChange={handleChangeContactForm}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        value={ContactData.message}
                        onChange={handleChangeContactForm}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type your message"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmitContact}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                </CenterModal>
              </>
            )}
          </div>

          {/* Invisible placeholder to prevent content jump */}
          {isSticky && (
            <div style={{ height: containerRef.current?.offsetHeight || 0 }} />
          )}
        </div>

        <div className="w-full sm2:hidden flex flex-col mt-[10px] pb-[18px]">
          <span className="font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
            {serviceData.faqdata?.faq?.length > 0 &&
              Parser(serviceData.faqdata?.heading)}
          </span>
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
                <PDFItem
                  key={index}
                  pdf={pdf}
                  setShowLeadGen={setShowLeadGen}
                  setPdfName={setPdfName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        ref={brochureRef}
        className="lg:px-[82px] md:mb-[80px] md:px-[25px] md22:px-[40px]"
      >
        <BrochureCard />
      </div>
      {usedIn !== "admin" && <Footer></Footer>}
    </div>
  );
};

export default SubService;
