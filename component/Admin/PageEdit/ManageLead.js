"use client";
import React, { useEffect, useState } from "react";
import { getCookie, serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";

export default function ManageRequest() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
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

  const getRequests = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getLeadByType?type=Lead`);
      setRequests(data?.requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
    console.log(requests)
  }, []);

  const handleMarkAsResponded = async (id) => {
    try {
      const response = await axios.put(`${serverUrl}/markResponded/${id}`);
      if (response.data.status) {
        setRequests(requests.map(req => 
          req._id === id ? { ...req, responded: true } : req
        ));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while trying to mark the request as responded.");
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="DOWNLOAD PDF REQUESTS" />

      <div className="AdminContainer">
        <div className="AdminForm">
          <div className="AdminEditCard !p-[20px]">
            <p className="flex items-center gap-[15px]">
              Total Requests{" "}
              <span className="text-[#125dff] border rounded-[6px] px-[12px] py-[6px]">
                {requests.length}
              </span>
            </p>
          </div>

          <div className="AdminEditCard !gap-0 !py-[20px]">
            {requests.map((req, index) => (
              <div key={index} className="border-b border-t smd:p-[20px] sm:p-[15px] p-[10px]">
                <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between gap-[10px] mb-[10px]">
                  <p className="font-[600] smd:text-[18px] sm:text-[16px] text-[14px]">{req.type} Request</p>
                  <span className="text-[#737373] smd:text-[14px] text-[12px]">{new Date(req.createdAt).toLocaleString()}</span>
                </div>
                <p className="mb-[5px]"><strong>Name:</strong> {req.name}</p>
                {req.email && <p className="mb-[5px]"><strong>Email:</strong> {req.email}</p>}
                {req.phone && <p className="mb-[5px]"><strong>Phone:</strong> {req.phone}</p>}
                {req.pdfName && <p className="mb-[5px]"><strong>Pdf:</strong> {req.pdfName}</p>}
                {req.subject && <p className="mb-[5px]"><strong>Subject:</strong> {req.subject}</p>}
                {req.problem && <p className="mb-[5px]"><strong>Problem:</strong> {req.problem}</p>}
                {req.message &&<p className="mb-[10px]"><strong>Message:</strong> {req.message}</p>}
                {/* <div className="flex items-center justify-between">
                  <p className={`font-[600] ${req.responded ? 'text-green-500' : 'text-red-500'}`}>
                    {req.responded ? 'Responded' : 'Not Responded'}
                  </p>
                  {!req.responded && (
                    <AdminBtn
                      text="Mark as Responded"
                      width={windowWidth < 768 ? "120px" : "150px"}
                      height="40px"
                      fontSize={windowWidth < 768 ? "12px" : "14px"}
                      onClick={() => handleMarkAsResponded(req._id)}
                    />
                  )}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}