"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios';

import AdminNav from "../AdminUi/AdminNav";
import Header from "@/component/Header/Header";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import { serverUrl } from "@/config";

const EditHeader = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [headerData, setHeaderData] = useState({
    dataType: "header",
    hero: {
      number: "",
      email: "",
    },
  });

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

  useEffect(() => {
    getHeader();
  }, []);

  const handleInputChange = (field, value) => {
    setHeaderData((prevData) => ({
      ...prevData,
      hero: {
        ...prevData.hero,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editHeader`, headerData);
       getHeader();
       alert("Header detail updated")
       setTimeout(() => {
        window.location.reload()
       }, 2000);
    } catch (error) {
      console.error("Update Error:", error.response ? error.response.data : error.message);
    }
  };

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getHeader`);
      setHeaderData(data.headerData);
    } catch (error) {
      console.error("Fetch Error:", error.response ? error.response.data : error.message);
    }
  };

  

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="EDIT HEADER" />
      <div className="AdminContainer">
      {windowWidth > 800 && (
          <div className="AdminPreview">
            <Header headerData={headerData} />
          </div>
        )}

        <div className="AdminForm">
          <AdminInput
            label="Number"
            className="w-full"
            type="input"
            value={headerData.hero.number}
            onChange={(e) => handleInputChange("number", e.target.value)}
          />
          <AdminInput
            label="Email"
            className="w-full"
            type="input"
            value={headerData.hero.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          
          <AdminBtn
            text="save"
            className="w-full flex flex-row justify-end"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditHeader;