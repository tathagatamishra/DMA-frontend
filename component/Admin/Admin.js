"use client";
import React, { useEffect, useState } from "react";
import { getCookie, serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "./AdminUi/AdminInput";
import AdminBtn from "./AdminUi/AdminBtn";
import Loader from "../UI/Loader";
import { MdKeyboardBackspace } from "react-icons/md";

function setCookie(name, value, daysToExpire) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(value) +
    (daysToExpire ? `; expires=${expirationDate.toUTCString()}` : "");
  document.cookie = `${name}=${cookieValue}; path=/`;
}

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [updatePass, setUpdatePass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState(false);

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/sendAdminCredentials`,
        {}
      );
      setMessage(true);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${serverUrl}/adminLogin`, {
        userName: username,
        password,
      });
      if (response.data.success) {
        setCookie("jwt_token_admin", response.data.token, 3);
        setLoggedIn(true);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCookie("jwt_token_admin", "", -1);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  const handleUpdateCredentials = async () => {
    try {
      const response = await axios.put(`${serverUrl}/adminUpdate`, {
        userName: username,
        password,
      });
      if (response.data.success) {
        setUpdatePass(false);
      } else {
        console.log("Failed to update credentials");
      }
    } catch (error) {
      console.error("Update credentials error:", error);
    }
  };

  useEffect(() => {
    if (getCookie("jwt_token_admin")) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [loggedIn]);

  if (loggedIn) {
    return (
      <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none relative">
        {isLoading && <Loader />}

        <div className="w-full flex flex-row items-center justify-center relative">
          <p className="font-[700] py-[20px]">ADMIN</p>
          {updatePass && (
            <MdKeyboardBackspace
              className="absolute left-0 text-[34px] "
              onClick={() => setUpdatePass(false)}
            />
          )}
        </div>

        {updatePass ? (
          <div className="MainAdminContainer">
            <div className="LoginForm">
              <AdminInput
                label="Enter New Username"
                className="w-full"
                type="input"
                inputType="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <AdminInput
                label="Enter New Password"
                className="w-full"
                type="input"
                inputType="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-row justify-center w-full gap-[20px]">
                <AdminBtn
                  text="Cancel"
                  btnColor="#f6dbdb"
                  onClick={() => setUpdatePass(false)}
                />
                <AdminBtn text="Update" onClick={handleUpdateCredentials} />
              </div>
            </div>

            <div className="LoginForm !flex-row">
              <p
                className="text-[#ff3333] text-[14px] text-center cursor-pointer"
                onClick={() => navigate("/admin/forgot-password")}
              >
                Forgot Your Username or Password?
              </p>
              <AdminBtn text="Click Here" onClick={handleSendEmail} />

              {message && (
                <p className="message absolute z-[100] bg-[#000000c0] rounded-[6px] text-[white] px-[10px] py-[4px] text-[14px]">
                  Credentials sent successfully to your email{" "}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="MainAdminContainer">
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-home")}
            >
              HOME
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-about")}
            >
              ABOUT
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-gallery")}
            >
              GALLERY
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-contact")}
            >
              CONTACT
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-footer")}
            >
              FOOTER
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-founder")}
            >
             FOUNDER
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-header")}
            >
              HEADER
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-brochure")}
            >
              BROCHURE
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-testimonials")}
            >
             TESTIMONIALS
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-team")}
            >
              OUR TEAM
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-service")}
            >
              SERVICE FRONT PAGE
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/manage-main-service")}
            >
              ADD & MANAGE MAIN SERVICE
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/manage-sub-service")}
            >
              ADD & MANAGE SUB SERVICE
            </div>
            { <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-blog")}
            >
              BLOG FRONT PAGE
            </div> }
            {<div
              className="AdminCard"
              onClick={() => navigate("/admin/manage-blog")}
            >
              ADD & MANAGE BLOG
            </div> }
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/approve-comments")}
            >
              APPROVE COMMENTS
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/manage-request")}
            >
              MANAGE REQUEST
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/manage-lead")}
            >
              MANAGE PDF REQUEST
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/manage-profilecard")}
            >
              MANAGE Profile Card REQUEST
            </div>
            <div
              className="AdminCard"
              onClick={() => navigate("/admin/edit-newsletter")}
            >
              NEWSLETTER SUBSCRIBERS
            </div>
           
            {/* <div
              className="AdminCard"
              onClick={() => navigate("/admin/beta-users")}
            >
              BETA USERS
            </div> */}
            {/* <div
              className="AdminCard"
              onClick={() => navigate("/admin/test-dev-tool")}
            >
              FOR DEVELOPER
            </div> */}
            <div
              className="AdminCard !text-[#ff3333]"
              onClick={() => setUpdatePass(true)}
            >
              UPDATE CREDENTIALS
            </div>
            <div className="AdminCard !text-[#ff3333]" onClick={handleLogout}>
              LOGOUT
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none relative">
        {isLoading && <Loader />}

        <p className="font-[700] py-[20px]">ADMIN</p>

        <div
          className="LoginContainer !flex-col !justify-start !items-center !w-full"
          style={{
            flexWrap: "nowrap !important",
            alignContent: "unset !important",
          }}
        >
          <div className="LoginForm">
            <AdminInput
              label="Username"
              className="w-full"
              type="input"
              inputType="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <AdminInput
              label="Password"
              className="w-full"
              type="input"
              inputType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-[#ff3333] text-center">{errorMessage}</p>
            <div className="flex flex-row justify-center w-full gap-[20px]">
              <AdminBtn text="Login" onClick={handleLogin} />
            </div>
          </div>

          <div className="LoginForm !flex-row">
            <p
              className="text-[#ff3333] text-[14px] text-center cursor-pointer"
              onClick={() => navigate("/admin/forgot-password")}
            >
              Forgot Your Username or Password?
            </p>
            <AdminBtn text="Click Here" onClick={handleSendEmail} />

            {message && (
              <p className="message absolute z-[100] bg-[#000000c0] rounded-[6px] text-[white] px-[10px] py-[4px] text-[14px]">
                Credentials sent successfully to your email{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
