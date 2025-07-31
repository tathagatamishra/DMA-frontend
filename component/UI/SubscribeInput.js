import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "@/config";
import Toast from "./Toast"; // Importing your Toast component
import Parser from "./Parser";

export default function SubscribeInput({ footerData }) {
  const [email, setEmail] = useState("");
  const [toastVisible, setToastVisible] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToastMessage(""); // Clear any previous toast messages

    // Show the toast immediately after button is pressed
    setToastVisible(true);

    try {
      const response = await axios.post(`${serverUrl}/addSubscriber`, {
        email: email,
      });
      if (response.data.status) {
        setToastMessage("Subscribed successfully 😃");
        setEmail(""); // Clear the input field
      } else {
        setToastMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setToastMessage("An error occurred while trying to subscribe.");
    }

    // Hide the toast after 3 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <div className="w-full h-[93px] smd:h-[77px] px-[32px] bg-[#335BF5] flex flex-col justify-center items-center relative">
      <div className="relative bg-[#031D34] max-w-[986px] w-full h-fit rounded-[5px] smd:rounded-[14px] py-[13px] smd:py-[20px] lg:py-[30px] px-[15px] smd:px-[30px] lg:px-[48px] top-[-25px] smd:top-[-45px] flex flex-col smd:flex-row justify-between smd:items-center items-start gap-[10px] smd:gap-[15px]">
        <span className="smd:w-[253px] w-[150px] h-full font-[700] text-[14px] smd:text-[18px] lg:text-[24px] text-[#FFF]">
          {Parser(footerData?.newsletter ? footerData?.newsletter : "Subscribe For Latest Newsletter")}
        </span>

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
            className="min-w-[117px] h-full font-[400] text-[10.6px] smd:text-[14px] text-center text-white bg-[#335BF5] rounded-r-[5px] active:scale-[95%] transition-[200ms]"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Using the Toast component here */}
      <Toast text={toastMessage} visible={toastVisible} transition="fade" duration={3000} />
    </div>
  );
}
