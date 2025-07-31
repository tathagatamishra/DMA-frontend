"use client";
import React, { useEffect, useState } from "react";
import { getCookie, serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Letter from "@/component/NewsLetter/Letter";

export default function BetaUsers() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [windowWidth, setWindowWidth] = useState(0);

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

  const [subscriber, setSubscriber] = useState([""]);
  const [popup, setPopup] = useState(null);

  const getBetaUser = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getBetaUser`);
      console.log(data);
      setSubscriber(data.BetaUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBetaUser();
  }, []);

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(`${serverUrl}/editBetaUser`, {
        data: { email },
      });

      if (response.data.status) {
        setSubscriber(subscriber.filter((sub) => sub.email !== email));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while trying to delete the subscriber.");
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden  select-none">
      <AdminNav page="BETA USERS" />

      <div className="AdminContainer">
        <div className="AdminForm">
          <div className="AdminEditCard !p-[20px]">
            <p className="flex items-center gap-[15px]">
              Total Subscribers{" "}
              <span className="text-[#125dff] border rounded-[6px] px-[12px] py-[6px]">
                {subscriber.length}
              </span>
            </p>
          </div>

          <div className="AdminEditCard !gap-0 !py-[20px]">
            {subscriber.map((sub, index) => (
              <div key={index}>
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-t smd:pr-[20px] sm:pr-[10px] pr-0"
                >
                  <p className="smd:font-[600] font-[600] break-all smd:text-[18px] sm:text-[16px] xsm2:text-[14px] text-[12px] w-full smd:pl-[20px] pl-[10px] smd:pr-[30px] pr-[10px] !select-text flex sm:flex-row flex-col sm:justify-between justify-around sm:items-center gap-[10px]">
                    <span className="text-[#737373] smd:text-[14px] xsm2:text-[12px] text-[10px]">
                      {sub.subscribedAt}
                    </span>
                    {sub.email}
                  </p>

                  <div className="flex sm:flex-row flex-col items-center sm:gap-[20px] gap-[10px] border-l smd:pl-[20px] pl-[10px] py-[10px] h-full">
                    <AdminBtn
                      text="🗋"
                      message="copied"
                      width={windowWidth < 768 ? "30px" : "40px"}
                      height={windowWidth < 768 ? "30px" : "40px"}
                      fontSize={windowWidth < 768 ? "18px" : "22px"}
                      padding="0px"
                      onClick={() => {
                        navigator.clipboard.writeText(sub.email);
                      }}
                    />
                    <AdminBtn
                      text="✕"
                      width={windowWidth < 768 ? "30px" : "40px"}
                      height={windowWidth < 768 ? "30px" : "40px"}
                      fontSize={windowWidth < 768 ? "15px" : "18px"}
                      padding="0px"
                      btnColor="#f6dbdb"
                      onClick={() => {
                        setPopup(null);
                        setPopup(index);
                      }}
                    />
                  </div>
                </div>

                {popup === index && (
                  <div className="w-full h-fit flex flex-col gap-[10px] mb-[15px] mt-[10px] bg-white rounded-[15px]">
                    <p className="text-[#ff3636] pl-[2px]">
                      Are you sure you want to delete this?
                    </p>
                    <div className="flex gap-[10px]">
                      <AdminBtn text="Cancel" onClick={() => setPopup(null)} />
                      <AdminBtn
                        message="deleted"
                        text="Delete"
                        btnColor="#f6dbdb"
                        onClick={() => {
                          handleDelete(sub.email);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
