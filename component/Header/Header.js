import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ServiceDropDown from "../UI/ServiceDropDown";
import DMA from "../assets/DMAlogo.png";
import DMA2 from "../assets/DMAFinal.png";
import vectorpng from "../assets/Vector.jpg";
import Image from "next/image";
import AboutDropDown from "../UI/AboutUsDropdown";
import { serverUrl } from "@/config";
import axios from "axios";

const Header = ({ setIsOpen, setIsHover, isHover }) => {
  const [isHoverAbout, setIsHoverAbout] = useState(false);
  const [headerData, setHeaderData] = useState({});
  const router = useRouter();

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const getHeaderCredential = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getHeader`);
      setHeaderData(data.headerData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeaderCredential();
  }, []);

  // console.log(headerData.hero.number)

  const currentPath = usePathname();
  const home = currentPath === `/`;
  const service = currentPath.includes(`/service`);
  const gallery = currentPath.includes(`/gallery`);
  const contact = currentPath.includes(`/contact`);
  const team = currentPath.includes(`/team`);
  const about = currentPath.includes(`/about`);
  const blog = currentPath.includes(`/blogs`);
  const admin = currentPath.includes("/admin");
  const adminHeader = currentPath.includes("/admin/edit-header");

  return admin && !adminHeader ? (
    <></>
  ) : (
    <div className="w-screen flex flex-col items-center overflow-y-scroll">
      <div
        className={`w-full h-[58px] bg-[#335BF5] flex items-center ${
          adminHeader ? "justify-start" : "justify-center"
        }  gap-[45px] smd:gap-[55px] md4:gap-[105px] px-[15px] sm2:px-[30px]`}
        style={{ transition: "all 0.5s ease" }}
      >
        <div
          className="flex flex-col xsm:flex-row gap-[4px] xsm:gap-[15px] xsm3:gap-[30px] sm2:gap-[15px] smd:gap-[20px] md4:gap-[34px] cursor-pointer"
          onClick={() => {
            const telUrl = `tel:${headerData.hero.number}`;
            window.location.href = telUrl;
          }}
        >
          <div className="flex gap-[8px] items-center justify-center">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              className="flex items-center justify-center"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66536 1.5C5.08203 1.5 6.7487 5.25 6.7487 5.66667C6.7487 6.5 5.4987 7.33333 5.08203 8.16667C4.66536 9 5.4987 9.83333 6.33203 10.6667C6.66061 10.9953 7.9987 12.3333 8.83203 11.9167C9.66536 11.5 10.4987 10.25 11.332 10.25C11.7487 10.25 15.4987 11.9167 15.4987 12.3333C15.4987 14 14.2487 15.25 12.9987 15.6667C11.7487 16.0833 10.9154 16.0833 9.2487 15.6667C7.58203 15.25 6.33203 14.8333 4.2487 12.75C2.16536 10.6667 1.7487 9.41667 1.33203 7.75C0.915365 6.08333 0.915365 5.25 1.33203 4C1.7487 2.75 2.9987 1.5 4.66536 1.5Z"
                stroke="white"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-[500] text-[12px] xsm2:text-[14px]  xsm3:text-[16px] sm2:text-[12px] md:text-[14px] md22:text-[16px] text-[#FFF] whitespace-nowrap">
              {headerData?.hero?.number}
            </p>
          </div>
          <div
            className="flex gap-[8px] items-center justify-center cursor-pointer"
            onClick={() => {
              const mailtoUrl = `mailto:${headerData.hero.email}`;
              window.location.href = mailtoUrl;
            }}
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              className="flex items-center justify-center"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.667969 2.00065C0.667969 1.55862 0.843563 1.1347 1.15612 0.82214C1.46868 0.509579 1.89261 0.333984 2.33464 0.333984H15.668C16.11 0.333984 16.5339 0.509579 16.8465 0.82214C17.159 1.1347 17.3346 1.55862 17.3346 2.00065V12.0007C17.3346 12.4427 17.159 12.8666 16.8465 13.1792C16.5339 13.4917 16.11 13.6673 15.668 13.6673H2.33464C1.89261 13.6673 1.46868 13.4917 1.15612 13.1792C0.843563 12.8666 0.667969 12.4427 0.667969 12.0007V2.00065ZM3.60047 2.00065L9.0013 6.72648L14.4021 2.00065H3.60047ZM15.668 3.10815L9.55047 8.46148C9.3985 8.59463 9.20334 8.66803 9.0013 8.66803C8.79926 8.66803 8.6041 8.59463 8.45214 8.46148L2.33464 3.10815V12.0007H15.668V3.10815Z"
                fill="white"
              />
            </svg>
            <p className="font-[500] text-[12px] xsm2:text-[14px] xsm3:text-[16px] sm2:text-[12px] md:text-[14px] md22:text-[16px] text-[#FFF] underline">
              {headerData?.hero?.email}
            </p>
          </div>
        </div>
      </div>
      {!adminHeader && (
        <div
          className="max-w-[1322px] w-full h-[40px] sm:h-[85px] flex items-center ex2:justify-center justify-end gap-[50px] smd:gap-[100px] md22:gap-[145px] lg:gap-[221px] px-[20px] xsm1:px-[30px]"
          style={{ transition: "all 0.5s ease" }}
        >
          <Image
           onClick={()=>router.push("/")}
            alt="DMA logo"
            src={DMA}
            height={1080}
            width={1080}
            className="md3:block hidden h-[120px] w-auto object-contain z-[2] absolute top-[1%] left-[3%] cursor-pointer "
          />
          <Image
           onClick={()=>router.push("/")}
            alt="DMA logo"
            src={DMA2}
            height={1080}
            width={1080}
            className="md3:hidden block h-[35px] w-auto object-contain z-[2] absolute left-[3%] cursor-pointer"
          />
          <Image
           onClick={()=>router.push("/")}
            alt="DMA logo"
            src={vectorpng}
            height={1080}
            width={1080}
            className="md3:block hidden h-[58px] lg:w-[350px] w-[240px] object-fill z-[1] absolute top-[0px] left-[0px] cursor-pointer"
            style={{ transition: "all 0.5s ease" }}
          />
          <div className="mr-5 fold:mr-0 text-[8px] font-[400]  fold:text-[10px] fold:font-[500] xsm:text-[12px] xsm:font-[600] sm2:hidden pl-[30px]">
            Dikshant Malhotra & Associates
          </div>
          <div
            className="hidden items-center justify-center gap-[18px] smd:gap-[22px] md4:gap-[32px] sm2:flex h-full w-fit"
            style={{ transition: "all 0.5s ease" }}
          >
            <p
              className={`${
                home ? "text-[#335BF5]" : ""
              } font-[500] text-[14px] md22:text-[16px] cursor-pointer hover:text-[#335BF5]`}
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </p>
            <p
              className={`${
                about ? "text-[#335BF5]" : ""
              } font-[500] flex items-center justify-center text-[14px] md22:text-[16px] cursor-pointer hover:text-[#335BF5]`}
              onMouseEnter={()=>setIsHoverAbout(true)}
              onMouseLeave={()=>setIsHoverAbout(false)}
              onClick={() => {
                // router.push("/about");
              }}
            >
              About Us
              <svg
                className={`ml-[12px] mt-[2px] text-[12px] ${
                  about ? "text-[#335BF5]" : "text-[#000]"
                } group-hover:text-[#335BF5]`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="currentColor"
              >
                <path d="M5 6L0 0H10L5 6Z" />
              </svg>
            </p>
            <p
              className={`${
                team ? "text-[#335BF5]" : ""
              } font-[500] text-[14px] md22:text-[16px] cursor-pointer hover:text-[#335BF5]`}
              onClick={() => {
                router.push("/team");
              }}
            >
              Our Team
            </p>
            {/* <p
              className={`${
                gallery ? "text-[#335BF5]" : ""
              } font-[500] text-[14px] md22:text-[16px] cursor-pointer hover:text-[#335BF5]`}
              onClick={() => {
                router.push("/gallery");
              }}
            >
              Gallery
            </p> */}
            <p
              className={`${
                service ? "text-[#335BF5]" : ""
              } h-full flex items-center justify-center font-[500] text-[14px] md22:text-[16px] cursor-pointer hover:text-[#335BF5] group`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              // onClick={() => {
              //   router.push("/service");
              // }}
            >
              Services
              <svg
                className={`ml-[12px] mt-[2px] text-[12px] ${
                  service ? "text-[#335BF5]" : "text-[#000]"
                } group-hover:text-[#335BF5]`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="currentColor"
              >
                <path d="M5 6L0 0H10L5 6Z" />
              </svg>
            </p>

            {/* <p
            className="font-[500] text-[14px] md22:text-[16px]  cursor-pointer"
            onClick={() => {
              router.push("/project");
            }}
          >
            Projects
          </p> */}
            <p
              className={`${
                blog ? "text-[#335BF5]" : ""
              } font-[500] text-[14px] md22:text-[16px] cursor-pointer hover:text-[#335BF5]`}
              onClick={() => {
                router.push("/blogs");
              }}
            >
              Blogs
            </p>
            
            <p
              className={`${
                contact ? "text-[#335BF5]" : ""
              } font-[500] text-[14px] md22:text-[16px] cursor-pointer hover:text-[#335BF5]`}
              onClick={() => {
                router.push("/contact");
              }}
            >
              Contact Us
            </p>
           
          </div>
          <div
            className="block sm2:hidden"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.05 11H3.95C3.42533 11 3 11.4253 3 11.95V12.05C3 12.5747 3.42533 13 3.95 13H20.05C20.5747 13 21 12.5747 21 12.05V11.95C21 11.4253 20.5747 11 20.05 11Z"
                fill="black"
              />
              <path
                d="M20.05 16H3.95C3.42533 16 3 16.4253 3 16.95V17.05C3 17.5747 3.42533 18 3.95 18H20.05C20.5747 18 21 17.5747 21 17.05V16.95C21 16.4253 20.5747 16 20.05 16Z"
                fill="black"
              />
              <path
                d="M20.05 6H3.95C3.42533 6 3 6.42533 3 6.95V7.05C3 7.57467 3.42533 8 3.95 8H20.05C20.5747 8 21 7.57467 21 7.05V6.95C21 6.42533 20.5747 6 20.05 6Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      )}
      <ServiceDropDown
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        isHover={isHover}
      />
      <AboutDropDown
        handleMouseEnterAbout={() => setIsHoverAbout(true)}
        handleMouseLeaveAbout={() => setIsHoverAbout(false)}
        isHoverAbout={isHoverAbout}
      />
    </div>
  );
};

export default Header;
