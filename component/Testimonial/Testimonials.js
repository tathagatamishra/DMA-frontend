"use client";
import React, { useEffect, useState } from "react";
import { isIOS } from "react-device-detect";
import SidebarFab from "../UI/SidebarFab";
import Fab from "../UI/Fab";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { serverUrl } from "@/config";
import Parser from "../UI/Parser";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

// Utility function to convert any YouTube URL to embed format
const convertToEmbedUrl = (url) => {
  if (!url) return "";
  
  // Handle already embedded URLs
  if (url.includes('embed')) {
    return url;
  }

  // Extract video ID from different YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([^#&?]*).*/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^#&?]*).*/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^#&?]*).*/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return url; // Return original URL if no match found
};

const Testimonials = ({ testimonialData: providedData, usedIn }) => {
  // States for UI components
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [show, setShow] = useState(false);

  // State for testimonial data
  const [testimonialData, setTestimonialData] = useState(providedData || null);
  const [loading, setLoading] = useState(!providedData);

  // console.log(testimonialData);

  useEffect(() => {
    setShow(true);

    // Only fetch data if not provided (i.e., not in admin preview)
    if (!providedData) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${serverUrl}/getTestimonial`);
          setTestimonialData(response.data.testimonialData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching testimonial data:", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [providedData]);

  // Update testimonialData when providedData changes (for live preview)
  useEffect(() => {
    if (providedData) {
      setTestimonialData(providedData);
    }
  }, [providedData]);

  if (loading) {
    return <div className="text-center mt-20">Loading testimonials...</div>;
  }

  if (!testimonialData) {
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load testimonials.
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col items-center overflow-y-scroll overflow-x-hidden ${
        isIOS ? "pb-[60px]" : "pb-[0px]"
      }`}
    >
      {/* Only show these components if not in admin preview */}
       
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
          backgroundImage: `url('${testimonialData.hero?.image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-fit h-fit rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms] px-[15px] py-[5px]">
            <p className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(testimonialData.hero?.tag || "Customer Love")}
            </p>
          </button>
          <p
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0 ${
              show ? "opacity-100" : "opacity-0"
            } duration-500 animate-fade-in`}
          >
            {Parser(testimonialData.hero?.heading)}
          </p>
          <div
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px] block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(testimonialData.hero?.description)}
          </div>
        </div>
      </div>


 {/* Client Videos Section */}
 <div className="container mx-auto px-4 md:px-16 py-8">
        <div className="text-center mb-8">
          <h2 className="font-semibold text-3xl sm:text-1xl lg:text-[32px] leading-tight sm:leading-[48px]  xsm:text-[30px] text-[20px]">{Parser(testimonialData.client?.heading || "Client Feedback")}</h2>
         
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-13 lg:gap-20 justify-items-center">
          {testimonialData?.client?.video.map((video, index) => {
            const embedUrl = convertToEmbedUrl(video);
            return (
              <div
                key={index}
                className="w-full max-w-md bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  {embedUrl && (
                    <iframe
                      src={embedUrl}
                      title={`Client Testimonial Video ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                {/* <div className="p-4">
                  <h3 className="text-center text-gray-600 text-sm">
                    Client Testimonial {index + 1}
                  </h3>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Section */}
      <div className="container mx-auto px-4 md:px-16 py-8">
        <div className="text-center mb-8">
          <h2 className="font-semibold text-3xl sm:text-1xl lg:text-[32px] leading-tight sm:leading-[48px]  xsm:text-[30px] text-[20px]">{Parser(testimonialData.service?.heading || "Our Services")}</h2>
         
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-13 lg:gap-20 justify-items-center">
          {testimonialData?.service?.video.map((video, index) => {
            const embedUrl = convertToEmbedUrl(video);
            return (
              <div
                key={index}
                className="w-full max-w-md bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  {embedUrl && (
                    <iframe
                      src={embedUrl}
                      title={`Service Video ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                {/* <div className="p-4">
                  <h3 className="text-center text-gray-600 text-sm">
                    Service Testimonial {index + 1}
                  </h3>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>

     

      {/* Only show footer if not in admin preview */}
      {usedIn !== "admin" && <Footer />}
    </div>
  );
};

export default Testimonials;
