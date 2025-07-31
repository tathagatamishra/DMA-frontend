"use client";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import fullblog1 from "@/component/assets/fullblog1.jpeg";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { IoMdPlay } from "react-icons/io";
import { isIOS } from "react-device-detect";
import Parser from "../UI/Parser";
import axios from "axios";
import { serverUrl } from "@/config";
import BlogNavigation from "../UI/BlogNavigation";
import Link from "next/link";
import SidebarFab from "../UI/SidebarFab";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";
import Fab from "../UI/Fab";

const Founder = ({ founderData, usedIn}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState([])
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [showRequestCallback, setShowRequestCallback] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/BHACKCNDMW8/maxresdefault.jpg`;

  const recentPost = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getAllBlogs?limit=4&page=1`);
      // console.log(data.blogs)
      setRecentBlogs(data.blogs)
      return data.blogs;
    } catch (error) {
      console.log(error);
    }
  }
  let ids = {}
  let titles = {}
  let indices = {}
  
  recentBlogs.map((item, i) => {
      ids[i] = item._id
      titles[i] = item.title
      indices[i] = i
  })

  const [aboutvideoUrl, setAboutVideoUrl] = useState("");

  useEffect(() => {
    const data = founderData?.main?.url || "";

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
  }, [founderData]);

  // console.log(aboutvideoUrl)

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };
  useEffect(() => {
    setShow(true);
    recentPost()
  }, []);

  const SocialIcon = ({ Icon , url }) => (
    <Link target="blank" href={`${url}`} className={`${url.length > 0 ? "block" : "hidden"} h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center`}>
      <Icon  className="text-lg sm:text-xl text-[#335BF5]" /> 
    </Link>
  );
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
        className="w-full min-h-[195px] md:min-h-[335px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative pb-[16px]"
        style={{
          backgroundImage: founderData.hero?.image
            ? `url(${founderData.hero?.image})`
            : `url('/About.png')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[33px]">
          <button className="z-10 w-fit h-fit rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms] px-[15px] py-[5px]">
            <span className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(founderData?.hero?.tag)}
            </span>
          </button>
          <span
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(founderData?.hero?.heading)}
          </span>
          <span
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px]  block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(founderData?.hero?.description)}
          </span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-[81px] lg:px-[130px] pt-8 sm:pt-[66px] pb-10 sm:pb-[80px]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12">
          {/* Main Content Section */}
          <div className="w-full lg:w-[62%] flex flex-col">
            <h1 className="font-semibold text-2xl sm:text-1xl lg:text-[32px] leading-tight sm:leading-[48px]  xsm:text-[24px] text-[20px]">
              {Parser(founderData?.main?.title)}
            </h1>

            <span className="font-medium   leading-relaxed mt-3 sm:mt-[12px] text-justify  xsm:text-[24px] text-[12px] ">
              {Parser(founderData?.main?.description)}
            </span>

            {/* Video/Thumbnail Section */}
            <div className="w-full h-[250px] sm:h-[350px] md:h-[469px] rounded-[20px] mt-6 sm:mt-[32px]">
              <iframe
                width="100%"
                height="100%"
                className="rounded-[14px]"
                src={aboutvideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* <div className="relative w-full h-full">
                  <img
                    alt="thumbnail"
                    src={thumbnailUrl}
                    className="h-full w-full rounded-[20px] object-cover"
                  />
                  <button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-[#335BF5]"
                    onClick={handlePlayButtonClick}
                  >
                    <IoMdPlay className="text-white text-lg sm:text-xl" />
                  </button>
                </div> */}
            </div>

            {/* Recent Posts Section */}
            {/* <div className="mt-8 sm:mt-[40px]">
              <h2 className="font-semibold text-xl sm:text-[20px] leading-[30px]   xsm:text-[24px] !text-[20px]">
                Recent Blogs
              </h2>
              <div className="hidden sm:flex flex-col gap-4 mt-4">
                <div className="border-t border-[#EDEDED]" />
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm sm:text-base text-[#335BF5]">
                      Previous
                    </span>
                    <p className="font-semibold text-base sm:text-lg text-black">
                      How to choose right customer
                    </p>
                  </div>
                  <div className="hidden sm:block h-16 border-l border-[#EDEDED]" />
                  <div className="flex flex-col items-end">
                    <span className="font-semibold text-sm sm:text-base text-[#335BF5]">
                      Next
                    </span>
                    <p className="font-semibold text-base sm:text-lg text-black text-right">
                      How to choose right customer
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#EDEDED]" />
              </div>
            </div> */}
            {
             
             indices>0 && <BlogNavigation ids={ids} titles={titles} indices={indices}/>
            }
          </div>

          {/* Founder Card Section */}
          <div className="w-full lg:w-[30.8%] flex flex-col gap-8 sm:gap-[40px]">
            <div className="w-full border border-[#C3C3C3] rounded-[20px] p-4 sm:p-5">
              <img
                alt="Founder"
                src={founderData?.founderCard?.image}
                className="w-full h-[180px] sm:h-[230px] object-contain rounded-[16px]"
              />
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="font-semibold text-xl sm:text-2xl  xsm:text-[30px] !text-[25px]">
                  {Parser(founderData?.founderCard?.name)}
                </h3>
                <span className="font-medium  sm:text-2xl mt-1 xsm:text-[25px] text-[20px]">
                  {Parser(founderData?.founderCard?.status)}
                </span>
              </div>
              <div className="flex justify-center gap-2 sm:gap-3 mt-2 ">
                <SocialIcon Icon={FaInstagram} url={founderData.founderCard?.instagram} />
                <SocialIcon Icon={HiOutlineMail} url={founderData.founderCard?.mail}/>
                <SocialIcon Icon={AiOutlineFacebook} url={founderData.founderCard?.facebook} />
                <SocialIcon Icon={FaXTwitter} url={founderData.founderCard?.twitter} />
                <SocialIcon Icon={FaLinkedin} url={founderData.founderCard?.linkedin}/>
                <SocialIcon Icon={FaYoutube} url={founderData.founderCard?.youtube}/>
              </div>
              <span className="font-medium  sm:text-lg text-center mt-2  xsm:text-[30px] text-[15px]">
                {Parser(founderData?.founderCard?.message)}
              </span>
            </div>

            {/* Let's Talk Section */}
            <div
              className="w-full h-fit bg-cover bg-center rounded-[12px] sm2:rounded-[20px] flex pl-[16px] sm2:pl-[12px] md:pl-[24px] pt-[41px] sm2:pt-[66px] pb-[29px] sm2:pb-[30.54px]"
              style={{
                backgroundImage: `url('/ads.png')`,
              }}
            >
              <div className="flex flex-col gap-[22px] sm2:gap-[37px] md:gap-[57px]">
                <div className="flex flex-col">
                  <p className="font-[700] text-[32px] sm2:text-[26px] md:text-[30px] md4:text-[32px] text-[#FFF]">
                    Let's Talk
                  </p>
                  <p className="font-[600] text-[16px] sm2:text-[14px] md:text-[16px] md4:text-[18px] text-[#FFF]">
                    If you have project,
                    <br />
                    contact us!
                  </p>
                </div>
                <div className="h-[36px] sm2:h-[45px] md:h-[50px] md4:h-[52px] w-[129px] sm2:w-[140px] md:w-[160px] md4:w-[198px] rounded-[37px] flex items-center justify-center bg-[#FFF]">
                  <p className="font-[700] sm2:font-[600] md:font-[700] text-[14px] sm2:text-[16px] md4:text-[18px]">
                    Learn Now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Founder;
