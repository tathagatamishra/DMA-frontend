"use client";
import React, { useState } from "react";
import { serverUrl } from "@/config";
import axios from "axios";

const Reply = (props) => {
  console.log(props.keyy);
  console.log(props.parent);
  console.log(props.blogId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  function extractEmailAndUsername(str) {
    // Define a regular expression to match the email pattern
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    
    // Execute the regex to find the email in the string
    const emailMatch = str.match(emailRegex);
    
    if (emailMatch) {
      const email = emailMatch[0];
      // Extract the username from the email
      const username = email.split('@')[0];
      
      return "@" + username ;
    } else {
      // If no email is found, return null
      return null;
    }
  }

  const handleSubmit = async () => {
    try {
      let payload ={}
      if (props.keyy) {
        const newComment = extractEmailAndUsername(props.keyy) + " " + comment;
        payload = {
          parentCommentId: props.parent,
          name: name,
          email: email,
          content: newComment,
        };
      } else {
        payload = {
          parentCommentId: props.parent,
          name: name,
          email: email,
          content: comment,
        };
      }
      console.log(payload);
      const { data } = await axios.post(`${serverUrl}/postComment/${props.blogId}`, payload);
      console.log(data);
      setEmail("");
      setName("");
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-[#F2F2F2] rounded-[10px] px-[12px] sm2:px-[28px] py-[16px] sm2:py-[28px]">
      <p className="font-[700] sm2:font-[600] text-[16px] sm2:text-[20px] text-black">
        Reply a Comment
      </p>
      <p className="font-[400] text-[12px] sm2:text-[18px] text-[#555555] mt-[6px] sm2:mt-[12px]">
        Required fields are marked *
      </p>
      <div className="w-full flex flex-col gap-[16px] sm2:gap-[0px] sm2:flex-row sm2:justify-between mt-[10px] sm2:mt-[28px]">
        <div className="flex flex-col gap-[4px] sm2:gap-[12px] w-full sm2:w-[48.10%]">
          <p className="font-[600] sm2:font-[500] text-[14px] sm2:text-[18px]">
            Name
          </p>
          <div className="w-full h-[48px] bg-[#fff] border border-[#9D9D9D] rounded-[8px] px-[16px]">
            <input
              type="text"
              className="w-full h-full  bg-[#FFF] outline-none font-[400] text-[18px] text-[#555555]"
              placeholder="Name*"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[4px] sm2:gap-[12px] w-full sm2:w-[48.80%]">
          <p className="font-[600] sm2:font-[500] text-[14px] sm2:text-[18px]">
            Email
          </p>
          <div className="w-full h-[48px] bg-[#fff] border border-[#9D9D9D] rounded-[8px] px-[16px]">
            <input
              type="email"
              className="w-full h-full  bg-[#FFF] outline-none font-[400] text-[18px] text-[#555555]"
              placeholder="Email*"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[4px] sm2:gap-[12px] w-full mt-[16px] sm2:mt-[20px]">
        <p className="font-[600] sm2:font-[500] text-[14px] sm2:text-[18px]">
          Comment
        </p>
        <div className="w-full h-[110px] bg-[#fff] border border-[#9D9D9D] rounded-[8px] px-[16px] py-[10px]">
          <textarea
            type="text"
            className="w-full h-full  resize-none bg-[#FFF] outline-none font-[400] text-[18px] text-[#555555]"
            placeholder="Write Comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
      </div>
      {email && comment && name ? (
        <div
          className="w-[163px] sm2:w-[196px] h-[42px] sm2:h-[48px] rounded-[24px] bg-[#335BF5] flex items-center justify-center mt-[17px] cursor-pointer"
          onClick={() => {
            handleSubmit();
          }}
        >
          <p className="font-[500] text-[14px] sm2:text-[18px] text-[#FFF]">
            Posts comment
          </p>
        </div>
      ) : (
        <div className="w-[163px] sm2:w-[196px] h-[42px] sm2:h-[48px] rounded-[24px] bg-[rgba(51,91,245,0.42)]  flex items-center justify-center mt-[17px] cursor-not-allowed">
          <p className="font-[500] text-[14px] sm2:text-[18px] text-[#FFF]">
            Post Reply
          </p>
        </div>
      )}
    </div>
  );
};

export default Reply;
