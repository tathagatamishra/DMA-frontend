import React, { useEffect, useState } from "react";
import "../Style/Footer.css";
import SubscribeInput from "../UI/SubscribeInput";
import axios from "axios";
import { serverUrl } from "@/config";
import Parser from "../UI/Parser";


const Footer = () => {
  const [footerData, setFooterData] = useState({});

  const getImgUrl = (item) => {
    if (item !== undefined) {
      if (!item.startsWith("http://") && !item.startsWith("https://")) {
        item = "https://" + item;
      }
      let url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item}&size=256`;
      return url;
    }
  };

  const getFooterData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getFooter`);
      // console.log(data.footerData);
      setFooterData(data.footerData);
    } catch (error) {
      console.log(error);
    }
  };

  function openUrlInSameTab(url) {
    window.location.href = url;
  }

  function openUrlInNewTab(url) {
    window.open(url, '_blank');
  }

  useEffect(() => {
    getFooterData();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div
        className="relative w-full sm2:h-[235px] h-fit md:h-[591px] bg-cover bg-center flex justify-center items-start pt-[20px] pb-[78px] md:pb-[0px] md:pt-[134px]"
        style={{
          backgroundImage: `url(${
            footerData?.image ? footerData?.image : "/Services4.jpeg"
          })`,
        }}
      >
        <div
          className="absolute w-full h-full top-0 left-0 "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
        ></div>
        <div className="max-w-[768px] flex flex-col items-center justify-center gap-[17px] md:gap-[33px] z-10">
          <p className="px-[20px] font-[700] text-[18px] md:text-[42px] md4:text-[48px] text-[#FFF] text-center flex items-center justify-center">
            {Parser (footerData?.heading
              ? footerData?.heading
              : "Join us in creating a brighter future for your business everywhere")}
          </p>
          <p className="px-[10px] font-[400] text-[12px] md:text-[16px] md22:text-[18px] text-[#FFF] text-center flex items-center justify-center ">
            {Parser(footerData?.description
              ? footerData?.description
              : "Lorem ipsum dolor sit amet, consectetur adipiscing  hi siddhi elit. Suspendisse varius enim in eros elementum tristique.")}
          </p>
        </div>
      </div>

      <SubscribeInput footerData={footerData} />

      <div className="hidden md:flex w-full bg-[#FFFFFF] h-[338px] gap-[22px] md22:gap-[38px]  md4:gap-[60px] lg:gap-[100px] justify-center pt-[80px]">
        <div className="flex flex-col gap-[25px] w-[213px] mb-[17px]">
          <p className="text-[#252B42] text-[24px] font-[700]">
            {Parser(footerData?.contact?.heading
              ? footerData?.contact?.heading
              : "Get In Touch")}
          </p>
          <p className="text-[#737373] text-[14px] font-[500]">
            {Parser(footerData?.contact?.description
              ? footerData?.contact?.description
              : "the quick fox jumps over the lazy dog")}
          </p>

          <div className="flex gap-[20px] items-center">
            {footerData?.contact?.links?.map((link, index) => (
              <div key={index} className="w-fit relative cursor-pointer" onClick={() => {openUrlInNewTab(link)}}>
                <img
                  src={getImgUrl(link)}
                  alt="social-logo"
                  className="w-[30px] h-[30px] rounded-[10px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {footerData.firstSection && (
          <div className="flex flex-col gap-[20px]">
            <span className="font-[700] text-[24px] text-[#252B42]">
              {Parser(footerData.firstSection.heading)}
            </span>
            <div className="flex flex-col gap-[10px]">
              {footerData.firstSection.link.map((d,index) => (
                <span className="font-[600] text-[14px] text-[#737373] cursor-pointer" key={index} onClick={() => {openUrlInSameTab(d.url)}}>
                  {Parser(d.title)}
                </span>
              ))}
            </div>
          </div>
        )}
        {footerData.secondSection && (
          <div className="flex flex-col gap-[20px]">
            <span className="font-[700] text-[24px] text-[#252B42]">
              {Parser(footerData.secondSection.heading)}
            </span>
            <div className="flex flex-col gap-[10px]">
              {footerData.secondSection.link.map((d,i) => (
                <span key={i} className="font-[600] text-[14px] text-[#737373] cursor-pointer" onClick={() => {openUrlInSameTab(d.url)}}>
                  {Parser(d.title)}
                </span>
              ))}
            </div>
          </div>
        )}
        {footerData.thirdSection && (
          <div className="flex flex-col gap-[20px]">
            <span className="font-[700] text-[24px] text-[#252B42]">
              {Parser (footerData.thirdSection.heading)}
            </span>
            <div className="flex flex-col gap-[10px]">
              {footerData.thirdSection.link.map((d,i) => (
                <span key={i} className="font-[600] text-[14px] text-[#737373] cursor-pointer" onClick={() => {openUrlInSameTab(d.url)}}>
                  {Parser(d.title)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col h-fit px-[20px] py-[28px] md:hidden">
        <div className="flex justify-between">
          <p className="text-[#252B42] font-[700] text-[21.11px]">DMA</p>

          <div className="flex gap-[20px] items-center">
            {footerData?.contact?.links?.map((link, index) => (
              <div key={index} className="w-fit relative cursor-pointer" onClick={() => {openUrlInNewTab(link)}}>
                <img
                  src={getImgUrl(link)}
                  alt="social-logo"
                  className="w-[30px] h-[30px] rounded-[10px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[4px] mt-[17px]">
          <p className="text-[14px] font-[600] text-[#252B42] leading-[22.99px]">
            {Parser(footerData?.contact?.heading
              ? footerData?.contact?.heading
              : "Get In Touch")}
          </p>
          <p className="text-[12px] font-[500] text-[#737373]">
            {Parser(footerData?.contact?.description
              ? footerData?.contact?.description
              : "the quick fox jumps over the lazy dog")}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-[49px] gap-y-[20px] mt-[18px]">
          {footerData.firstSection && (
            <div className="flex flex-col">
              <span className="text-[14px] font-[600] text-[#252B42] leading-[22.99px]">
                {Parser(footerData.firstSection.heading)}
              </span>
              <div className="flex flex-col gap-[2px] mt-[8px]">
                {footerData.firstSection.link.map((d,i) => (
                  <span key={i} className="text-[12px] font-[500] text-[#737373] leading-[22.99px] cursor-pointer" onClick={() => {openUrlInSameTab(d.url)}}>
                    {Parser(d.title)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {footerData.secondSection && (
            <div className="flex flex-col">
              <span className="text-[14px] font-[600] text-[#252B42] leading-[22.99px]">
              {Parser(footerData.secondSection.heading)}
              </span>
              <div className="flex flex-col gap-[2px] mt-[8px]">
                {footerData.secondSection.link.map((d,i) => (
                  <span key={i} className="text-[12px] font-[500] text-[#737373] leading-[22.99px] cursor-pointer" onClick={() => {openUrlInSameTab(d.url)}}>
                    {Parser(d.title)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {footerData.thirdSection && (
            <div className="flex flex-col">
              <p className="text-[14px] font-[600] text-[#252B42] leading-[22.99px]">
              {Parser (footerData.thirdSection.heading)}
              </p>
              <div className="flex flex-col gap-[2px] mt-[8px]">
                {footerData.thirdSection.link.map((d,i) => (
                  <span key={i} className="text-[12px] font-[500] text-[#737373] leading-[22.99px] cursor-pointer" onClick={() => {openUrlInSameTab(d.url)}}>
                    {Parser(d.title)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[76px] bg-[#F2F2F2] flex items-center justify-center">
        <p className="text-[#737373] text-[14px] font-[600]">
          {Parser(footerData?.copyright
            ? footerData?.copyright
            : "Dikshant Malhotra & Associates & Co. © 2024-2025 | All Right Reserved")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
