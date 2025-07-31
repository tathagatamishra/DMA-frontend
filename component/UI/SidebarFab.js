// SidebarFab.js
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { serverUrl } from "@/config";
import axios from "axios";
import Toast from "./Toast";  // Import the Toast component

const SidebarFab = ({ showRequestCallback, setShowRequestCallback }) => {
  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [toastConfig, setToastConfig] = useState({
       type: "success",
       text: "",
     });
     const [showToast, setShowToast] = useState(false);
  

    const handleSubmit = async () => {
      // Hide any previous toast before submitting
      setShowToast(false);
    
      try {
        // Create the payload to send to the server
        const payload = {
          type: "callback",
          name: sideBarName,
          phone: sideBarNo,
          message: sideBarMessage,
        };
    
        // Send the request to the server using axios
        const { data } = await axios.post(`${serverUrl}/createRequest`, payload);
    
        // Clear the form fields after successful submission
        setSideBarMessage("");
        setSideBarName("");
        setSideBarNo("");
    
    // Show success message and reset fields
    setToastConfig({
      type: "success",
      text: "Form submitted successfully!",
    });
    setShowToast(true); // Show success message immediately
    
        
      } catch (error) {
        setToastConfig({
          type: "error",
          text: "Failed to submit the form. Please try again.",
        });
        setShowToast(true); // Show error message immediately
      }
    };
    
    

  return (
    <div className="fixed right-[10px] pb-[35px] sm:pb-[52px] bottom-0 z-50">
      <div
        className="w-[260px] xsm2:w-[349px] h-[438px] bg-[#FFF] border-[0.79px] border-[#DDDDDD] rounded-[12px] flex flex-col px-[17.02px] pt-[28.25px] items-center"
        style={{ boxShadow: "0px 10.21px 14.92px 0px #00000012" }}
      >
        <div className="flex flex-row gap-[20px] xsm2:gap-[58.12px] items-center justify-center ml-[20px] xsm2:ml-[78px]">
          <p className="font-[700] text-[16px] leading-[21.92px] text-[#252B42]">
            Request Callback
          </p>
          <RxCross1
            className="text-[18px] cursor-pointer"
            onClick={() => {
              setShowRequestCallback(!showRequestCallback);
            }}
          />
        </div>
        <input
          type="text"
          className="w-full h-[42px] px-[15.7px] text-[14px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[30px] border-[0.79px] border-[#E8E8E8] bg-[#FAFAFA] mt-[24.26px]"
          placeholder="Your Name"
          value={sideBarName}
          onChange={(e) => {
            setSideBarName(e.target.value);
          }}
        />
        <input
          type="number"
          className="w-full h-[42px] px-[15.7px] text-[14px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[30px] border-[0.79px] border-[#E8E8E8] bg-[#FAFAFA] mt-[21.28px]"
          placeholder="Your Phone No."
          value={sideBarNo}
          onChange={(e) => {
            setSideBarNo(e.target.value);
          }}
        />
        <textarea
          type="text"
          className="w-full h-[151px] py-[17.76px] px-[15.76px] rounded-[9.42px] border border-[#E8E8E8] bg-[#FAFAFA] placeholder-[#18171D] text-[#18171D] text-[14px] font-[400] outline-none resize-none mt-[21.28px]"
          placeholder="Your Message"
          value={sideBarMessage}
          onChange={(e) => {
            setSideBarMessage(e.target.value);
          }}
        />
        {sideBarMessage && sideBarName && sideBarNo ? (
          <button
            className="w-full h-[40px] rounded-[37px] bg-[#335BF5] flex items-center justify-center mt-[20.82px] hover:scale-[103%] transition-[300ms] cursor-pointer"
            onClick={handleSubmit}
          >
            <p className="text-[14.9px] font-[600] text-[#FFF]">Send</p>
          </button>
        ) : (
          <div className="flex flex-col gap-[2px]">
            <button className="w-full h-[40px] cursor-not-allowed rounded-[37px] bg-[rgba(51,91,245,0.42)] flex items-center justify-center mt-[20.82px] ">
              <p className="text-[14.9px] font-[600] text-[#FFF]">Send</p>
            </button>
            <p className="font-[400] text-[12px] text-red-600">
              *Every field is mandatory
            </p>
          </div>
        )}
      </div>

      {/* Toast message */}
      <Toast
            visible={showToast}
            onClose={() => setShowToast(false)}
            {...toastConfig}
            transition="fade" // Add a fade transition
            duration={3000} // Keep it visible for 3 seconds
            className={`toast-message ${
              toastConfig.type === "success" ? "toast-success" : "toast-error"
            }`}
          />    </div>
  );
};

export default SidebarFab;
