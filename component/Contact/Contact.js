"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { IoCallOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import BrochureCard from "../UI/BrochureCard";
import SidebarFab from "../UI/SidebarFab";
import Fab from "../UI/Fab";
import ServiceDropDown from "../UI/ServiceDropDown";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { serverUrl } from "@/config";
import axios from "axios";
import { isIOS } from "react-device-detect";
import Parser from "../UI/Parser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../UI/Toast";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

// const options = [
//   { value: 'problem1', label: 'Problem 1' },
//   { value: 'problem2', label: 'Problem 2' },
//   { value: 'problem3', label: 'Problem 3' },
// ];

const Contact = ({ contactData, usedIn }) => {
  console.log(contactData);
  const [isFocusName, setFocusName] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusPhone, setFocusPhone] = useState(false);
  const [isFocusMessage, setFocusMessage] = useState(false);
  const [isFocusSubject, setFocusSubject] = useState(false);

  const [optionsArr, setOptionsArr] = useState([]);
  const defaultt = {
    value: "Select Problem",
    label: "Select Problem",
  };
  const [selectedOption, setSelectedOption] = useState(defaultt);
  useEffect(() => {
    // setSelectedOption(optionsArr[0]);
    setOptionsArr(
      contactData?.form?.problems.map((d) => ({
        value: d,
        label: d,
      }))
    );
  }, []);

  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [show, setShow] = useState(false);
  // const [image, setImage] = useState(contactData.hero.image);
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    type: "success",
    text: "",
  });

  useEffect(() => {
    {
      contactData?.card?.social?.length > 0 &&
        contactData?.card?.social?.map((d) => {
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
  const handleSubmit = async () => {
    // Reset the toast visibility when the form is submitted
    setShowToast(false);

    // Check for empty fields
    if (!name || !email || !subject || !phone || !message || !selectedOption) {
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
        subject,
        problem: selectedOption.value,
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
      setSubject("");
      setPhone("");
      setMessage("");
      setSelectedOption(null);
    } catch (error) {
      // Show error message if the request fails
      setToastConfig({
        type: "error",
        text: "Failed to submit the form. Please try again.",
      });
      setShowToast(true); // Show error message immediately
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);
  // const truncateText = (text, maxWords) => {
  //   // Split the text into words
  //   const words = text.split(" ");
  //   // Return the first `maxWords` words joined back together
  //   return words.slice(0, maxWords).join(" ");
  // };
  // const truncatedDescription = truncateText(contactData?.hero?.description, 25);
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
      <Header setIsOpen={setIsOpen} setIsHover={setIsHover} isHover={isHover} />

      <div
        className="w-full min-h-[195px] md:min-h-[335px] pb-[16px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative"
        style={{
          backgroundImage: `url('${contactData.hero?.image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-[58px] md:w-[115px] h-[22px] md:h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms]">
            <p className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(contactData.hero?.tag)}
            </p>
          </button>
          <p
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(contactData.hero?.heading)}
          </p>
          <p
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] text-justify mt-[7px] block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(contactData.hero?.description)}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col px-[20px] md4:px-[40px] lg:px-[60px] xl:px-[130px] pt-[24px] md:pt-[68px] pb-[20px] md:pb-[74px] md:flex-row md:justify-between">
        <div className="h-fit md:h-[647px] w-full md:w-[46%] xl:w-[41%] rounded-[20px] pl-[16px] md:pl-[28px] pr-[12px] md:pr-[35px] pt-[16px] md:pt-[28px] bg-[#335BF5] pb-[23px] md:pb-[0px] hover:scale-[103%] transition-[300ms]">
          <p className="font-[600] text-[24px] md:text-[36px] text-[#FFF]">
            {Parser(contactData.card?.heading)}
          </p>
          <p className="font-[500] text-[14px] md:text-[20px] text-[#FFF] mt-[10px] md:mt-[33px] text-justify">
            {Parser(contactData.card?.description)}
          </p>
          <div className="flex gap-[12px] md:gap-[13px] md4:gap-[21.32px] mt-[17px] md:mt-[39px]">
            {instagram && (
              <div
                className="h-[38px] w-[38px] md:h-[45px] md:w-[45px] md4:h-[50px] md4:w-[50px] rounded-full bg-[#FFF] flex items-center justify-center cursor-pointer"
                onClick={() => {
                  window.open(instagram, "_blank");
                }}
              >
                <svg
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[18.1px] w-[18.1px] md:h-[21px] md:w-[21px]"
                >
                  <path
                    d="M6.29093 0.40332H14.8701C18.1384 0.40332 20.7939 3.05879 20.7939 6.32707V14.9063C20.7939 16.4774 20.1698 17.9841 19.0589 19.095C17.9479 20.2059 16.4412 20.83 14.8701 20.83H6.29093C3.02266 20.83 0.367188 18.1746 0.367188 14.9063V6.32707C0.367188 4.75599 0.991295 3.24926 2.10221 2.13835C3.21313 1.02743 4.71986 0.40332 6.29093 0.40332ZM6.08666 2.44599C5.11151 2.44599 4.1763 2.83337 3.48677 3.5229C2.79723 4.21244 2.40986 5.14765 2.40986 6.1228V15.1105C2.40986 17.143 4.05421 18.7874 6.08666 18.7874H15.0744C16.0496 18.7874 16.9848 18.4 17.6743 17.7104C18.3638 17.0209 18.7512 16.0857 18.7512 15.1105V6.1228C18.7512 4.09034 17.1069 2.44599 15.0744 2.44599H6.08666ZM15.9425 3.97799C16.2811 3.97799 16.6059 4.1125 16.8453 4.35192C17.0847 4.59134 17.2192 4.91607 17.2192 5.25466C17.2192 5.59326 17.0847 5.91798 16.8453 6.1574C16.6059 6.39683 16.2811 6.53133 15.9425 6.53133C15.604 6.53133 15.2792 6.39683 15.0398 6.1574C14.8004 5.91798 14.6659 5.59326 14.6659 5.25466C14.6659 4.91607 14.8004 4.59134 15.0398 4.35192C15.2792 4.1125 15.604 3.97799 15.9425 3.97799ZM10.5805 5.51C11.9349 5.51 13.2338 6.04802 14.1915 7.00571C15.1492 7.9634 15.6872 9.2623 15.6872 10.6167C15.6872 11.971 15.1492 13.27 14.1915 14.2276C13.2338 15.1853 11.9349 15.7234 10.5805 15.7234C9.22616 15.7234 7.92726 15.1853 6.96957 14.2276C6.01189 13.27 5.47386 11.971 5.47386 10.6167C5.47386 9.2623 6.01189 7.9634 6.96957 7.00571C7.92726 6.04802 9.22616 5.51 10.5805 5.51ZM10.5805 7.55267C9.76791 7.55267 8.98857 7.87548 8.41396 8.45009C7.83935 9.02471 7.51653 9.80405 7.51653 10.6167C7.51653 11.4293 7.83935 12.2086 8.41396 12.7833C8.98857 13.3579 9.76791 13.6807 10.5805 13.6807C11.3932 13.6807 12.1725 13.3579 12.7471 12.7833C13.3217 12.2086 13.6445 11.4293 13.6445 10.6167C13.6445 9.80405 13.3217 9.02471 12.7471 8.45009C12.1725 7.87548 11.3932 7.55267 10.5805 7.55267Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}

            {facebook && (
              <div
                className="h-[38px] w-[38px] md:h-[45px] md:w-[45px] md4:h-[50px] md4:w-[50px] rounded-full bg-[#FFF] flex items-center justify-center cursor-pointer"
                onClick={() => {
                  window.open(facebook, "_blank");
                }}
              >
                <svg
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[18.1px] w-[18.1px] md:h-[21px] md:w-[21px]"
                >
                  <path
                    d="M1.97416 0.40332C0.958396 0.40332 0.117188 1.24453 0.117188 2.26029V18.9731C0.117188 19.9888 0.958396 20.83 1.97416 20.83H18.6869C19.7027 20.83 20.5439 19.9888 20.5439 18.9731V2.26029C20.5439 1.24453 19.7027 0.40332 18.6869 0.40332H1.97416ZM1.97416 2.26029H18.6869V18.9731H13.8699V12.7058H16.2784L16.6266 9.92031H13.8709V8.1209C13.8709 7.3094 14.0696 6.75788 15.2339 6.75788H16.7427V4.23333C16.4855 4.20083 15.5932 4.14605 14.5672 4.14605C12.4271 4.14605 10.9693 5.43386 10.9693 7.83121V9.92031H8.53206V12.7058H10.9684V18.9731H1.97416V2.26029Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
            {twitter && (
              <div
                className="h-[38px] w-[38px] md:h-[45px] md:w-[45px] md4:h-[50px] md4:w-[50px] rounded-full bg-[#FFF] flex items-center justify-center cursor-pointer"
                onClick={() => {
                  window.open(twitter, "_blank");
                }}
              >
                <svg
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[18.1px] w-[18.1px] md:h-[17px] md:w-[18px]"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.2354 16.5951L10.8542 7.29425L10.8651 7.30297L16.6187 0.636719H14.696L10.009 6.06256L6.28696 0.636719H1.24446L7.20187 9.32026L7.20115 9.31952L0.917969 16.5951H2.84065L8.0515 10.5585L12.1929 16.5951H17.2354ZM5.52515 2.08747L14.4783 15.1443H12.9547L3.99428 2.08747H5.52515Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
            {linkedin && (
              <div
                className="h-[38px] w-[38px] md:h-[45px] md:w-[45px] md4:h-[50px] md4:w-[50px] rounded-full bg-[#FFF] flex items-center justify-center cursor-pointer"
                onClick={() => {
                  window.open(linkedin, "_blank");
                }}
              >
                <svg
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[26px] w-[26px] md:h-[29px] md:w-[30px]"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.2882 11.4197V13.4451C15.7071 12.7911 16.2913 12.2593 16.9817 11.9037C17.6721 11.548 18.4442 11.3811 19.2199 11.4197C23.3898 11.4197 24.2238 14.0408 24.2238 17.3768V24.1678H20.4113V18.2108C20.4113 16.6619 20.173 14.8748 17.9093 14.8748C15.6457 14.8748 15.2882 16.4236 15.2882 17.9725V24.1678H11.4757V11.4197H15.2882ZM8.97378 8.20292C8.98322 8.49892 8.92357 8.79304 8.79956 9.06197C8.67554 9.3309 8.49057 9.56723 8.25932 9.75224C8.02807 9.93724 7.7569 10.0658 7.4673 10.1278C7.17771 10.1897 6.87767 10.1834 6.59096 10.1092C6.32924 10.0316 6.08724 9.89867 5.88132 9.71945C5.67541 9.54024 5.51039 9.31888 5.39743 9.07037C5.28447 8.82185 5.2262 8.55197 5.22656 8.27899C5.22693 8.00601 5.28592 7.73628 5.39955 7.48807C5.53122 7.24279 5.71501 7.02932 5.93801 6.86268C6.16101 6.69603 6.4178 6.58025 6.69034 6.52347C6.96287 6.46669 7.24454 6.47029 7.51553 6.53403C7.78653 6.59776 8.04027 6.72007 8.25894 6.89237C8.61636 7.24979 8.85464 7.72636 8.85464 8.20292H8.97378Z"
                    fill="black"
                  />
                  <path
                    d="M8.97266 11.4199H5.16016V24.168H8.97266V11.4199Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[18px] md:gap-[20px] mt-[24px] md:mt-[64px]">
            <div className="flex gap-[12px] md:gap-[16px] items-center">
              <div className="h-[40px] w-[40px] md:h-[44px] md:w-[44px] rounded-full bg-[#FFF] flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[20px] h-[20px] md:h-[24px] md:w-[24px]"
                >
                  <path
                    d="M12 1C9.82441 1 7.69767 1.64514 5.88873 2.85383C4.07979 4.06253 2.66989 5.78049 1.83733 7.79048C1.00477 9.80047 0.786929 12.0122 1.21137 14.146C1.6358 16.2798 2.68345 18.2398 4.22183 19.7782C5.76021 21.3166 7.72022 22.3642 9.85401 22.7886C11.9878 23.2131 14.1995 22.9952 16.2095 22.1627C18.2195 21.3301 19.9375 19.9202 21.1462 18.1113C22.3549 16.3023 23 14.1756 23 12C23 9.08262 21.8411 6.28473 19.7782 4.22183C17.7153 2.15893 14.9174 1 12 1ZM12 21C10.22 21 8.47992 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89471 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17293C11.99 2.82567 13.7996 3.0039 15.4442 3.68508C17.0887 4.36627 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21Z"
                    fill="#335BF5"
                  />
                  <path
                    d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V7Z"
                    fill="#335BF5"
                  />
                  <path
                    d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V12Z"
                    fill="#335BF5"
                  />
                </svg>
              </div>
              <div className="h-[36px] w-[0.8px] bg-[#FFF]  flex items-center justify-center"></div>
              <p className="text-[16px] md:text-[17px] lg:text-[20px] font-[600] text-[#FFF] flex items-center justify-center">
                {Parser(contactData.card?.time)}
              </p>
            </div>
            <div className="flex gap-[12px] md:gap-[16px] items-center">
              <div className="h-[40px] w-[40px] md:h-[44px] md:w-[44px] rounded-full bg-[#FFF] flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[20px] h-[20px] md:h-[24px] md:w-[24px]"
                >
                  <path
                    d="M8 3C8.5 3 10.5 7.5 10.5 8C10.5 9 9 10 8.5 11C8 12 9 13 10 14C10.3943 14.3943 12 16 13 15.5C14 15 15 13.5 16 13.5C16.5 13.5 21 15.5 21 16C21 18 19.5 19.5 18 20C16.5 20.5 15.5 20.5 13.5 20C11.5 19.5 10 19 7.5 16.5C5 14 4.5 12.5 4 10.5C3.5 8.5 3.5 7.5 4 6C4.5 4.5 6 3 8 3Z"
                    stroke="#335BF5"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="h-[36px] w-[0.8px] bg-[#FFF]  flex items-center justify-center"></div>
              <p className="text-[16px] md:text-[17px] lg:text-[20px] font-[600] text-[#FFF] flex items-center justify-center">
                {Parser(contactData.card?.phone)}
              </p>
            </div>
            <div className="flex gap-[12px] md:gap-[16px] items-center">
              <div className="h-[40px] w-[40px] md:h-[44px] md:w-[44px] rounded-full bg-[#FFF] flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[18px] h-[18px] md:h-[20px] md:w-[22px]"
                >
                  <path
                    d="M17.0871 0.769531H5.173C4.04491 0.770883 2.96341 1.21961 2.16573 2.01729C1.36805 2.81497 0.91932 3.89647 0.917969 5.02456L0.917969 15.2366C0.91932 16.3647 1.36805 17.4462 2.16573 18.2439C2.96341 19.0416 4.04491 19.4903 5.173 19.4917H17.0871C18.2152 19.4903 19.2967 19.0416 20.0944 18.2439C20.892 17.4462 21.3408 16.3647 21.3421 15.2366V5.02456C21.3408 3.89647 20.892 2.81497 20.0944 2.01729C19.2967 1.21961 18.2152 0.770883 17.0871 0.769531V0.769531ZM5.173 2.47154H17.0871C17.5967 2.47255 18.0943 2.62601 18.5159 2.9122C18.9375 3.19838 19.2638 3.60419 19.4529 4.07739L12.9359 10.5953C12.4563 11.0729 11.8069 11.3411 11.13 11.3411C10.4531 11.3411 9.80381 11.0729 9.32421 10.5953L2.8072 4.07739C2.99625 3.60419 3.32258 3.19838 3.7442 2.9122C4.16582 2.62601 4.66343 2.47255 5.173 2.47154V2.47154ZM17.0871 17.7897H5.173C4.4959 17.7897 3.84653 17.5207 3.36774 17.0419C2.88896 16.5631 2.61998 15.9137 2.61998 15.2366V6.30107L8.12089 11.7986C8.91966 12.5953 10.0018 13.0428 11.13 13.0428C12.2583 13.0428 13.3404 12.5953 14.1392 11.7986L19.6401 6.30107V15.2366C19.6401 15.9137 19.3711 16.5631 18.8923 17.0419C18.4136 17.5207 17.7642 17.7897 17.0871 17.7897Z"
                    fill="#335BF5"
                  />
                </svg>
              </div>
              <div className="h-[36px] w-[0.8px] bg-[#FFF]  flex items-center justify-center"></div>
              <p className="text-[16px] md:text-[17px] lg:text-[20px] font-[600] text-[#FFF] flex items-center justify-center break-all">
                {Parser(contactData.card?.email)}
              </p>
            </div>
            <div className="flex gap-[12px] md:gap-[16px] items-center">
              <div className="h-[40px] w-[40px] md:h-[44px] md:w-[44px] rounded-full bg-[#FFF] flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[18px] h-[18px] md:h-[24px] md:w-[24px]"
                >
                  <path
                    d="M12 2.25C8.27344 2.25 5.25 5.12766 5.25 8.67188C5.25 12.75 9.75 19.2127 11.4023 21.4448C11.4709 21.5391 11.5608 21.6157 11.6647 21.6686C11.7686 21.7215 11.8835 21.749 12 21.749C12.1165 21.749 12.2314 21.7215 12.3353 21.6686C12.4392 21.6157 12.5291 21.5391 12.5977 21.4448C14.25 19.2136 18.75 12.7533 18.75 8.67188C18.75 5.12766 15.7266 2.25 12 2.25Z"
                    stroke="#335BF5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11.25C13.2426 11.25 14.25 10.2426 14.25 9C14.25 7.75736 13.2426 6.75 12 6.75C10.7574 6.75 9.75 7.75736 9.75 9C9.75 10.2426 10.7574 11.25 12 11.25Z"
                    stroke="#335BF5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="h-[36px] w-[0.8px] bg-[#FFF]  flex items-center justify-center"></div>
              <p className="text-[16px] md:text-[17px] lg:text-[20px] font-[600] text-[#FFF] flex items-center justify-center text-justify">
                {Parser(contactData.card?.location)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[46%] xl:w-[51.1%] md:gap-[30px] mt-[25px] md:mt-[0px]">
          <p className="text-[16px] md:text-[36px] leading-[28px] font-[600]">
            {Parser(contactData.form?.heading)}
          </p>
          <p className="text-[14px] md:text-[20px] font-[400] mt-[6px] md:mt-[0px] text-justify">
            {Parser(contactData.form?.description)}
          </p>

          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="w-full md:w-[47.1%] h-[42px] md:h-[50px] bg-[#F3F3F3] rounded-[8px] p-[12px] md:p-[14px] mt-[18px] md:mt-[0px] flex items-center justify-center relative">
              <input
                onFocus={() => setFocusName(true)}
                type="text"
                className="w-full h-full outline-none bg-[#F3F3F3] font-[500] text-[16px] md:text-[18px] text-[#787878]"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {name === "" && isFocusName && (
                <label
                  htmlFor="myInput"
                  className="text-[9px] md:text-[12px] font-[400] text-[#E40849] absolute top-[43px] md:top-[50px] left-[2px]"
                >
                  *Name can't be empty
                </label>
              )}
            </div>
            <div className="relative w-full md:w-[47.1%] h-[42px] md:h-[50px] bg-[#F3F3F3] rounded-[8px] p-[12px] md:p-[14px] mt-[16px] md:mt-[0px] flex items-center justify-center">
              <input
                onFocus={() => setFocusSubject(true)}
                type="text"
                className="w-full h-full outline-none bg-[#F3F3F3] font-[500] text-[16px] md:text-[18px] text-[#787878]"
                placeholder="Subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                required
              />
              {subject === "" && isFocusSubject && (
                <label
                  htmlFor="myInput"
                  className="text-[9px] md:text-[12px] font-[400] text-[#E40849] absolute top-[43px] md:top-[50px] left-[2px]"
                >
                  *Subject can't be empty
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="w-full md:w-[47.1%] h-[42px] md:h-[50px] bg-[#F3F3F3] rounded-[8px] p-[12px] md:p-[14px] flex items-center justify-center mt-[16px] md:mt-[0px] relative">
              <input
                onFocus={() => setFocusEmail(true)}
                type="text"
                className="w-full h-full bg-[#F3F3F3] outline-none font-[500] text-[16px] md:text-[18px] text-[#787878]"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {(email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) &&
                isFocusEmail && (
                  <label className="absolute text-[12px] text-[#E40849] top-[55px] left-[14px]">
                    *Enter a valid email
                  </label>
                )}
            </div>
            <div className="w-full md:w-[47.1%] h-[42px] md:h-[50px] bg-[#F3F3F3] rounded-[8px] p-[12px] md:p-[14px] mt-[16px] md:mt-[0px] flex items-center justify-center relative">
              <input
                onFocus={() => setFocusPhone(true)}
                type="number"
                className="w-full h-full bg-[#F3F3F3] outline-none font-[500] text-[16px] md:text-[18px] text-[#787878]"
                placeholder="Phone No."
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              {phone === "" && isFocusPhone && (
                <label
                  htmlFor="myInput"
                  className="text-[9px] md:text-[12px] font-[400] text-[#E40849] absolute top-[43px] md:top-[50px] left-[2px]"
                >
                  *Phone can't be empty
                </label>
              )}
            </div>
          </div>

          <div className="w-full h-[42px] md:h-[50px] bg-[#F3F3F3] rounded-[8px] p-[12px] md:p-[14px] mt-[16px] md:mt-[0px] flex items-center justify-center relative">
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              {({ open }) => (
                <>
                  <Listbox.Button className="w-full h-full bg-[#F3F3F3] outline-none font-[500] text-[16px] md:text-[18px] text-[#787878] flex items-center justify-between rounded-[8px]">
                    {selectedOption?.label}
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Listbox.Button>
                  {open && (
                    <Listbox.Options className="absolute z-10 w-full bg-[#F3F3F3] border border-[#DDDDDD] rounded-[8px] top-0">
                      {optionsArr?.length > 0 &&
                        optionsArr.map((option) => (
                          <Listbox.Option
                            key={option.value}
                            value={option}
                            className={({ active }) =>
                              classNames("p-2 cursor-pointer", {
                                "bg-[#E0E0E0]": active,
                                "text-[#787878]": !active,
                              })
                            }
                          >
                            {option.label}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  )}
                </>
              )}
            </Listbox>
          </div>

          <div className="w-full h-[113px] md:h-[171px] bg-[#F3F3F3] rounded-[8px] p-[12px] md:p-[14px] mt-[16px] md:mt-[0px] relative">
            <textarea
              onFocus={() => setFocusMessage(true)}
              type="text"
              className="w-full h-full resize-none bg-[#F3F3F3] outline-none font-[500] text-[16px] md:text-[18px] text-[#787878]"
              placeholder="Your Message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            {message === "" && isFocusMessage && (
              <label
                htmlFor="myInput"
                className="text-[9px] md:text-[12px] font-[400] text-[#E40849] absolute top-[114px] md:top-[172px] left-[2px]"
              >
                *Message can't be empty
              </label>
            )}
          </div>

          {name && subject && email && phone && message ? (
            <button
              className="w-[152px] md:w-[205px] md4:w-[230px] h-[38px] md:h-[62px] bg-[#335BF5] rounded-[37px] flex items-center justify-center mt-[24px] md:mt-[0px] hover:scale-[103%] transition-[300ms]"
              onClick={() => {
                handleSubmit();
              }}
            >
              <p className="font-[600] md:font-[700] text-[14px] md:text-[18px] text-[#FFF]">
                Submit Request
              </p>
            </button>
          ) : (
            <div className="flex flex-col gap-[10px]">
              <button className="w-[152px] md:w-[205px] md4:w-[230px] h-[38px] md:h-[62px] bg-[rgba(51,91,245,0.42)] rounded-[37px] flex items-center justify-center mt-[24px] md:mt-[0px] cursor-not-allowed">
                <p className="font-[600] md:font-[700] text-[14px] md:text-[18px] text-white">
                  Submit Request
                </p>
              </button>
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
      </div>
      <div className="lg:px-[82px] md:mb-[80px] md:px-[25px] md22:px-[40px]">
        <BrochureCard />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
