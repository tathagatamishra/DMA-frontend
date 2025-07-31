"use client";
import React, { useEffect, useRef, useState } from "react";
import { getCookie, serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Footer from "../Footer/Footer";
import BlogCard from "../UI/BlogCard";
import WhyChooseUsCard from "../UI/WhyChooseUsCard";
import Rectangle from "@/component/assets/Rectangle.png";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import map from "@/component/assets/map.png";
import newImage from "@/component/assets/new.jpeg";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import logo from "@/component/assets/logo.png";
import WhatClientsayCard from "../UI/WhatClientsayCard";
import Header from "../Header/Header";
import "../Style/Homepage.css";
import { IoMdPlay } from "react-icons/io";
import Sidebar from "../Sidebar/Sidebar";
import ServicesCardHome from "../UI/ServicesCardHome";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import IFrame from "../UI/IFrame";
import { IoAdd, IoAddOutline, IoCallOutline } from "react-icons/io5";
import { RxCross1, RxCross2 } from "react-icons/rx";
import Fab from "../UI/Fab";
import SidebarFab from "../UI/SidebarFab";
import ServiceDropDown from "../UI/ServiceDropDown";
import { isIOS } from "react-device-detect";
import Carousel from "../UI/Carousel";
import AnimatedHeader from "../Animation/AnimatedHeader";
import BrochureCard from "../UI/BrochureCard";
import Parser from "../UI/Parser";
import Toast from "../UI/Toast";
import DisclaimerModal from "../Modal/Modal";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

const FAQItem = ({ question, answer, index, isVisible, toggleVisibility }) => (
  <div>
    <div
      className="flex justify-between items-center w-full cursor-pointer"
      onClick={() => toggleVisibility(index)}
    >
      <span className="font-[600] text-[12px] xsm2:text-[16px] leading-[27px] sm2:leading-[46px] w-[90%]">
        {Parser(question)}
      </span>
      <IoAdd
        className={`text-[20px] text-[#000] transition-transform duration-300 ${
          isVisible ? "rotate-[135deg]" : "rotate-0"
        }`}
        onClick={() => toggleVisibility(index)}
      />
    </div>
    {isVisible && (
      <span className="font-[400] xsm2:font-[500] text-[12px] xsm2:text-[14px] mb-[10px] sm2:mb-[16.5px]">
        {Parser(answer)}
      </span>
    )}
    <div className="w-full border-[0.59px] sm2:border-[1px] border-[#D3D3D3]"></div>
  </div>
);

export default function Homepage({ homeData, usedIn, faqData }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    location: "",
    phone: "",
    email: "",
  });

  const fetchContactData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getContact`);
      const { card } = data.contactData;
      setContactInfo({
        location: card.location,
        phone: card.phone,
        email: card.email,
      });
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();
  const [visibleIndex, setVisibleIndex] = useState(null);

  const faqs =
    faqData?.faq?.length > 0 &&
    faqData.faq.map((question, index) => ({
      question: question[0],
      answer: question[1] || "No answer available",
    }));

  // useEffect(() => {
  //   const fetchContactDetails = async () => {
  //     try {
  //       const { data } = await axios.get(`${serverUrl}/getContactDetails`);
  //       // setContactDetails(data);
  //     } catch (error) {
  //       console.error("Error fetching contact details:", error);
  //     }
  //   };

  //   fetchContactDetails();
  // }, []);

  const toggleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const reviewRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);

  const [serviceElements, setServiceElements] = useState([]);
  const [blogElements, setBlogElements] = useState([]);
  const [reviewElement, setReviewElement] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [toastVisible, setToastVisible] = useState(false); // State for controlling toast visibility
  const [toastConfig, setToastConfig] = useState({
    type: "success",
    text: "",
  });
  const [toastMessage, setToastMessage] = useState(""); // State to store the toast message
  const [showToast, setShowToast] = useState(false);

  function truncateDES(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }

  function trimToTwoWords(text) {
    const words = text.split(" ");
    if (words.length <= 2) {
      return text;
    }
    return words.slice(0, 2).join(" ") + " ...";
  }

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  useEffect(() => {
    const container = containerRef.current;
    const checkOverflow = () => {
      if (container?.scrollWidth > container?.clientWidth) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  useEffect(() => {
    const container = reviewRef.current;
    const checkOverflow = () => {
      if (container.scrollWidth > container.clientWidth) {
        setOverflow(true);
      } else {
        setOverflow(false);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (isOverflow && !isPaused && containerRef.current) {
      const scrollContainer = containerRef.current;
      const scroll = () => {
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      };
      intervalId = setInterval(scroll, 20);
    }
    return () => clearInterval(intervalId);
  }, [isOverflow, isPaused]);

  const handleMouseEnterr = () => {
    setIsPaused(true);
  };

  const handleMouseLeavee = () => {
    setIsPaused(false);
  };

  const handleSubmit = async () => {
    // Reset the toast visibility when the form is submitted
    setShowToast(false);

    // Check for empty fields
    if (!name || !email || !mobile || !message) {
      setToastConfig({
        type: "error",
        text: "Please fill in all fields.",
      });
      setShowToast(true); // Show error message immediately
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToastConfig({
        type: "error",
        text: "Please enter a valid email.",
      });
      setShowToast(true); // Show error message immediately
      return;
    }

    try {
      const payload = {
        type: "help",
        name,
        email,
        message,
      };

      // Send POST request
      await axios.post(`${serverUrl}/createRequest`, payload);

      // Show success message and reset fields
      setToastConfig({
        type: "success",
        text: "Form submitted successfully!",
      });
      setShowToast(true); // Show success message immediately

      // Reset the form fields
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
    } catch (error) {
      // Show error message if the request fails
      setToastConfig({
        type: "error",
        text: "Failed to submit the form. Please try again.",
      });
      setShowToast(true); // Show error message immediately
    }
  };

  const thumbnailUrl = `https://img.youtube.com/vi/3Pk8EmyK7kw/maxresdefault.jpg`;

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const reviews = [
    {
      image:
        "https://s3-alpha-sig.figma.com/img/8222/34eb/17cf8dba5924c656d7f6df3bc922e9b5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eChz9cQIkWw~fMXQiyxEmhvp78WtD2g8GTenjl90wDWnZ5c4l2OwdP7wuHNmh0kUEL87q4eN82Lpz43z0mNJGy-SAFX1jqd~Iwe-F7UG~z2yIfoxEBz-5rtJcUEG~Q0yMsrnuaBqbyAfH1V8wOjmUbgRLeEWRHC31SWh2ycePR6bSEieBv7xPbB-UUURwtlAnfU5r0hVILj3c-UlCNZRSXNtOxrYxZHhid3l9ZP0X46zJemCCQS3nO5taBV7A28Pb7GN46ttHivU6Ps2aqYb1USPTgxJnHYy~Z2NV87a~yOVJ~gvvOSRdHGylC0y0f-YN0P-Hg-j~NMYycz2qPVnGQ__",
      content:
        "“You made it so simple. My new site is so much faster & easier to work with Albino.”",
      name: "Ilya Vasin",
      designation: "Admin",
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/5f8c/05e7/34912b476c670558c5198dce217754b1?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KjbW3AL-UnvIftOxVq6BAl2C8jA~T7s7bYp4YmXIhlWMut~zXeh-fyJZ5zwnKkBRoqx~-ONcLDjizyVPd10gdqfTr4qxTTjH8mOJ1GmBRpSYLoitTWYiun4iqfq5UHFvqafByY8LNblJuAwDA6MuX2r5bjp5r4YOaJIvORr4x-aj27cVM7MDRAlW~QbLTLWFnsZKpwrEUMp8Bzd3sLUIr37-x8SPgePd-km2P7vH2OTEU-8pKpqu2RL2ev9K8V6FtHTefuOZFy7e6vYEH~V0vQwv6LHgIlJ3R14fyLuEopQKkJP9ojJf2tkIIyM80ZI5GAfElPgjQNOTbv9KXyehzA__",
      content:
        "“Must have book for students, who want to be a great Product Designer.”",
      name: " Mariano Rasgado",
      designation: "Admin",
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/8222/34eb/17cf8dba5924c656d7f6df3bc922e9b5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eChz9cQIkWw~fMXQiyxEmhvp78WtD2g8GTenjl90wDWnZ5c4l2OwdP7wuHNmh0kUEL87q4eN82Lpz43z0mNJGy-SAFX1jqd~Iwe-F7UG~z2yIfoxEBz-5rtJcUEG~Q0yMsrnuaBqbyAfH1V8wOjmUbgRLeEWRHC31SWh2ycePR6bSEieBv7xPbB-UUURwtlAnfU5r0hVILj3c-UlCNZRSXNtOxrYxZHhid3l9ZP0X46zJemCCQS3nO5taBV7A28Pb7GN46ttHivU6Ps2aqYb1USPTgxJnHYy~Z2NV87a~yOVJ~gvvOSRdHGylC0y0f-YN0P-Hg-j~NMYycz2qPVnGQ__",
      content:
        "“You made it so simple. My new site is so much faster & easier to work with Albino.”",
      name: "Ilya Vasin",
      designation: "Admin",
    },
  ];

  useEffect(() => {
    console.log(homeData);

    setServiceElements(
      homeData?.service?.list?.length > 0 &&
        homeData?.service?.list.map((d, index) => (
          <ServicesCardHome
            key={index}
            coverimage={d.coverimage}
            description={truncateDES(d.description, 127)}
            title={trimToTwoWords(d.title)}
            onClick={() => {
              router.push(`/service/${d._id}`);
            }}
          />
        ))
    );
  }, [homeData]);


  const [Disclaimer, setDisclaimer] = useState(false);

  useEffect(() => {
    const dis = localStorage.getItem("disclaimer");
    if (dis !== null) {
      setDisclaimer(JSON.parse(dis));
    } else {
      setTimeout(() => {
        setDisclaimer(true);
      }, 2000);
    }
  }, []);
  
  const handleDisclaimer = () => {
    localStorage.setItem("disclaimer", "false");
    setDisclaimer(false);
  };

  useEffect(() => {
    setBlogElements(
      homeData?.blog?.list?.length > 0 &&
        homeData?.blog?.list.map((d) => {
          return (
            <BlogCard
              key={d._id}
              id={d._id}
              img={d.coverimage}
              content={d.firstStory}
              title={d.title}
              category={d.category}
            />
          );
        })
    );
  }, [homeData]);

  const [videoUrl, setVideoUrl] = useState("");
  const [text, settext] = useState("");

  useEffect(() => {
    const data = homeData.gallery?.video || "";

    if (typeof data === "string" && data) {
      let videoId = "";
      if (data.includes("youtu.be/")) {
        videoId = data.split("youtu.be/")[1].split("?")[0];
      } else if (data.includes("watch?v=")) {
        videoId = data.split("watch?v=")[1].split("&")[0];
      } else if (data.includes("embed/")) {
        videoId = data.split("embed/")[1];
      }

      setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
    }
  }, [homeData]);

  const [aboutvideoUrl, setAboutVideoUrl] = useState("");

  useEffect(() => {
    const data = homeData.about?.image || "";

    if (typeof data === "string" && data) {
      let videoId = "";
      if (data.includes("youtu.be/")) {
        videoId = data.split("youtu.be/")[1].split("?")[0];
      } else if (data.includes("watch?v=")) {
        videoId = data.split("watch?v=")[1].split("&")[0];
      } else if (data.includes("embed/")) {
        videoId = data.split("embed/")[1];
      }

      setAboutVideoUrl(`https://www.youtube.com/embed/${videoId}`);
    }
  }, [homeData]);

  useEffect(() => {
    setReviewElement(
      reviews.map((d, index) =>
        index == 0 && currentSlide === reviews.length ? (
          <WhatClientsayCard
            key={index}
            image={d.image}
            content={d.content}
            name={d.name}
            designation={d.designation}
          />
        ) : index === currentSlide ? (
          <WhatClientsayCard
            key={index}
            image={d.image}
            content={d.content}
            name={d.name}
            designation={d.designation}
          />
        ) : (
          <div
            key={index}
            className="flex flex-col w-[208.69px] md:w-[324px] pt-[25px] md:pt-[90px] items-center justify-center"
          >
            <img
              alt="img"
              src={d.image}
              className="h-[17px] sm:h-[35px] sm:w-[104px] object-cover"
            />
            <p className="text-[11px] sm:text-[24px] font-[700] text-[#fff] text-center mt-[50px]">
              {d.content}
            </p>
            <div className="flex flex-col mt-[16px] items-center justify-center">
              <p className="font-[700] text-[12px] sm:text-[17px] text-[#fff] leading-[14px] sm:leading-[29px]">
                {d.name}
              </p>
              <p className="sm:font-[600] font-[400] text-[11px] sm:text-[16px] text-[#fff] leading-[12.62px] sm:leading-[26px]">
                {d.designation}
              </p>
            </div>
          </div>
        )
      )
    );
  }, []);

  return (
    <div
      className={`w-full flex flex-col items-center overflow-y-scroll overflow-x-hidden ${
        isIOS ? "pb-[60px]" : "pb-[0px]"
      } `}
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

      {/* hero section */}
      <div
        className="w-full h-fit bg-cover bg-center flex items-center justify-center transition-[300ms] relative"
        style={{
          backgroundImage: homeData.hero?.image
            ? `url(${homeData.hero?.image})`
            : `url('/homeImg.png')`,
        }}
      >
        <div className="w-full h-full pt-[20px] smd:pt-[91px] pb-[28px] smd:pb-[119px] px-[24px] flex flex-col items-center justify-center gap-[22px] xssm:gap-[35px] transition-[300ms] z-[10]">
          <div
            className={`max-w-[741px] font-[700] xsm11:font-[800] text-[20px] xsm:text-[22px] xsm1:text-[24px] xsm2:text-[28px] xsm3:text-[30px] sm:text-[35px] sm2:text-[37px]  smd:text-[42px] md3:text-[46px] lg:text-[56px] text-[#FFF] text-center flex items-center justify-center transition-opacity ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(
              homeData.hero?.heading
                ? homeData.hero?.heading
                : "Experts are here solve your business problems."
            )}
          </div>
          <div
            className={`w-full font-[500] text-[14px] xsm11:text-[16px] sm2:text-[18px] smd:text-[20px] text-[#FFF] text-center max-w-[376px] flex items-center justify-center transition-[300ms]  ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(
              homeData.hero?.description
                ? homeData.hero?.description
                : "We know how large objects will act, but things on a small scale."
            )}
          </div>
          <div className="flex gap-[14px]">
            <button
              className="rounded-[37px] bg-[#335BF5] h-[32px] xsm2:h-[52px] w-[109px] xssm:w-[128px] xsm2:w-[167px] flex items-center justify-center hover:scale-[103%] transition-[300ms]"
              onClick={() => {
                router.push("/contact");
              }}
            >
              <p className="font-[700] text-[10px] xsm2:text-[14px] text-[#FFF] transition-[300ms]">
                Explore Now
              </p>
            </button>
            <button className="rounded-[37px] border border-[#FFFFFF] h-[32px] xsm2:h-[52px] w-[109px] xssm:w-[128px] xsm2:w-[167px] flex items-center justify-center hover:scale-[103%] transition-[300ms]">
              <p className="font-[700] text-[10px] xsm2:text-[14px] text-[#FFF] transition-[300ms]">
                Learn More
              </p>
            </button>
          </div>
        </div>

        <div className="bg-[#00000099] absolute top-0 left-0 w-full h-full overflow-hidden z-[0]">
          <AnimatedHeader />
        </div>
      </div>

      {/* about us section */}
      <div className="w-full gap-[20px] md:gap-[0px] bg-[#FAFAFA] border-b-[1px] border-t-[1px] border-[#DDDDDD] flex md:flex-row flex-col">
        {/* <Image
          alt="image"
          height={720}
          width={1080}
          src={homeData.about?.image ? homeData.about?.image : Rectangle}
          className="h-[221px] md:h-auto w-auto md:w-[47%] object-cover"
        /> */}
        <iframe
          width="800"
          height="780"
          className="pt-[20px] pl-[20px] pr-[20px] max-h-[180px] md:max-h-[265px] md4:max-h-[442px] w-auto md:w-[47%] "
          src={aboutvideoUrl}
          title="Dynamic YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="w-full md:w-[53%] md:py-[20px] py-[0px] pl-[20px] pr-[22px] md:pl-[25px] md4:pl-[35px] lg:pl-[52px] flex flex-col md:pr-[8px] gap-[14px] md:gap-[30px] lg:gap-[39px] justify-center mb-[35px] md:mb-[0px]">
          <div className="flex flex-col gap-[8px]">
            <div className="font-[700] text-[20px] xsm11:text-[22px] md:text-[24px] leading-[20px] md:leading-[32px]">
              {Parser(
                homeData.about?.heading ? homeData.about?.heading : "About Us"
              )}
            </div>
            <div className="font-[600] md:font-[700] text-[16px] xsm11:text-[18px] md:text-[32px] text-[#252B42] md:leading-[32px] leading-[16px]">
              {Parser(
                homeData.about?.subheading
                  ? homeData.about?.subheading
                  : "DM Associates"
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[23px] lg:gap-[32px]">
            {homeData.about?.description?.map((item, index) => (
              <div
                key={index}
                className="font-[500] text-[14px] xsm11:text-[16px]  md:text-[17px] md4:text-[20px] leading-[26px] md:leading-[32px] text-justify mr-[10px]"
              >
                {Parser(item)}
              </div>
            ))}

            <p
              className="font-[700] text-[14px] xsm11:text-[15.8px] md:text-[17px] md4:text-[20px] text-[#335BF5] cursor-pointer hover:scale-[102%] transition-[300ms] w-fit"
              onClick={() => {
                router.push("/about");
              }}
            >
              {homeData.about?.link
                ? homeData.about?.link
                : "A boon for a Good Corporate Governance"}
            </p>
          </div>
        </div>
      </div>

      {/* client section */}
      {homeData.client?.image?.length > 0 && (
        <div className="w-full h-fit pt-[24px] sm:pt-[50px] pb-[36px] sm:pb-[58px] flex flex-col gap-[16.74px] items-center justify-center">
          <div className="hidden sm:block font-[600] text-[18px]">
            {Parser(
              homeData.client?.heading
                ? homeData.client?.heading
                : "Our Clients all over the world"
            )}
          </div>

          <div
            ref={containerRef}
            className={`w-screen h-[38px] flex items-center ${
              isOverflow
                ? "justify-start overflow-x-scroll"
                : "justify-center overflow-x-hidden"
            } sm:gap-[40px] gap-[19.12px] px-[20px] whitespace-nowrap`}
            onMouseEnter={handleMouseEnterr}
            onMouseLeave={handleMouseLeavee}
          >
            {homeData.client?.image.map((link, index) => (
              <Image
                alt="image"
                key={index}
                src={link}
                width={720}
                height={720}
                className="w-auto h-full shrink-0"
              />
            ))}
          </div>
        </div>
      )}
      {/* services section */}
      <div className="w-full h-fit sm:h-[726px] flex flex-col items-center sm:pt-[48px]">
        <span className="w-[60px] h-[6px] sm:w-[70px] sm:h-[10px] bg-[#335BF5] rounded-[50px]"></span>
        <div className="mt-[10px] sm:mt-[8px]">
          <div className="text-[#252B42] font-[700] text-[16px] sm:text-[40px] flex items-center justify-center sm:leading-[57px]">
            {Parser(
              homeData.service?.heading
                ? homeData.service?.heading
                : "Our Services"
            )}
          </div>
          <div className="hidden sm:flex text-[14px] font-[500] text-[#737373] max-w-[470px] text-center items-center justify-center mt-[10px]">
            {Parser(
              homeData.service?.description
                ? homeData.service?.description
                : "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics"
            )}
          </div>
        </div>

        <div className="flex flex-row mt-[22px] sm:mt-[73px] w-full overflow-x-scroll overflow-y-hidden cursor-pointer">
          <Carousel
            data={serviceElements}
            infinite={serviceElements.length > 1 ? true : false}
            dots={false}
            speed={5000}
            autoplay={true}
            slidesToShow={
              windowWidth > 1290
                ? 4
                : windowWidth > 970
                ? 3
                : windowWidth > 650
                ? 2
                : 1
            }
            // setCurrentSlide={setCurrentSlide}
            // currentSlide={currentSlide}
          />
        </div>
      </div>
      {/* <div className="w-full h-fit sm:h-[726px] flex flex-col items-center sm:pt-[48px]">
        <span className="w-[60px] h-[6px] sm:w-[70px] sm:h-[10px] bg-[#335BF5] rounded-[50px]"></span>
        <div className="mt-[10px] sm:mt-[8px]">
          <p className="text-[#252B42] font-[700] text-[16px] sm:text-[40px] flex items-center justify-center sm:leading-[57px]">
            {Parser(homeData.service?.heading
              ? homeData.service?.heading
              : "Our Services")}
          </p>
          <p className="hidden sm:flex text-[14px] font-[500] text-[#737373] max-w-[470px] text-center items-center justify-center mt-[10px]">
            {Parser(homeData.service?.description
              ? homeData.service?.description
              : "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics")}
          </p>
        </div>

        <div className="flex flex-row mt-[22px] sm:mt-[73px] w-full overflow-x-scroll overflow-y-hidden cursor-pointer">
          {homeData.service.list.map((d, index) => (
            <ServicesCardHome
              key={index}
              img={d.coverimage}
              description={truncateDES(d.description, 127)}
              title={trimToTwoWords(d.title)}
              isHovered={hoveredIndex === index}
              onClick={() => {
                router.push(`/service/${d._id}`);
              }}
            />
          ))}
        </div>
      </div> */}

      {/* blog section */}
      <div className="w-full h-fit pt-[23px] sm:pt-[83px] sm:pb-[80px] flex flex-col items-center">
        <div className="flex flex-col items-center justify-center px-[64px] ">
          <span className="w-[60px] h-[6px] sm:w-[70px] sm:h-[10px] bg-[#335BF5] rounded-[50px]"></span>
          <div className="mt-[10px] sm:mt-[8px] flex flex-col items-center justify-center">
            <div className="text-[#252B42] font-[700] text-[16px] sm:text-[40px] flex items-center justify-center sm:leading-[57px]">
              {Parser(
                homeData.blog?.heading ? homeData.blog?.heading : "Our Blogs"
              )}
            </div>

            <div className="hidden sm:flex text-[14px] font-[500] text-[#737373] max-w-[470px] text-center items-center justify-center mt-[10px]">
              {Parser(
                homeData.blog?.description
                  ? homeData.blog?.description
                  : "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics"
              )}
            </div>
          </div>
        </div>

        <div
          className="flex justify-between mt-[20px] sm:mt-[61px] overflow-x-scroll max-w-[1344px] w-full"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #fff 4%, #fff 96%, transparent)",
          }}
        >
          <Carousel
            data={blogElements}
            infinite={blogElements.length > 1 ? true : false}
            // gap="20px"
            dots={false}
            speed={5000}
            autoplay={true}
            slidesToShow={
              windowWidth > 1290
                ? 3
                : windowWidth > 970
                ? 2
                : windowWidth > 840
                ? 2
                : 1
            }
          />
        </div>
      </div>

      {/* reason section */}
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

      {/* gallery section */}
      <div
        className="w-full h-fit bg-cover bg-center px-[20px] md:px-[40px] md22:px-[70px] xl:px-[195px] pt-[23px] md:pt-[43px] pb-[45px] md:pb-[70px]"
        style={{
          backgroundImage: `url('/BestService.jpeg')`,
        }}
      >
        <div className="pt-[52px] w-full flex flex-col items-center justify-center">
          <div className="max-w-[500px] text-[40px] font-[700] text-[#252B42] flex items-center justify-center h-fit text-center">
            {Parser(
              homeData.gallery?.heading
                ? homeData.gallery?.heading
                : "We are providing best business service."
            )}
          </div>
          <div className="mt-[15px]">
            <div className="text-[16px] mb-1 xsm3:mb-2 sm:mb-0 font-[500] text-[#737373] flex items-center justify-center text-center ">
              {Parser(
                homeData.gallery?.description
                  ? homeData.gallery?.description
                  : "Problems trying to resolve the conflict between the two major of Business & Accounting CS realms"
              )}
            </div>
          </div>
        </div>

        <div className="md:mt-[72px] flex w-full flex-col-reverse items-center justify-center md:flex-row md:gap-[40px] md4:gap-[60px] lg:gap-[80px] xl:gap-[123px] h-fit">
          <div className="mt-[16px] md:mt-[0px] w-full md:w-[31.6%] flex flex-col ">
            <div className="text-[#252B42] text-[20px] md:text-[30px] lg:text-[40px] font-[700] leading-[32px] md:leading-[57px]">
              {Parser(
                homeData.gallery?.extra?.heading
                  ? homeData.gallery?.extra?.heading
                  : "Most trusted in our field"
              )}
            </div>
            <div className="text-[#737373] text-[14px] font-[500] mt-[7px] md:mt-[10px] text-justify">
              {Parser(
                homeData.gallery?.extra?.description
                  ? homeData.gallery?.extra?.description
                  : "Most calendars are designed for teams. Slate is designed for freelancers who want a simple way to plan their schedule."
              )}
            </div>
            {homeData.gallery.extra.cards.map((item, index) => {
              return (
                <>
                  <div className="flex gap-[12px] md:gap-[20px] mt-[21px] md:mt-[30px] pr-[8px] md:pr-[0px]">
                    <img
                      src={item.logo}
                      alt="logo"
                      className="w-[32px] h-[32px] mt-[2px] sm:mt-[6px] mix-blend-multiply "
                    />
                    <div className="flex flex-col gap-[5px]">
                      <div className="text-[#252B42] text-[14px] md4:text-[16px] font-[700]">
                        {Parser(item.heading)}
                      </div>
                      <div className="text-[#737373] text-[12px] md:text-[14px] font-[600]">
                        {Parser(item.description)}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <button
              className="hidden md:flex w-[198px] h-[52px] rounded-[37px] bg-[#335BF5]  items-center justify-center mt-[44px] cursor-pointer hover:scale-[103%] transition-[300ms]"
              onClick={() => {
                router.push("/gallery");
              }}
            >
              <p className="text-[18px] font-[700] text-[#FFF]">Gallery</p>
            </button>
          </div>

          <div className="w-full md:w-[56.9%] md:max-w-[597px] max-h-[200px] md:max-h-[442px] rounded-[14px] flex flex-grow flex-shrink items-center justify-center object-contain order-1 md:order-2">
            <iframe
              width="560"
              height="315"
              className="rounded-[14px] max-h-[180px] md:max-h-[265px] md4:max-h-[442px]"
              src={videoUrl}
              title="Dynamic YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* review section */}
      <div className="hidden flex-col sm:pt-[80px] w-full pt-[24px] pb-[35.59px] h-fit sm:h-[750px] bg-[#335BF5] sm:pb-[0px] items-center">
        <div className="flex flex-col gap-[10px] items-center justify-center px-[0px] sm:px-[105px]">
          <div className="font-[700] text-[20px] sm:text-[25px] smd:text-[40px] text-[#FFF] flex items-center justify-center leading-[20px] sm:leading-[57px]">
            {Parser(
              homeData.reviews?.heading
                ? homeData.reviews.heading
                : "What Clients Say"
            )}
          </div>
          <div className="hidden sm:flex font-[500] text-[16px] text-[#FFF] items-center justify-center max-w-[582px] text-center">
            {Parser(
              homeData.reviews?.description
                ? homeData.reviews?.description
                : "Problems trying to resolve the conflict between the two major realms of Business & Accounting CS"
            )}
          </div>
        </div>
        <div
          ref={reviewRef}
          className={`flex justify-between max-w-[1344px] w-full mt-[31px] sm:mt-[80px] overflow-x-scroll`}
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #fff 4%, #fff 96%, transparent)",
          }}
        >
          <Carousel
            data={reviewElement}
            infinite={reviewElement.length > 1 ? true : false}
            // gap="20px"
            dots={false}
            speed={5000}
            autoplay={true}
            slidesToShow={
              windowWidth > 1290
                ? 3
                : windowWidth > 970
                ? 2
                : windowWidth > 840
                ? 2
                : 1
            }
            setCurrentSlide={setCurrentSlide}
            currentSlide={currentSlide}
          />
        </div>
      </div>

      {/* Contact Us */}
      <div className="bg-[#D9D9D930] w-full h-fit smd:max-h-[996px] lg:px-[50px] smd:px-[30px] px-[20px] smd:pt-[72px] sm:pt-[40px] pt-[20px] smd:pb-[98px] sm:pb-[50px] pb-[30px] flex flex-col items-center sm:gap-[50px] gap-[20px]">
        <div className="w-full flex flex-col items-center sm:gap-[10px] gap-[6px]">
          <p className="w-full font-[700] smd:text-[40px] text-[20px] text-[#252B42] text-center">
            Contact Us
          </p>

          <p className="w-full max-w-[582px] px-[20px] font-[500] smd:text-[16px] text-[14px] text-[#737373] text-center">
            Problems trying to resolve the conflict between the two major realms
            of Business & Accounting CS
          </p>
        </div>

        <div className="max-w-[1228px] w-full flex smd:flex-row flex-col justify-between items-center lg:gap-[50px] gap-[30px] transition-[300ms]">
          <div
            className="lg:max-w-[453px] smd:max-w-[400px] w-full h-full lg:px-[50px] smd:px-[30px] px-[20px] lg:py-[40px] smd:py-[32px] pb-[20px] pt-[29px] rounded-[13px] flex flex-col lg:gap-[35px] smd:gap-[30px] gap-[20px] bg-white transition-[300ms] z-[1]"
            style={{
              border: "1px solid #DDDDDD",
              boxShadow: "0px 13px 19px #0000000a",
            }}
          >
            <p className="w-full font-[700] smd:text-[20px] text-[14.73px] text-[#252B42] flex items-center justify-center">
              Contact Us
            </p>

            <div className="flex flex-col gap-[2px]">
              <input
                onFocus={() => {
                  setNameFocus(true);
                }}
                type="text"
                className="w-full smd:h-[54px] h-[40px] px-[14.5px] smd:text-[15px] text-[11px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[39px] border-[1px] border-[#E8E8E8] bg-[#FAFAFA]"
                placeholder="Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {name == "" && nameFocus && (
                <label
                  htmlFor="myInput"
                  className="text-[9px] md:text-[12px] font-[400] text-[#E40849] pl-[15px]"
                >
                  *Name can't be empty
                </label>
              )}
            </div>

            <div className="flex flex-col gap-[2px]">
              <input
                onFocus={() => {
                  setEmailFocus(true);
                }}
                type="email"
                className="w-full smd:h-[54px] h-[40px] px-[14.5px] smd:text-[15px] text-[11px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[39px] border-[1px] border-[#E8E8E8] bg-[#FAFAFA]"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {(email === "" && emailFocus) ||
              (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ? (
                <label
                  htmlFor="myInput"
                  className="text-[9px] md:text-[12px] font-[400] text-[#E40849] pl-[15px]"
                >
                  {email === ""
                    ? "*Email can't be empty"
                    : "*Invalid email format"}
                </label>
              ) : null}
            </div>

            <div className="flex flex-col gap-[2px]">
              <input
                onFocus={() => {
                  setPhoneFocus(true);
                }}
                type="number"
                className="w-full smd:h-[54px] h-[40px] px-[14.5px] smd:text-[15px] text-[11px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[39px] border-[1px] border-[#E8E8E8] bg-[#FAFAFA]"
                placeholder="Your Mobile No."
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
              {mobile == "" && phoneFocus && (
                <label
                  htmlFor="myInput"
                  className="text-[9px] md:text-[12px] font-[400] text-[#E40849] pl-[15px]"
                >
                  *Number can't be empty
                </label>
              )}
            </div>

            <div className="flex flex-col gap-[2px]">
              <textarea
                onFocus={() => {
                  setMessageFocus(true);
                }}
                type="text"
                className="w-full h-[142px] smd:py-[23px] py-[16.97px] smd:px-[20px] px-[14.76px] rounded-[12px] border border-[#E8E8E8] bg-[#FAFAFA] placeholder-[#18171D] text-[#18171D] smd:text-[15px] text-[11px] font-[400] outline-none resize-none"
                placeholder="Your Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              {message == "" && messageFocus && (
                <label
                  htmlFor="myInput"
                  className="text-[9px] md:text-[12px] font-[400] text-[#E40849] pl-[15px]"
                >
                  *Message can't be empty
                </label>
              )}
            </div>

            {name && email && message && mobile ? (
              <button
                className="flex items-center justify-center bg-[#335BF5] w-full smd:w-[145px] smd:h-[56px] h-[38px] rounded-[35px] smd:font-[400] font-[600] smd:text-[20px] text-[14px] text-[#FFF] hover:scale-[103%] transition-[300ms] cursor-pointer"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Send
              </button>
            ) : (
              <div className="flex flex-col">
                <button className="flex items-center justify-center bg-[rgba(51,91,245,0.42)] w-full smd:w-[145px] smd:h-[56px] h-[38px] rounded-[35px] smd:font-[400] font-[600] smd:text-[20px] text-[14px] text-[#FFF] cursor-not-allowed">
                  Send
                </button>
                {/* <p className="font-[400] text-[12px] text-red-600">
              *Every field is mandatory
            </p> */}
              </div>
            )}
            <Toast
              visible={showToast}
              onClose={() => setShowToast(false)}
              {...toastConfig}
              transition="fade" // Add a fade transition
              duration={3000} // Keep it visible for 3 seconds
              className={`toast-message ${
                toastConfig.type === "success" ? "toast-success" : "toast-error"
              }`}
            />
          </div>

          <div className="max-w-[725px] w-full flex mb-2 lg:mb-0 xl:mb-0 flex-col justify-center items-start lg:gap-[20px] smd:gap-[30px] gap-[20px] transition-[300ms] z-[2]">
            <div className="w-full flex flex-col justify-between gap-[20px]">
              <div className="flex gap-[10px] items-center w-full">
                <GrLocation className="text-[#335BF5] lg:text-[32px] smd:text-[28px]" />
                <p className="font-[500] lg:text-[20px] smd:text-[18px] text-[12px] w-full">
                  {Parser(contactInfo.location)}
                </p>
              </div>

              <div className="flex gap-[10px] items-center w-full">
                <MdOutlinePhoneAndroid className="text-[#335BF5] lg:text-[32px] smd:text-[28px]" />
                <p className="font-[500] lg:text-[20px] smd:text-[18px] text-[12px] w-full">
                  {Parser(contactInfo.phone)}
                </p>
              </div>

              <div className="flex gap-[10px] items-center w-full">
                <MdOutlineEmail className="text-[#335BF5] lg:text-[32px] smd:text-[28px]" />
                <p className="font-[500] lg:text-[20px] smd:text-[18px] text-[12px] break-all w-full">
                  {Parser(contactInfo.email)}
                </p>
              </div>
            </div>
            <IFrame
              link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6058.603429608317!2d77.03574708913675!3d28.417585767611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4116a9f0dc9eeafd%3A0xdbd818437be53b62!2sDikshant%20Malhotra%20%26%20Associates%20(DMA)%7C%20Company%20Secretaries%7C%20Trademark%20Agents!5e1!3m2!1sen!2sin!4v1738827047588!5m2!1sen!2sin"
              width={
                windowWidth > 1024
                  ? "596px"
                  : windowWidth > 800
                  ? "496px"
                  : windowWidth > 720
                  ? "450px"
                  : "100%"
              }
              height={
                windowWidth > 1024
                  ? "450px"
                  : windowWidth > 800
                  ? "400px"
                  : "350px"
              }
            />
          </div>
        </div>
      </div>

      {/* faq */}
      <div className="h-fit sm2:h-[534px] w-full flex bg-[#D9D9D930]">
        <div className="hidden sm2:block w-full">
          <div className="flex flex-col">
            <div className="flex">
              <div className="w-[57%] h-[283px] bg-[#031D34] flex pl-[30px] md22:pl-[45px] lg:pl-[73px] items-center pr-[5px]">
                <div className="flex flex-col gap-[26px]">
                  <p className="font-[600] text-[17px] md:text-[20px] text-[#FFF] max-w-[207px]">
                    Connect Things, It’s All About People
                  </p>
                  <button
                    className="w-[135px] md:w-[150px] h-[48px] bg-[#335BF5] rounded-[37px] flex items-center justify-center hover:scale-[103%] transition-[300ms]"
                    onClick={() => {
                      router.push("/contact");
                    }}
                  >
                    <p className="font-[700] text-[14px] text-[#FFF]">
                      Get Started
                    </p>
                  </button>
                </div>
              </div>
              <div className="w-[43%] h-[283px]">
                <Image
                  alt="image"
                  src={newImage}
                  className="h-full w-full object-cover"
                ></Image>
              </div>
            </div>
            <div className="w-full bg-[#335BF5] h-[251px] flex items-center justify-center  px-[10px]">
              <div className="flex gap-[20px] md:gap-[35px] md22:gap-[55px] items-center justify-center">
                <Image
                  alt="image"
                  src={logo}
                  className="object-cover md:w-[86px] md:h-[86px] w-[70px] h-[70px]"
                ></Image>
                <p className=" font-[600] md:font-[700] text-[16px] md:text-[26px] text-[#FFF] max-w-[367px] text-justify">
                  We aim for a world of convenience and value for many customers
                </p>
              </div>
            </div>
          </div>
        </div>

        {faqData && (
          <div
            className="w-full flex flex-col pl-[20px] sm2:pl-[45px] lg:pl-[67px]
            sm2:pt-[30px] md22:pt-[41px] xl:pt-[61px] pr-[16px] sm2:pr-[47px] pb-[40px] sm2:pb-[54px]"
          >
            <p className="font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
              {faqData?.heading}
            </p>
            <div className="overflow-y-scroll">
              {faqData?.faq?.length > 0 &&
                faqData.faq?.map((faq, index) => (
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
        )}
      </div>

      <div className="lg:px-[82px] mt-16 md:mb-[80px] md:px-[25px] md22:px-[40px]">
        <BrochureCard />
      </div>
      {
        Disclaimer && (
          <DisclaimerModal
        onModal={Disclaimer}
        // onClick={() => setShowModal(false)}
        text="Disclaimer"
        borderTopWidth="0px"
        marginTop="0.8rem"
        marginBottom="-0.3rem"
      >
        <div className="flex flex-col space-y-4 items-center">
          <p>
            This website pertains to Dikshant Malhotra Associates, company
            secretaries in practise. This section is never sent unsolicited to
            any person. In case any of our associates has refered to this page
            without context of discussion, expression of interest or specific
            request, please do bring such an act to our notice by dropping an
            email to secretarial@dmassociates.in
          </p>

          <p>
            This section is meant solely for the purpose of information and not
            for the purpose of advertising and solicitation of any assignments
            or professional engagements in any manner. Dikshant Malhotra
            Associates hereby declares that the contents of this section of the
            website are true to the best of our knowledge and belief are in
            confformity with ICSI (Guidelines for advertisement by company
            secretaries)2020.
          </p>

          <p>
            This contents claims in this section of the website are the sole and
            exclusive responsiblity of Dikshant Malhotra Associates. The
            institue of Company secretaries of India does not own any
            responsiblity whatsover for such content or claims by Dikshant
            Malhotra Associates. The content of this website is for
            informational purposes only and Dikshant Malhotra Associates shall
            not be liable for consequences of any action taken by relying on the
            material/ information provided on this website.
          </p>
          <button
            onClick={handleDisclaimer}
            className="py-3 px-4 rounded-lg bg-blue-600 text-white w-[150px]"
          >
            Accept
          </button>
        </div>
      </DisclaimerModal>
        )
      }
      
      <Footer />
    </div>
  );
}
