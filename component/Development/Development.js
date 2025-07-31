"use client";
import React, { useEffect, useState } from "react";
import SubscribeInput from "../UI/SubscribeInput";
import Marquee from "react-fast-marquee";
import { RxCross1 } from "react-icons/rx";
import DMA from "../assets/DMAlogo.png";
import Image from "next/image";
import axios from "axios";
import { serverUrl } from "@/config";
import "../Style/Dot.css";

const Development = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const scrollText = (
    <p className="animate-marquee font-[500] text-[12px] md:text-[14px] md22:text-[16px] text-[#FFF]">
      THIS SITE IS UNDER DEVELOPMENT &nbsp;&nbsp;| |&nbsp;&nbsp; WE WILL LIVE
      SOON &nbsp;&nbsp;| |&nbsp;&nbsp; ENTER YOUR EMAIL TO STAY TUNED
      &nbsp;&nbsp;| |&nbsp;&nbsp; THIS SITE IS UNDER DEVELOPMENT &nbsp;&nbsp;|
      |&nbsp;&nbsp; WE WILL LIVE SOON &nbsp;&nbsp;| |&nbsp;&nbsp; ENTER YOUR
      EMAIL TO STAY TUNED &nbsp;&nbsp;| |&nbsp;&nbsp; THIS SITE IS UNDER
      DEVELOPMENT &nbsp;&nbsp;| |&nbsp;&nbsp; WE WILL LIVE SOON &nbsp;&nbsp;|
      |&nbsp;&nbsp; ENTER YOUR EMAIL TO STAY TUNED &nbsp;&nbsp;| |&nbsp;&nbsp;
      THIS SITE IS UNDER DEVELOPMENT &nbsp;&nbsp;| |&nbsp;&nbsp; WE WILL LIVE
      SOON &nbsp;&nbsp;| |&nbsp;&nbsp; ENTER YOUR EMAIL TO STAY TUNED
      &nbsp;&nbsp;| |&nbsp;&nbsp; THIS SITE IS UNDER DEVELOPMENT &nbsp;&nbsp;|
      |&nbsp;&nbsp; WE WILL LIVE SOON &nbsp;&nbsp;| |&nbsp;&nbsp; ENTER YOUR
      EMAIL TO STAY TUNED &nbsp;&nbsp;| |&nbsp;&nbsp; THIS SITE IS UNDER
      DEVELOPMENT &nbsp;&nbsp;| |&nbsp;&nbsp; WE WILL LIVE SOON &nbsp;&nbsp;|
      |&nbsp;&nbsp; ENTER YOUR EMAIL TO STAY TUNED &nbsp;&nbsp;| |&nbsp;&nbsp;
    </p>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear any previous messages
    try {
      console.log(email);
      const response = await axios.post(`${serverUrl}/addBetaUser`, {
        email: email,
      });
      if (response.data.status) {
        setMessage("Subscribed successfully 😃");
        setEmail(""); // Clear the input field
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while trying to subscribe.");
    }
  };

  useEffect(() => {
    let timeoutId;

    if (showNotification) {
      timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // 30 seconds in milliseconds
    }

    return () => {
      clearTimeout(timeoutId); // Cleanup function to clear timeout
    };
  }, [showNotification]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between overflow-y-scroll overflow-x-hidden">
      {/* Header */}
      <div className="w-full flex flex-col">
        <Marquee className="w-full h-[58px] bg-[#335BF5] flex items-center justify-center overflow-hidden relative">
          {scrollText}
        </Marquee>
        <div className="w-full h-fit flex items-center justify-center pt-[30px] px-[20px] xsm1:px-[30px]">
          <Image
            alt="DMA logo"
            src={DMA}
            height={1080}
            width={1080}
            className="sm:h-[150px] h-[120px] w-auto object-contain"
          />
        </div>
      </div>

      {/* Body */}
      <div className="h-full w-full smd:px-[40px] px-[20px] relative flex flex-col items-center justify-center smd:gap-[50px] gap-[30px]">
        <div className="w-full flex flex-col items-center gap-[10px]">
          {/* <img alt="img" 
            src="https://media.giphy.com/media/HwBlFQZFcAoUcPHZdX/giphy.gif"
            className="h-[50px] w-auto"
          /> */}
          <div className="w-full flex flex-row items-center justify-center gap-[4px]">
            <img
              alt="img"
              src="https://media.giphy.com/media/jSKBmKkvo2dPQQtsR1/giphy.gif"
              className="h-[50px] w-auto"
            />
            <p className="w-full max-w-[600px] font-[700] smd:text-[30px] text-[20px] text-center">
              This Site Is Under Development
            </p>
            <img
              alt="img"
              src="https://media.giphy.com/media/jSKBmKkvo2dPQQtsR1/giphy.gif"
              className="h-[50px] w-auto"
            />
          </div>

          <div className="dot-pulse"></div>
        </div>

        <div
          className="relative bg-[#031D34] max-w-[986px] w-full h-fit rounded-[12px] smd:rounded-[14px] smd:px-[50px] px-[16px] smd:py-[40px] py-[20px] flex flex-col smd:flex-row justify-between smd:items-center items-start gap-[21px] smd:gap-[15px] border-[2px] border-[#FFF]"
          style={{ boxShadow: "1px 3px 12px 1px #00000040" }}
        >
          <p className="smd:w-[231px] w-[150px] h-full font-[700] text-[14px] smd:text-[24px] text-[#FFF]">
            Subscribe To Stay Tuned !
          </p>

          <form
            className="w-full smd:w-[70%] smd:max-w-[450px] h-[37.5px] smd:h-[50px] lg:h-[58px] rounded-[5px] border-[1.5px] border-[#E6E6E6] bg-[#F9F9F9] flex"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="subscribeInput text-[10.4px] smd:text-[14px] w-full px-2"
              required
            />

            <button
              type="submit"
              className="min-w-[80px] xsm1:min-w-[117px] h-full font-[400] text-[10.6px] smd:text-[14px] text-center text-white bg-[#335BF5] rounded-r-[5px] active:scale-[95%] transition-[200ms]"
              onClick={() => {
                setShowNotification(true);
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="w-full h-[90px] relative">
        {message && (
          <div className="message absolute z-[100] w-[260px] xssm:w-[311px] md2:w-[478px] h-[57px] md2:h-[60px] rounded-[20px] bg-[#000000B2] flex items-center justify-center">
            <p className="font-[500] text-[12px] md2:text-[16px] text-[#FFF]">
              Thank You! We Will Notify You Shortly.
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="w-full flex flex-col">
        <div className="w-full h-[89px] bg-[#F2F2F2] flex items-center justify-center relative">
          <p className="z-[1] text-[#737373] text-[14px] font-[600]">
            DMA All Right Reserved 2024
          </p>
          <p className="z-[0] font-[700] text-[128px] text-[#FFF] absolute right-0 hidden md:block">
            DMA
          </p>
        </div>

        <Marquee className="w-full h-[58px] bg-[#335BF5] flex items-center justify-center overflow-hidden relative">
          {scrollText}
        </Marquee>
      </div>
    </div>
  );
};

export default Development;
