"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import blogcard1 from "@/component/assets/blogcard1.png";
import fullblog1 from "@/component/assets/fullblog1.jpeg";
import fullblog2 from "@/component/assets/fullblog2.jpeg";
import { TiSocialFacebook } from "react-icons/ti";
import { AiFillInstagram } from "react-icons/ai";
import {
  FaCheck,
  FaCircle,
  FaFacebook,
  FaLinkedin,
  FaRegCopy,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import profilepic from "@/component/assets/profilepic.jpeg";
import { MdEmail, MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoAdd, IoCheckmarkCircle, IoSearch } from "react-icons/io5";
import RecentPostcard from "./RecentPostcard";
import { data } from "autoprefixer";
import { serverUrl } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";
import CommentSection from "./CommentSection";
import { useRouter } from "next/navigation";
import { BsInstagram, BsLinkedin, BsWhatsapp, BsYoutube } from "react-icons/bs";
import Parser from "./Parser";
import Toast from "./Toast"; // Import the Toast component
import { RxCross2 } from "react-icons/rx";
import CenterModal from "../Modal/CenterModal";
import Link from "next/link";

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

const PointIcon = ({ type, index }) => {
  switch (type) {
    case "bullet":
      return (
        <FaCircle className="text-[#0021f5] text-[16px] md:text-[20px] md:mt-[2.5px] " />
      );
    case "checkmark":
      return <FaCheck className="text-[#0021f5] text-[20px] md:text-[26px]" />;
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

const FullBlog = (props) => {
  const [fullUrl, setFullUrl] = useState();
  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const recentPosts = props.recentPosts;
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVisible, setToastVisible] = useState(false); // State for toast visibility
  const [visibleIndex, setVisibleIndex] = useState(null);

  const toggleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };
  const [showLeadGenTeam, setShowLeadGenTeam] = useState(false);
  const [pdfName, setPdfName] = useState("");

  const [formDataTeam, setFormDataTeam] = useState({
    type: "Team",
    name: "",
    email: "",
    phone: "",
    pdfName: "",
  });

  const handleTeamSubmit = async (e) => {
    await setFormDataTeam((prev) => ({
      ...prev,
      pdfName: pdfName,
    }));
    e.preventDefault();
    try {
      // Send POST request
      await axios.post(`${serverUrl}/createLead`, formDataTeam);
      setShowLeadGenTeam(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTeam = (e) => {
    const { name, value } = e.target;
    setFormDataTeam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const value1 = Cookies.get("name");
    const value2 = Cookies.get("email");
    // console.log(value1);
    // console.log(value2);

    if (value1) {
      setName(value1);
    }
    if (value2) {
      setEmail(value2);
    }
  }, []);

  const handleSubmit = async () => {
    if (checked) {
      Cookies.set("name", name, { expires: 7 });
      Cookies.set("email", email, { expires: 7 });
    }

    try {
      const payload = {
        name: name,
        email: email,
        content: comment,
      };
      const { data } = await axios.post(
        `${serverUrl}/postComment/${props.blogId}`,
        payload
      );

      // Clear form inputs after successful submission
      setName("");
      setEmail("");
      setComment("");
      setChecked(false);

      // Set toast message and show toast
      setToastMessage("Comment posted successfully!");
      setToastVisible(true);

      // Hide toast after 3 seconds
      setTimeout(() => setToastVisible(false), 3000);
    } catch (error) {
      console.error(error);

      // Set error toast message and show toast
      setToastMessage("Error posting comment. Please try again.");
      setToastVisible(true);

      // Hide toast after 3 seconds
      setTimeout(() => setToastVisible(false), 3000);
    }
  };

  const getComments = async () => {
    try {
      if (props.blogId) {
        const { data } = await axios.get(
          `${serverUrl}/getApprovedComments/${props.blogId}?page=${page}&limit=3`
        );
        setTotalPage(data.totalPages);
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const groupImages = (images) => {
    const groupedImages = [];
    for (let i = 0; i < images.length; i += 2) {
      groupedImages.push(images.slice(i, i + 2));
    }
    return groupedImages;
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  function copyLinkToClipboard(url) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  }

  function shareOnWhatsApp(url, text) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;

    window.open(shareUrl, "_blank");
  }

  function shareLink(platform, url, text) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
        break;
      case "instagram":
        alert(
          "Instagram does not support direct link sharing via URL schemes. Use the Instagram app to share content."
        );
        return;
      default:
        alert("Unsupported platform");
        return;
    }

    // Debugging: log the share URL to ensure it's correct
    console.log("Share URL:", shareUrl);

    window.open(shareUrl, "_blank");
  }

  useEffect(() => {
    getComments();
  }, [page]);

  return (
    <div
      className={`w-full ${props.usedIn !== "admin" && "sm2:w-[88.6%]"} h-fit`}
    >
      <div className="sm2:hidden w-full h-[40px] rounded-[10px] bg-[#FAFAFAED] border border-[#CACACA] px-[9px] flex items-center mb-[24px]">
        <div className="w-full flex gap-[8px] items-center justify-center">
          <IoSearch className="text-[#88888C] text-[16px]" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[37px] font-[500] text-[14px] outline-none text-[#3C3C4399] bg-[#FAFAFAED] "
          />
        </div>
      </div>
      <img
        alt="blog card"
        src={props.coverimage}
        className="w-full h-auto aspect-video sm2:h-[331px] rounded-[20px] object-[initial]"
      />
      <div className="flex flex-wrap gap-[16px] mt-[10.08px] sm2:mt-[12px]">
        <div className="flex gap-[4px]  items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="flex items-center justify-center mb-[1px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33464 3.33366C3.33464 1.86033 4.52797 0.666992 6.0013 0.666992C7.47464 0.666992 8.66797 1.86033 8.66797 3.33366C8.66797 4.80699 7.47464 6.00033 6.0013 6.00033C4.52797 6.00033 3.33464 4.80699 3.33464 3.33366Z"
              fill="black"
            />
            <path
              d="M0.667969 9.33366C0.667969 7.56033 4.2213 6.66699 6.0013 6.66699C7.7813 6.66699 11.3346 7.56033 11.3346 9.33366V11.3337H0.667969V9.33366Z"
              fill="black"
            />
          </svg>
          <div className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px] ">
            {Parser(props?.author)}
          </div>
        </div>
        <div className="hidden sm2:flex gap-[4px] items-center justify-center">
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            className="flex items-center justify-center mb-[2px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.332 2.00033H11.6654V0.666992H10.332V2.00033H3.66536V0.666992H2.33203V2.00033H1.66536C0.932031 2.00033 0.332031 2.60033 0.332031 3.33366V14.0003C0.332031 14.7337 0.932031 15.3337 1.66536 15.3337H12.332C13.0654 15.3337 13.6654 14.7337 13.6654 14.0003V3.33366C13.6654 2.60033 13.0654 2.00033 12.332 2.00033ZM12.332 14.0003H1.66536V5.33366H12.332V14.0003Z"
              fill="black"
            />
          </svg>

          <p className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px]  whitespace-nowrap">
            {props.date}
          </p>
        </div>
        <div className="flex gap-[4px] items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="flex items-center justify-center mt-[2px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.332 0.333008H1.66536C0.932031 0.333008 0.332031 0.933008 0.332031 1.66634V13.6663L2.9987 10.9997H12.332C13.0654 10.9997 13.6654 10.3997 13.6654 9.66634V1.66634C13.6654 0.933008 13.0654 0.333008 12.332 0.333008Z"
              fill="black"
            />
          </svg>

          <div className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px] whitespace-nowrap">
            {props.comments} Comments
          </div>
        </div>
        <div className="flex gap-[4px] items-center justify-center">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            className="flex items-center justify-center"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.389 5.77219C17.3644 5.71664 16.7688 4.39547 15.4448 3.07148C13.6807 1.30734 11.4525 0.375 8.99999 0.375C6.54749 0.375 4.31929 1.30734 2.55515 3.07148C1.23117 4.39547 0.632806 5.71875 0.611009 5.77219C0.579026 5.84413 0.5625 5.92198 0.5625 6.0007C0.5625 6.07943 0.579026 6.15728 0.611009 6.22922C0.635618 6.28477 1.23117 7.60523 2.55515 8.92922C4.31929 10.6927 6.54749 11.625 8.99999 11.625C11.4525 11.625 13.6807 10.6927 15.4448 8.92922C16.7688 7.60523 17.3644 6.28477 17.389 6.22922C17.421 6.15728 17.4375 6.07943 17.4375 6.0007C17.4375 5.92198 17.421 5.84413 17.389 5.77219ZM8.99999 10.5C6.83577 10.5 4.94507 9.7132 3.37992 8.16211C2.73774 7.52344 2.19137 6.79519 1.75781 6C2.1912 5.20471 2.73759 4.47643 3.37992 3.83789C4.94507 2.2868 6.83577 1.5 8.99999 1.5C11.1642 1.5 13.0549 2.2868 14.6201 3.83789C15.2635 4.47633 15.8111 5.20459 16.2457 6C15.7387 6.94641 13.5302 10.5 8.99999 10.5ZM8.99999 2.625C8.33248 2.625 7.67996 2.82294 7.12494 3.19379C6.56993 3.56464 6.13735 4.09174 5.8819 4.70844C5.62645 5.32514 5.55962 6.00374 5.68984 6.65843C5.82007 7.31312 6.14151 7.91448 6.61351 8.38649C7.08551 8.85849 7.68688 9.17993 8.34156 9.31015C8.99625 9.44038 9.67485 9.37354 10.2915 9.11809C10.9083 8.86265 11.4354 8.43007 11.8062 7.87505C12.1771 7.32003 12.375 6.66751 12.375 6C12.3741 5.10518 12.0182 4.24728 11.3855 3.61454C10.7527 2.98181 9.89481 2.62593 8.99999 2.625ZM8.99999 8.25C8.55499 8.25 8.11997 8.11804 7.74996 7.87081C7.37995 7.62357 7.09156 7.27217 6.92126 6.86104C6.75097 6.4499 6.70641 5.9975 6.79323 5.56105C6.88004 5.12459 7.09433 4.72368 7.409 4.40901C7.72367 4.09434 8.12458 3.88005 8.56104 3.79323C8.9975 3.70642 9.4499 3.75097 9.86103 3.92127C10.2722 4.09157 10.6236 4.37996 10.8708 4.74997C11.118 5.11998 11.25 5.55499 11.25 6C11.25 6.59674 11.0129 7.16903 10.591 7.59099C10.169 8.01295 9.59673 8.25 8.99999 8.25Z"
              fill="black"
            />
          </svg>

          <p className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px] whitespace-nowrap">
            {props.views ? props.views : "216k"}
          </p>
        </div>
      </div>
      <div className="font-[600] text-[15.5px] sm2:text-[24px] mt-[12.88px] sm2:mt-[19px]">
        {Parser(props.title)}
      </div>

      <div className="flex flex-col gap-[12px] sm2:gap-[24px] mt-[12px] sm2:mt-[20px]">
        {props.layout &&
          props.layout?.map((data, index) => (
            <div key={index}>
              {data.subtitle && (
                <div className="font-[600] text-[15.5px] sm2:text-[24px] mt-[12.88px] sm2:mt-[19px]">
                  {Parser(data.subtitle)}
                </div>
              )}
              {data.story && (
                <div className="font-[400] sm2:font-[500] text-[14px] sm2:text-[18px]">
                  {Parser(data.story)}
                </div>
              )}
              {data.note && (
                <div id="note" className="flex gap-[13px]">
                  <div className="max-h-[300px] border-[1px] border-[#000000]"></div>
                  <div className="flex flex-col gap-[6px] sm2:gap-[8px]">
                    <p className="font-[600] text-[14px] sm2:text-[16px] italic">
                      {Parser(data.note)}
                    </p>
                    <div className="font-[700] text-[14px] sm2:text-[16px] leading-[21px] sm2:leading-[24px] flex flex-row items-center gap-[10px]">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="flex items-center justify-center"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33464 3.33366C3.33464 1.86033 4.52797 0.666992 6.0013 0.666992C7.47464 0.666992 8.66797 1.86033 8.66797 3.33366C8.66797 4.80699 7.47464 6.00033 6.0013 6.00033C4.52797 6.00033 3.33464 4.80699 3.33464 3.33366Z"
                          fill="black"
                        />
                        <path
                          d="M0.667969 9.33366C0.667969 7.56033 4.2213 6.66699 6.0013 6.66699C7.7813 6.66699 11.3346 7.56033 11.3346 9.33366V11.3337H0.667969V9.33366Z"
                          fill="black"
                        />
                      </svg>
                      {Parser(props.author)}
                    </div>
                  </div>
                </div>
              )}
              {data.points && Array.isArray(data.points) && !data.points.type && (
                <div className="flex flex-wrap  gap-x-[8px] sm2:gap-x-[18px] gap-y-[4px] sm2:gap-y-[18px]">
                  {data.points.map((d, index) => (
                    <div
                      className="flex gap-[8px] md:gap-[16px] items-center justify-center"
                      key={index}
                    >
                      <IoCheckmarkCircle className="text-[#0021f5] text-[20px] md:text-[26px]" />
                      <span className="text-[#2F2F2F] text-[16px] sm2:text-[18px] md:text-[20px] text-justify font-[600] w-full">
                        {Parser(d)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {data.points && Array.isArray(data.points.value) && data.points.type && (
                <div className="flex flex-wrap gap-x-[8px] sm2:gap-x-[18px] gap-y-[4px] sm2:gap-y-[18px]">
                  {data.points.value.map((d, index) => (
                    <div
                      className="flex gap-[8px] md:gap-[16px] items-center justify-center"
                      key={index}
                    >
                      <PointIcon type={data.points.type} index={index} />
                      <span className="text-[#2F2F2F] text-[16px] sm2:text-[18px] md:text-[20px] text-justify font-[600] w-full">
                        {Parser(d)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {data.also && (
                <div id="also" className="flex gap-[5px]">
                  <p className="font-[700] sm2:font-[600] text-[14px] sm2:text-[18px] italic whitespace-nowrap">
                    Also Read:
                  </p>
                  {console.log(data.also.id)}
                  <div
                    onClick={() => {
                      router.push(`/blogs/${data.also.id}`);
                    }}
                    className="font-[500] text-[14px] sm2:text-[18px] italic underline underline-offset-[3.3px] cursor-pointer"
                  >
                    {Parser(data.also.title)}
                  </div>
                </div>
              )}

              {data.image && (
                <img
                  alt="img"
                  src={data.image}
                  className="w-full h-[109px] sm2:h-[242px] rounded-[20px]  object-[initial] "
                />
              )}

              {/* {data.image &&
                groupImages(data.image).map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className={`flex w-full justify-between ${
                      data.image.length > 2 ? "mt-[20px]" : "mt-[0px]"
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
            </div>
          ))}
      </div>
      <div className="h-fit flex flex-col lg:flex-row gap-[14.38px] lg:gap-[0px] justify-start lg:justify-between mt-[13px] sm2:mt-[28px]">
        <div className="flex gap-[6px] sm2:gap-[15.81px] items-center lg:justify-center">
          <p className="text-[12px] sm2:text-[14.23px] font-[600] text-[#555555]">
            Tags:
          </p>
          <div className="flex gap-[3.69px] sm2:gap-[6.33px]">
            {props.tags.map((d, index) => (
              <div
                key={index}
                className="h-[22.31px] sm2:h-[33.65px] w-[76.76px] sm2:w-[117.63px] flex items-center justify-center border-[0.59px] sm2:border-[0.79px] border-[#9D9D9DED] sm2:border-[#555555] rounded-[4.15px] sm2:rounded-[6.33px]"
              >
                <span className="text-[9.34px] sm2:text-[14.23px] font-[400] sm2:font-[500] text-[#555555]">
                  {Parser(d)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-[8.12px] sm2:gap-[20px] items-center lg:justify-center">
          <p className="text-[12px] sm2:text-[14.23px] font-[600] text-[#555555]">
            Share:
          </p>
          <div className="flex gap-[10.54px] sm2:gap-[12px] cursor-pointer">
            <TiSocialFacebook
              className="text-[20px] text-[#555555]"
              onClick={() => {
                shareLink("facebook", fullUrl, props.title);
              }}
            />
            <FaLinkedin
              className="text-[20px] text-[#555555]"
              onClick={() => {
                shareLink("linkedin", fullUrl, props.title);
              }}
            />
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                shareLink("twitter", fullUrl, props.title);
              }}
            >
              <path
                d="M16.9873 17.4618C15.1319 14.7543 13.2748 12.0478 11.4184 9.34093C11.3942 9.30567 11.3719 9.26895 11.3417 9.22211C11.6669 8.84306 11.9904 8.46564 12.3143 8.0884C13.9976 6.12786 15.6811 4.16714 17.3644 2.20642C17.3749 2.19412 17.3832 2.18019 17.3926 2.16699H15.963C14.2159 4.2015 12.4686 6.23618 10.6936 8.30306C10.6722 8.26454 10.657 8.23145 10.6368 8.20197C9.27376 6.21376 7.91037 4.22591 6.54735 2.2377C6.53233 2.21564 6.52167 2.19068 6.50883 2.16699H1.66797C1.70992 2.23571 1.74863 2.3066 1.79402 2.37279C3.83992 5.3571 5.88636 8.34104 7.9328 11.3252C7.95414 11.3563 7.97457 11.3881 8.00441 11.4331C7.83822 11.6281 7.67112 11.825 7.50275 12.0211C5.60026 14.2366 3.69759 16.4519 1.79528 18.6676C1.75007 18.7205 1.71029 18.7781 1.66797 18.8337H3.09755C3.74497 18.0761 4.39113 17.3175 5.03982 16.561C6.19307 15.216 7.34795 13.8722 8.5021 12.5281C8.54424 12.479 8.58764 12.431 8.63791 12.3737C8.67046 12.4131 8.6994 12.4435 8.72291 12.4777C10.1538 14.5637 11.5842 16.65 13.0145 18.7365C13.0357 18.7675 13.0527 18.8013 13.0717 18.8337H17.9124C17.6042 18.3763 17.2991 17.9168 16.9873 17.4618ZM15.769 17.7976C15.1519 17.7981 14.5349 17.7949 13.9179 17.8007C13.803 17.8016 13.7323 17.7688 13.6652 17.6728C10.3511 12.918 7.03418 8.1649 3.71785 3.41157C3.68728 3.3678 3.65943 3.32205 3.6106 3.24718C4.21589 3.24718 4.78953 3.26997 5.36028 3.2385C5.69792 3.21987 5.88401 3.33869 6.07516 3.61393C9.31355 8.2763 12.5648 12.9298 15.8131 17.5853C15.8553 17.6457 15.8959 17.707 15.9513 17.788C15.8719 17.7924 15.8205 17.7974 15.769 17.7976Z"
                fill="#555555"
              />
            </svg>

            <BsWhatsapp
              className="text-[20px] text-[#555555]"
              onClick={() => {
                shareOnWhatsApp(fullUrl, props.title);
              }}
            />

            <FaRegCopy
              className="text-[20px] text-[#555555]"
              onClick={() => {
                copyLinkToClipboard(fullUrl);
              }}
            />
          </div>
        </div>
      </div>

      {/* Card*/}
      <div
        className={`${
          props.data?.team?.name ||
          props.data?.team?.quote ||
          props.data?.team?.title ||
          props.data?.team?.whatsapp ||
          props.data?.team?.facebook ||
          props.data?.team?.instagram ||
          props.data?.team?.linkedin ||
          props.data?.team?.gmail ||
          props.data?.team?.youtube
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
                  src={props.data?.team?.image}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1">
                {/* Name and Title */}
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {props.data?.team?.name}
                  </h2>
                  <p className="text-xl text-gray-500 italic">
                    {props.data?.team?.title}
                  </p>
                </div>
                {/* Social Icons */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <Link
                    target="_blank"
                    href={`https://wa.me/${props.data.team?.whatsapp}`}
                    className={` ${
                      props.data.team?.whatsapp?.length > 0 ? "block" : "hidden"
                    } p-2 bg-green-500 text-white rounded-full hover:bg-green-600`}
                  >
                    <FaWhatsapp size={20} />
                  </Link>
                  <Link
                    target="_blank"
                    href={`${props.data.team?.facebook}`}
                    className={` ${
                      props.data.team?.facebook?.length > 0 ? "block" : "hidden"
                    } p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700`}
                  >
                    <FaFacebook size={20} />
                  </Link>
                  <Link
                    target="_blank"
                    href={`${props.data.team?.instagram}`}
                    className={` ${
                      props.data.team?.instagram?.length > 0
                        ? "block"
                        : "hidden"
                    } p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700`}
                  >
                    <BsInstagram size={20} />
                  </Link>
                  <Link
                    target="_blank"
                    href={`${props.data.team?.linkedin}`}
                    className={` ${
                      props.data.team?.linkedin?.length > 0 ? "block" : "hidden"
                    } p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600`}
                  >
                    <BsLinkedin size={20} />
                  </Link>
                  <Link
                    target="_blank"
                    href={`mailto:${props.data.team?.gmail}`}
                    className={` ${
                      props.data.team?.gmail?.length > 0 ? "block" : "hidden"
                    } p-2 bg-red-500 text-white rounded-full hover:bg-red-600`}
                  >
                    <MdEmail size={20} />
                  </Link>
                  <Link
                    target="_blank"
                    href={`${props.data.team?.youtube}`}
                    className={` ${
                      props.data.team?.youtube?.length > 0 ? "block" : "hidden"
                    } p-2 bg-red-600 text-white rounded-full hover:bg-red-700`}
                  >
                    <BsYoutube size={20} />
                  </Link>
                </div>
                {/* Quote */}
                <div className="mb-6">
                  <p className="text-xl text-gray-600 italic">
                    {props.data?.team?.quote}
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

      {props.previous && props.next ? (
        <div className="sm2:hidden flex justify-between items-center mt-[23.43px]">
          <p
            className="font-[600] text-[14px] text-[#335BF5]"
            onClick={() => {
              router.push(`/blogs/${props.previous.id}`);
            }}
          >
            Previous
          </p>
          <p
            className="font-[600] text-[14px] text-[#335BF5]"
            onClick={() => {
              router.push(`/blogs/${props.next.id}`);
            }}
          >
            Next
          </p>
        </div>
      ) : props.previous ? (
        <div className="sm2:hidden flex justify-between items-center mt-[23.43px]">
          <p
            className="font-[600] text-[14px] text-[#335BF5]"
            onClick={() => {
              router.push(`/blogs/${props.previous.id}`);
            }}
          >
            Previous
          </p>
        </div>
      ) : props.next ? (
        <div className="sm2:hidden flex justify-between items-center mt-[23.43px]">
          <p
            className="font-[600] text-[14px] text-[#335BF5]"
            onClick={() => {
              router.push(`/blogs/${props.next.id}`);
            }}
          >
            Next
          </p>
        </div>
      ) : null}

      <div className="hidden sm2:flex flex-col gap-[16px] mt-[40px]">
        <div className="w-full border border-[#EDEDED]"></div>
        {props.previous && props.next ? (
          <div className="flex justify-between">
            <div
              className="flex flex-col justify-start"
              onClick={() => {
                router.push(`/blogs/${props.previous.id}`);
              }}
            >
              <p className="font-[600] text-[16px] text-[#335BF5] leading-[24px]">
                Previous
              </p>
              <div className="font-[600] text-[18px] text-[#000000] leading-[27px] mr-[10px]">
                {Parser(props.previous.title)}
              </div>
            </div>
            <div className="h-[64px] border-[1px] border-[#EDEDED]"></div>
            <div
              className="flex flex-col items-end"
              onClick={() => {
                router.push(`/blogs/${props.next.id}`);
              }}
            >
              <p className="font-[600] text-[16px] text-[#335BF5] leading-[24px]">
                Next
              </p>
              <div className="font-[600] text-[18px] text-[#000000] leading-[27px] ml-[10px]">
                {Parser(props.next.title)}
              </div>
            </div>
          </div>
        ) : props.previous ? (
          <div
            className="flex flex-col justify-start"
            onClick={() => {
              router.push(`/blogs/${props.previous.id}`);
            }}
          >
            <p className="font-[600] text-[16px] text-[#335BF5] leading-[24px]">
              Previous
            </p>
            <div className="font-[600] text-[18px] text-[#000000] leading-[27px] mr-[10px]">
              {Parser(props.previous.title)}
            </div>
          </div>
        ) : props.next ? (
          <div
            className="flex flex-col justify-start"
            onClick={() => {
              router.push(`/blogs/${props.next.id}`);
            }}
          >
            <p className="font-[600] text-[16px] text-[#335BF5] leading-[24px]">
              Next
            </p>
            <div className="font-[600] text-[18px] text-[#000000] leading-[27px] mr-[10px]">
              {Parser(props.next.title)}
            </div>
          </div>
        ) : null}

        <div className="w-full border border-[#EDEDED]"></div>
      </div>
      {recentPosts && (
        <div className="sm2:hidden mt-[12px] flex flex-col gap-[10px]">
          {recentPosts.map((d, i) => (
            <RecentPostcard
              id={d._id}
              key={i}
              img={d.coverimage}
              title={d.title}
              date={d.date}
            />
          ))}
        </div>
      )}

      {props.usedIn !== "admin" && (
        <>
          <div className="flex flex-col gap-[0px] sm2:gap-[8.69px] mt-[35px] sm2:mt-[28px] sm2:pb-[7.25px]">
            <p className="font-[600] text-[16px] sm2:text-[20px] leading-[19.2px] sm2:leading-0">
              Comments
            </p>
            <p className="font-[400] text-[12px] sm2:text-[14px] text-[#555555] leading-[18px]  sm2:leading-0">
              {`${data.totalComments} Comments`}
            </p>
          </div>
          {data.comments && <CommentSection comments={data.comments} />}
          <div className="flex items-center mt-[14.49px] overflow-x-auto w-full">
            <div className="flex flex-nowrap gap-[8.69px] items-center mx-auto">
              <div
                className="flex-shrink-0 w-[34.76px] h-[34.76px] rounded-full border-[0.72px] border-[#EAEAEA] flex items-center justify-center cursor-pointer"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
              >
                <MdKeyboardArrowLeft className="text-[14.47px] text-[#000]" />
              </div>

              {Array.from({ length: totalPage }, (_, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-[34.76px] h-[34.76px] rounded-full flex items-center justify-center cursor-pointer ${
                    page === index + 1
                      ? "bg-[#335BF5]"
                      : "border-[0.72px] border-[#EAEAEA]"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  <p
                    className={`font-[500] text-[13.04px] ${
                      page === index + 1 ? "text-[#FFF]" : "text-[#000]"
                    }`}
                  >
                    {index + 1}
                  </p>
                </div>
              ))}

              <div
                className="flex-shrink-0 w-[34.76px] h-[34.76px] rounded-full border-[0.72px] border-[#EAEAEA] flex items-center justify-center cursor-pointer"
                onClick={() => handlePageChange(Math.min(totalPage, page + 1))}
              >
                <MdKeyboardArrowRight className="text-[14.47px] text-[#000]" />
              </div>
            </div>
          </div>

          <div
            className="w-full bg-[#F2F2F2] rounded-[10px] px-[12px] sm2:px-[28px] py-[16px] sm2:py-[28px] flex flex-col mt-[36px] sm2:mt-[25.62px]
      mb-[35px] sm2:mb-[100px]"
          >
            <p className="font-[700] sm2:font-[600] text-[16px] sm2:text-[20px] text-black">
              Leave A Comment
            </p>
            <p className="font-[400] text-[12px] sm2:text-[18px] text-[#555555] mt-[6px] sm2:mt-[12px]">
              Your email address will not be published. Required fields are
              marked *
            </p>
            <div className="w-full flex flex-col gap-[16px] sm2:gap-[0px] sm2:flex-row sm2:justify-between mt-[10px] sm2:mt-[28px]">
              <div className="flex flex-col gap-[4px] sm2:gap-[12px] w-full sm2:w-[48.10%]">
                <p className="font-[600] sm2:font-[500] text-[14px] sm2:text-[18px]">
                  Name
                </p>
                <div className="w-full h-[48px] bg-[#fff] border border-[#9D9D9D] rounded-[8px] px-[16px]">
                  <input
                    type="text"
                    className="w-full h-full  bg-[#FFF] outline-none font-[400] text-[18px] text-[#555555]"
                    placeholder="Name*"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[4px] sm2:gap-[12px] w-full sm2:w-[48.80%]">
                <p className="font-[600] sm2:font-[500] text-[14px] sm2:text-[18px]">
                  Email
                </p>
                <div className="w-full h-[48px] bg-[#fff] border border-[#9D9D9D] rounded-[8px] px-[16px]">
                  <input
                    type="email"
                    className="w-full h-full  bg-[#FFF] outline-none font-[400] text-[18px] text-[#555555]"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[4px] sm2:gap-[12px] w-full mt-[16px] sm2:mt-[20px]">
              <p className="font-[600] sm2:font-[500] text-[14px] sm2:text-[18px]">
                Comment
              </p>
              <div className="w-full h-[110px] bg-[#fff] border border-[#9D9D9D] rounded-[8px] px-[16px] py-[10px]">
                <textarea
                  type="text"
                  className="w-full h-full  resize-none bg-[#FFF] outline-none font-[400] text-[18px] text-[#555555]"
                  placeholder="Write Comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-[4px] items-center mt-[9px] sm2:mt-[20px]">
              <input
                type="checkbox"
                className="w-[12px] h-[12px] border border-[#555555] bg-[#F2F2F2]"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <p className="font-[400] text-[14px] sm2:text-[18px] text-[#555555]">
                Save my name, email in this browser for the next time I comment
              </p>
            </div>
            {email && comment && name ? (
              <div
                className="w-[163px] sm2:w-[196px] h-[42px] sm2:h-[48px] rounded-[24px] bg-[#335BF5] flex items-center justify-center mt-[17px] cursor-pointer"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <p className="font-[500] text-[14px] sm2:text-[18px] text-[#FFF]">
                  Posts comment
                </p>
              </div>
            ) : (
              <div className="w-[163px] sm2:w-[196px] h-[42px] sm2:h-[48px] rounded-[24px] bg-[rgba(51,91,245,0.42)]  flex items-center justify-center mt-[17px] cursor-not-allowed">
                <p className="font-[500] text-[14px] sm2:text-[18px] text-[#FFF]">
                  Post comment
                </p>
              </div>
            )}
            {toastVisible && (
              <Toast text={toastMessage} visible={toastVisible} />
            )}
          </div>
        </>
      )}
      <div
        className={` ${
          props.data.faqdata?.faq?.length > 0 ? "flex" : "hidden"
        }  w-full flex-col pt-[50px] pb-[84px]`}
      >
        <p className=" font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
          {props.data.faqdata?.faq?.length > 0 && "Frequently Asked Questions"}
        </p>
        <div className="overflow-y-scroll text-justify">
          {props.data.faqdata?.faq?.length > 0 &&
            props.data.faqdata?.faq?.map((faq, index) => (
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
    </div>
  );
};

export default FullBlog;
