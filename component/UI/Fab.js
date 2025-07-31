import React, { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { serverUrl } from "@/config";
import axios from "axios";
import Toast from "./Toast"; // Import your Toast component
import "../Style/Fab.css";

const Fab = ({ show, showRequestCallback, setShowRequestCallback,showRequestBrochure, setShowRequestBrochure }) => {
  const [activeLabel, setActiveLabel] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVisible, setToastVisible] = useState(false); // State for toast visibility

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

  const buttonLabels = [
    {
      icon: IoCallOutline,
      label: "Contact us",
      color: "#335BF5",
      position: "bottom-[230px]",
      hoverWidth: "180px",
      action: () => setShowRequestCallback(!showRequestCallback),
    },
    {
      icon: BsWhatsapp,
      label: "Whatsapp us",
      color: "#31f568",
      position: "bottom-[145px]",
      hoverWidth: "180px",
      action: () => {
        const phoneNumber = "+918826877471";
        const message = "Hello! I have a question about...";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
      },
    },
    {
      icon: FiDownload,
      label: "Download Brochure",
      color: "#335BF5",
      position: "bottom-[60px]",
      hoverWidth: "250px",
      action: async () => { setShowRequestBrochure(!showRequestBrochure)
      },
    },
  ];

  useEffect(() => {
    if (isHovering === null) {
      const labelCycle = setInterval(() => {
        setActiveLabel((prev) =>
          prev === null ? 0 : (prev + 1) % buttonLabels.length
        );
      }, 5000);

      return () => clearInterval(labelCycle);
    }
  }, [isHovering]);

  useEffect(() => {
    const mobileCycle = setInterval(() => {
      setActiveMobileIndex((prev) =>
        prev === null ? 0 : (prev + 1) % buttonLabels.length
      );
    }, 4000);

    return () => clearInterval(mobileCycle);
  }, []);

  const renderButton = (Button, index) => {
    const isCurrentlyHovered = isHovering === index;
    const isSmallScreen = windowWidth <= 280;

    return (
      <div
        key={index}
        style={{
          background: Button.color,
          width: isCurrentlyHovered
            ? Button.hoverWidth
            : isSmallScreen
            ? "40px"
            : "62px",
        }}
        className={`hidden sm:flex ${
          isSmallScreen ? "h-[40px]" : "h-[60px]"
        } rounded-l-[8.09px] items-center justify-center group
          border-l-[1px] border-t-[1px] border-b-[1px] border-[#FFF] 
          fabStyle fab-delay${index + 1}
          relative transition-all duration-300 ease-in-out
          hover:cursor-pointer`}
        onMouseEnter={() => {
          if (isHovering !== index) {
            setIsHovering(index);
            setActiveLabel(index);
          }
        }}
        onMouseLeave={() => setIsHovering(null)}
        onClick={Button.action}
      >
        <div
          className={`flex items-center justify-center ${
            isSmallScreen ? "w-[40px] text-[20px]" : "w-[62px] text-[38px]"
          } h-full`}
        >
          <Button.icon className="text-[#FFF]" />
        </div>
        {isCurrentlyHovered && (
          <div className="flex items-center h-full">
            <span
              className={`text-white whitespace-nowrap fabStyle fab-delay1 ${
                isSmallScreen ? "text-sm" : ""
              }`}
            >
              {Button.label}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderTextBanner = () => {
    if (activeLabel === null || isHovering !== null) return null;

    const activeButton = buttonLabels[activeLabel];

    return (
      <div
        className={`fixed right-[62px] ${activeButton.position} z-40 
          bg-white text-black px-4 py-2 rounded-l-[8px] 
          border border-gray-300 shadow-lg 
          transition-all duration-500 ease-in-out 
          animate-slide-in-right`}
      >
        {activeButton.label}
      </div>
    );
  };

  const renderMobileButton = (Button, index) => {
    const isActive = activeMobileIndex === index;
    const isSmallScreen = windowWidth <= 280;

    return (
      <div
        key={`mobile-${index}`}
        style={{
          background: Button.color,
          width: isActive ? Button.hoverWidth : isSmallScreen ? "32px" : "48px",
          transition: "all 0.3s ease-in-out",
        }}
        className={`sm:hidden ${
          isSmallScreen ? "h-[32px]" : "h-[47px]"
        } rounded-l-[6.35px] 
          flex items-center justify-center border-l-[1px] border-t-[1px] border-b-[1px] border-[#FFF]
          ${
            show
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform translate-x-10"
          } 
          duration-500 transition-all ease-out overflow-hidden`}
        onClick={Button.action}
      >
        <div
          className={`flex items-center ${
            isSmallScreen
              ? "min-w-[32px] text-[16px]"
              : "min-w-[48px] text-[26px]"
          } justify-center`}
        >
          <Button.icon className="text-[#FFF]" />
        </div>
        {isActive && (
          <span
            className={`text-white sm:text-red-50 ${
              isSmallScreen ? "text-xs" : "text-sm"
            } whitespace-nowrap pr-4 animate-slide-in-right-mobile`}
          >
            {Button.label}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="fixed right-0 pb-[35px] sm:pb-[52px] bottom-0 z-50 flex flex-col items-end gap-[25px] sm:gap-[25px]">
      {buttonLabels.map((Button, index) => (
        <React.Fragment key={index}>
          {renderButton(Button, index)}
          {renderMobileButton(Button, index)}
        </React.Fragment>
      ))}

      {windowWidth > 568 && renderTextBanner()}

      {/* Display the toast message */}
      {toastVisible && <Toast text={toastMessage} visible={toastVisible} />}
    </div>
  );
};

export default Fab;
