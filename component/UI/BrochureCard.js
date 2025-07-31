import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "@/config";
import Parser from "./Parser";
import CenterModal from "../Modal/CenterModal";

const BrochureCard = ({ brochure }) => {
  const [brochureData, setBrochureData] = useState();
  const [showLeadGen, setShowLeadGen] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [openPdf, setOpenPdf] = useState("");
  const [formData, setFormData] = useState({
    type: "Lead",
    name: "",
    email: "",
    phone: "",
    pdfName: pdfName,
  });
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    const fileName = getFileName(brochureData.url);
    console.log(fileName);
    setPdfName(fileName);
    setShowLeadGen(true);
    setOpenPdf(brochureData.url);

    // Open PDF in new window
    // window.open(pdf, "_blank");
  };

  useEffect(() => {
    setBrochureData(brochure);
    setPdfName;
  }, [brochure]);

  // const getPdf = async () => {
  //   window.open(brochureData.url, "_blank", "noopener,noreferrer");
  // };

  const getBrochure = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getBrochure`);
      setBrochureData(data.brochureData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrochure();
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row h-fit md:h-[263px]">
      <div
        className="h-fit md:h-full w-full md:w-[72%] md:rounded-l-[14px] bg-cover pl-[20px] md:pl-[50px] pr-[20px] pb-[16px] md:pb-[0px] flex  flex-col items-center md:items-start relative overflow-hidden"
        style={{
          backgroundImage: brochureData?.image
            ? `url(${brochureData?.image})`
            : `url('/footer1.jpeg')`,
          backgroundPosition: "md:center calc(20% - 10px)",
        }}
      >
        <div className="bg-[#00000059] w-full h-full absolute left-0 top-0 z-0" />
        <p className="z-[1] font-[700] text-[20px] md:text-[68px] text-[#FFF] mt-[16px] md:mt-[30px] md22:mt-[45px] leading-[28px]">
          {Parser(brochureData?.heading ? brochureData.heading : "Our Profile")}
        </p>
        <p className="z-[1] font-[500] text-justify md:font-[600] text-[14px] md:text-[18px] text-[#FFF] mt-[12px] md:mt-[28px] md22:mt-[38px] leading-[28px]">
          {Parser(
            brochureData?.description
              ? brochureData.description
              : "In today's business environment, the world demands quality professional services that are provided in a timely and cost-effective manner. We, at Dikshant Malhotra & Co, believe in putting our client's needs squarely in front at all times."
          )}
        </p>
      </div>

      <div className="h-[156px] md:h-full w-full md:w-[28%] bg-[#335BF5] flex items-center flex-col pt-[18px] md:pt-[49px] md:rounded-r-[14px]">
        <p className="max-w-[198px] font-[600] text-[18px] md:text-[28px] leading-[27px] md:leading-[42px] text-[#FFF] text-center">
          {Parser(brochureData?.title ? brochureData.title : "Brochure")}
        </p>
        <button
          className="w-[113px] md:w-[150px] h-[37px] md:h-[48px] bg-[#FFF] flex items-center justify-center mt-[13px] md:mt-[29px] rounded-[28.04px] md:rounded-[37px] hover:scale-[103%] transition-[300ms] cursor-pointer font-[700] text-[#335BF5] text-[13px] md:text-[18px]"
          onClick={() => {
            handleClick();
          }}
        >
          Download
        </button>
      </div>
      <CenterModal
        onModal={showLeadGen}
        onClick={() => setShowLeadGen(false)}
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
  );
};

export default BrochureCard;
