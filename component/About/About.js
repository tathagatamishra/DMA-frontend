"use client";
import React, { useEffect, useState } from "react";
import professional from "@/component/assets/professional.png";
import Image from "next/image";
import mem1 from "@/component/assets/mem1.png";
import mem2 from "@/component/assets/mem2.png";
import mem3 from "@/component/assets/mem3.png";
import mem4 from "@/component/assets/mem4.png";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import fullblog1 from "@/component/assets/fullblog1.jpeg";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BrochureCard from "../UI/BrochureCard";
import { useRouter } from "next/navigation";
import { IoCallOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import SidebarFab from "../UI/SidebarFab";
import Fab from "../UI/Fab";
import { isIOS } from "react-device-detect";
import ServiceDropDown from "../UI/ServiceDropDown";
import parse from "html-react-parser";
import Parser from "../UI/Parser";
import WhyChooseUsCard from "../UI/WhyChooseUsCard";
import axios from "axios";
import { serverUrl } from "@/config";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

export default function About({ aboutData,usedIn}) {
  console.log(aboutData);
  const [toggle, setToggle] = useState("about");
  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [isHoverAbout, setIsHoverAbout] = useState(false);
  const [show, setShow] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [facebook, setFacebook] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [homeData, setHomeData] = useState({
    hero: { heading: "", description: "", image: "", default: false },
    client: { heading: "", image: [""], default: false },
    service: {
      heading: "",
      description: "",
      all: false,
      selected: [0],
      default: false,
    },
    blog: {
      heading: "",
      description: "",
      all: false,
      selected: [0],
      default: false,
    },
    reason: {
      heading: "",
      description: "",
      cards: [{ logo: "", tag: "", value: "" }],
      default: false,
    },
    about: {
      heading: "",
      subheading: "",
      description: ["", ""],
      link: "",
      image: "",
      default: false,
    },
    gallery: {
      heading: "",
      description: "",
      video: "",
      extra: {
        heading: "",
        description: "",
        cards: [{ logo: "", heading: "", description: "" }],
      },
      default: false,
    },
    reviews: {
      heading: "",
      description: "",
      all: false,
      selected: [0],
      default: false,
    },
  });

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    {
      aboutData.message.links?.map((d) => {
        if (d.includes("linkedin")) {
          setLinkedIn(d);
        }
        if (d.includes("facebook")) {
          setFacebook(d);
        }
        if (d.includes("instagram")) {
          setInstagram(d);
        }
        if (d.includes("twitter")) {
          setTwitter(d);
        }
        if (d.includes("@")) {
          setEmail(d);
        }
      });
    }
  }, []);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const getHomeData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getHome`);
      setHomeData(data.homeData);
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  useEffect(() => {
    getHomeData();
  }, []);

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
      <Header
        setIsOpen={setIsOpen}
        setIsHover={setIsHoverAbout}
        isHover={isHoverAbout}
      />
      <div
        className="w-full min-h-[195px] md:min-h-[335px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative pb-[16px]"
        style={{
          backgroundImage: `url(${aboutData?.hero?.image})`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-[58px] md:w-[115px] h-[22px] md:h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms]">
            <span className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(aboutData?.hero?.tag)}
            </span>
          </button>
          <span
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(aboutData?.hero?.heading)}
          </span>
          <span
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px]  block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(aboutData?.hero?.description)}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[20px] md:gap-[48px] h-fit pl-[20px] pr-[20px] md:pl-[40px] md:pr-[40px] lg:pl-[80px] lg:pr-[80px] xl:pl-[130px] xl:pr-[110px] pt-[24px] md:pt-[95px]">
        <img
          alt="img"
          src={aboutData?.overview?.image}
          className="h-fit w-full md:h-[407px] md:w-[52.62%] rounded-[20px] object-cover"
        ></img>
        <div className="flex flex-col w-full md:w-[43.36%]">
          <span className="font-[600] text-[16px] md:text-[32px]">
            {/* {aboutData?.overview?.heading} */}
            {Parser(aboutData?.overview?.heading)}
          </span>
          <div className="flex flex-col gap-[2px] mt-[20px] md:mt-[16px]">
            <div className="flex justify-between md:justify-start md:gap-[35px] cursor-pointer">
              <span
                className={`text-[14px] md:text-[16px] font-[500] ${
                  toggle == "about"
                    ? "underline underline-offset-[7.6px] md:underline-offset-[8.2px] z-10 decoration-[#335BF5]"
                    : ""
                }`}
                onClick={() => {
                  setToggle("about");
                }}
              >
                {Parser(aboutData?.overview?.section[0]?.title)}
              </span>
              <span
                className={`text-[14px] md:text-[16px] font-[500] ${
                  toggle == "mission"
                    ? "underline underline-offset-[7.6px] md:underline-offset-[8.2px] z-10 decoration-[#335BF5]"
                    : ""
                }`}
                onClick={() => {
                  setToggle("mission");
                }}
              >
                {Parser(aboutData?.overview?.section[1]?.title)}
              </span>
              <span
                className={`text-[14px] md:text-[16px] font-[500] ${
                  toggle == "vision"
                    ? "underline underline-offset-[7.6px] md:underline-offset-[8.2px] z-10 decoration-[#335BF5]"
                    : ""
                }`}
                onClick={() => {
                  setToggle("vision");
                }}
              >
                {Parser(aboutData?.overview?.section[2]?.title)}
              </span>
            </div>
            <div className="h-fit w-full md:w-[256px] border-[0.8px] border-[#C7C7C7]"></div>
          </div>
          <span className="w-full md:w-full font-[400] md:font-[500] text-[14px] md:text-[16px] mt-[16px] md:mt-[24px] text-justify ">
            {toggle === "about"
              ? Parser(aboutData?.overview?.section[0]?.description || "")
              : toggle === "mission"
              ? Parser(aboutData?.overview?.section[1]?.description || "")
              : Parser(aboutData?.overview?.section[2]?.description || "")}
          </span>

          <div className="flex justify-between md:justify-start md:gap-[26px] mt-[24px] md:mt-[32px] w-full">
            <button
              className="w-[41.8%] md:w-[198px] h-[36px] md:h-[52px] rounded-[37px] bg-[#335BF5] flex items-center justify-center hover:scale-[103%] transition-[300ms]"
              onClick={() => {
                setShowRequestCallback(true);
              }}
            >
              <p className="font-[600] md:font-[700] text-[14px] md:text-[18px] text-[#FFF]">
                Get Started
              </p>
            </button>
            <button
              className="w-[52.1%] md:w-[205px] h-[36px] md:h-[52px] rounded-[37px] border border-[#335BF5] flex items-center justify-center hover:scale-[103%] transition-[300ms] "
              onClick={() => {
                const telUrl = `tel:${aboutData.overview?.phone}`;
                window.location.href = telUrl;
              }}
            >
              <div className="flex gap-[8px] min-[280px]:flex">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="min-[280px]:w-3 min-[280px]:h-3"
                >
                  <path
                    d="M7.16536 2.5C7.58203 2.5 9.2487 6.25 9.2487 6.66667C9.2487 7.5 7.9987 8.33333 7.58203 9.16667C7.16536 10 7.9987 10.8333 8.83203 11.6667C9.16061 11.9953 10.4987 13.3333 11.332 12.9167C12.1654 12.5 12.9987 11.25 13.832 11.25C14.2487 11.25 17.9987 12.9167 17.9987 13.3333C17.9987 15 16.7487 16.25 15.4987 16.6667C14.2487 17.0833 13.4154 17.0833 11.7487 16.6667C10.082 16.25 8.83203 15.8333 6.7487 13.75C4.66536 11.6667 4.2487 10.4167 3.83203 8.75C3.41536 7.08333 3.41536 6.25 3.83203 5C4.2487 3.75 5.4987 2.5 7.16536 2.5Z"
                    stroke="#335BF5"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="font-[400] md:font-[700] text-[12px] min-[280px]:text-[8px] min-[280px]:font-[700] truncate">
                  {aboutData.overview?.phone}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex items-center justify-center md:justify-center pl-[20px] pr-[20px] md:pl-[40px] md:pr-[40px] lg:pl-[80px] lg:pr-[80px] xl:pl-[130px] xl:pr-[138px] pt-[24px] md:pt-[102px]">
        <div className="hidden md:flex flex-wrap gap-[63px] w-full justify-center">
          {aboutData.value?.map((d, i) => (
            <div
              key={i}
              className="flex flex-col gap-[40px] items-center justify-center"
            >
              <p className="font-[600] text-[64px]">{d.title}</p>
              <p className="font-[400] text-[22px]">{Parser(d.value)}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[8px] md:hidden justify-center">
          {aboutData.value?.map((d, i) => (
            <div
              key={i}
              className="flex flex-col w-[156px] h-[111px] rounded-[7.81px] border border-[#E3E3E3] px-[10px] pt-[9px] items-center justify-center"
            >
              <p className="font-[600] text-[20px] leading-[40px]">{d.title}</p>
              <p className="font-[400] text-[14px] leading-[28px] text-center">
                {Parser(d.value)}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="flex w-full justify-between pl-[20px] pr-[20px] md:pl-[40px] md:pr-[40px] lg:pl-[80px] lg:pr-[80px] xl:pl-[130px] xl:pr-[138px] pt-[26px] md:pt-[47px]">
        <div className="w-full md:w-[32%] h-fit rounded-[20px] border border-[#C3C3C3] flex flex-col items-center justify-center pt-[14px] md:pt-[20px] pb-[17px] md:pb-[36px] px-[15px] md:px-[20px]">
          <span className="block md:hidden font-[600] text-[20px] leading-[30px] text-center">
            {Parser(aboutData.message?.heading)}
          </span>
          <img
            alt="img"
            src={aboutData.message?.image}
            className="w-full max-h-[189px] md:max-h-[400px] rounded-[8px] md:rounded-[16px] object-contain mt-[8px] md:mt-[0px]"
          />
          <span className="font-[600] text-[18px] md:text-[24px] leading-[27px] md:leading-[36px] mt-[16px] md:mt-[24px]">
            {Parser(aboutData.message?.name)}
          </span>
          <span className="font-[500] text-[15px] md:text-[24px] leading-[22.5px] md:leading-[36px]">
            {Parser(aboutData.message?.designation)}
          </span>
          <div className="flex justify-between gap-[8px] xsm:gap-[21.32px] md:gap-[4px] lg:gap-[21.32px] mt-[9px] md:mt-[11px]">
            {instagram && (
              <div
                className="h-[42.89px] w-[42.89px] flex items-center justify-center"
                onClick={() => {
                  window.open(instagram, "_blank");
                }}
              >
                <FaInstagram className="text-[20.43px] text-[#335BF5]" />
              </div>
            )}
            {email && (
              <div
                className="h-[42.89px] w-[42.89px] flex items-center justify-center"
                onClick={() => {
                  const mailtoUrl = `mailto:${email}`;
                  window.location.href = mailtoUrl;
                }}
              >
                <HiOutlineMail className="text-[20.43px] text-[#335BF5]" />
              </div>
            )}
            {facebook && (
              <div
                className="h-[42.89px] w-[42.89px] flex items-center justify-center"
                onClick={() => {
                  window.open(facebook, "_blank");
                }}
              >
                <AiOutlineFacebook className="text-[20.43px] text-[#335BF5]" />
              </div>
            )}
            {twitter && (
              <div
                className="h-[42.89px] w-[42.89px] flex items-center justify-center"
                onClick={() => {
                  window.open(twitter, "_blank");
                }}
              >
                <FaXTwitter className="text-[20.43px] text-[#335BF5]" />
              </div>
            )}
            {linkedin && (
              <div
                className="h-[42.89px] w-[42.89px] flex items-center justify-center"
                onClick={() => {
                  window.open(linkedin, "_blank");
                }}
              >
                <FaLinkedin className="text-[20.43px] text-[#335BF5]" />
              </div>
            )}
          </div>
          <span className="font-[500] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] mt-[7.11px] md:mt-[9.11px] px-[0px] md:px-[4px] text-center">
            {Parser(aboutData.message?.quote)}
          </span>
          <button
            className="mt-[18px] w-[141px] h-[36px] rounded-[37px] bg-[#335BF5] flex md:hidden items-center justify-center hover:scale-[103%] transition-[300ms]"
            onClick={() => {
              router.push("/about/founder");
            }}
          >
            <p className="font-[600] text-[14px] text-[#fff]">Read Message</p>
          </button>
        </div>
        <div className="w-[65%] h-fit hidden md:block">
          <p className="font-[600] text-[32px] leading-[48px] mt-[12px]">
            Founders Message
          </p>
          <span className="font-[500] text-[18px] leading-[32px] mt-[12px] text-justify">
            {Parser(aboutData.message?.description)}
          </span>
          {/* <p className="font-[500] text-[18px] leading-[32px] mt-[15px]">
          During his professional journey he has gained in-depth experience in the area of Secretarial Practice, Due Diligence, Mergers & Acquisitions, Startup Advisory, rendering opinions on diverse issues under Companies Act, XBRL Filling, Foreign business setup advisory, FEMA, CSR Advisory etc. Dikshant is renowned for fostering long-lasting relationships with clients by delivering optimal solutions and effective strategies for professional matters. 
          </p> */}
          <button
            className="w-[198px] h-[52px] bg-[#335BF5] rounded-[37px] flex items-center justify-center mt-[19px] cursor-pointer hover:scale-[103%] transition-[300ms]"
            onClick={() => {
              router.push("/about/founder");
            }}
          >
            <p className="font-[700] text-[18px] text-[#FFF]">Read More</p>
          </button>
        </div>
      </div>

      {/* reason section */}
      {homeData.reason.cards.length > 0 && (
        <div className="w-full h-fit bg-[#FFF] sm:bg-[#FAFAFA] flex flex-col pt-[28px] sm:pt-[55px] px-[20px] pb-[28px] sm:pb-[103px]">
          <div className="flex flex-col gap-[10px] items-center justify-center">
            <div className="font-[700] text-[16px] sm:text-[40px] text-[#252B42]  leading-[22px] sm:leading-[57px]">
              {Parser(
                homeData.reason?.heading
                  ? homeData.reason?.heading
                  : "WHY CHOOSE US"
              )}
            </div>
            <div className="hidden sm:block font-[500] text-[16px] text-[#737373] max-w-[582px] text-center">
              {Parser(
                homeData.reason?.description
                  ? homeData.reason?.description
                  : "Problems trying to resolve the conflict between the two major realms of Business & Accounting CS"
              )}
            </div>
          </div>
          <div className="flex flex-wrap mt-[13px] sm:mt-[52px] gap-[8px] xsm3:gap-[14px] sm:gap-[20px] smd:gap-[25px] md2:gap-[30px] md4:gap-[40px] lg:gap-[49px] items-center justify-center">
            {homeData.reason?.cards?.length > 0 &&
              homeData.reason?.cards?.map((item, index) => {
                return (
                  <WhyChooseUsCard
                    key={index} // Ensure each element has a unique key
                    logo={item.logo}
                    title={item.tag}
                    number={item.value}
                  />
                );
              })}
          </div>
        </div>
      )}
      {/* <div className="flex w-full flex-col gap-[14px] md:gap-[44px] pt-[28px] pl-[20px] pr-[20px] md:pl-[40px] md:pr-[40px] lg:pl-[80px] lg:pr-[80px] xl:pl-[130px] xl:pr-[138px] md:pt-[48px] pb-[20px] md:pb-[88px]">
        <p className="font-[600] text-[16px] md:text-[36px]">
          {aboutData.team?.heading}
        </p>
        {aboutData?.team?.member?.length > 0 && (
          <div className="flex flex-wrap md:gap-x-[32px] md:gap-y-[50px] gap-x-[8px] gap-y-[16px] justify-center">
            {aboutData.team?.member?.map((d, i) => (
              <div
                key={i}
                className="flex flex-col gap-[6.14px] md:gap-[19px] items-center justify-center hover:scale-[107%] transition-[300ms]"
              >
                <img
                  alt="img"
                  src={d.image}
                  className="w-[156px] h-[165px] md:w-[269px] md:h-[286px] rounded-[12px] object-cover"
                ></img>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-[600] text-[16px] md:text-[24px] leading-[28px]">
                    {d.name}
                  </p>
                  <p className="font-[400] text-[12px] md:text-[16px] leading-[28px]">
                    {d.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
      <div className="lg:px-[82px] mt-16 md:mb-[80px] md:px-[25px] md22:px-[40px]">
        <BrochureCard />
      </div>

      <Footer />
    </div>
  );
}
