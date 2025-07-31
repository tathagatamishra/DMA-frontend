"use client";
import React, { useEffect, useState, useRef } from "react";
import BlogCardForBlogPage from "../UI/BlogCardForBlogPage";
import FullBlog from "../UI/FullBlog";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import RecentPostcard from "../UI/RecentPostcard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { IoCallOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import SidebarFab from "../UI/SidebarFab";
import Fab from "../UI/Fab";
import ServiceDropDown from "../UI/ServiceDropDown";
import { serverUrl } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { isIOS } from "react-device-detect";
import Parser from "../UI/Parser";
import { FaRegFilePdf } from "react-icons/fa";
import CenterModal from "../Modal/CenterModal";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

const PDFItem = ({ pdf, setShowLeadGen, setPdfName, setOpenPdf }) => {
  // Function to extract filename from URL and remove prefix
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
    e.preventDefault();
    const fileName = getFileName(pdf);
    // console.log(fileName);
    setPdfName(fileName);
    setShowLeadGen(true);
    setOpenPdf(pdf);

    // Open PDF in new window
    // window.open(pdf, "_blank");
  };

  return (
    <div
      className="relative flex items-center gap-[10px] md:gap-[15px] cursor-pointer  p-2 mb-3"
      onClick={handleClick}
    >
      {/* Background rectangle */}
      <div className="absolute inset-0 border border-gray-300 rounded-lg -z-10"></div>
      <span className="md:text-[25px] ml-[10px] text-[20px] text-red-600 cursor-pointer">
        <FaRegFilePdf />
      </span>
      <span className="text-gray-800 font-medium truncate max-w-[85%] cursor-pointer hover:text-blue-600 text-[15px] xsm2:text-[16px] sm:text-[18px] md:text-[20px]">
        {getFileName(pdf)}
      </span>
    </div>
  );
};

const SingleBlog = ({
  blogData,
  previous,
  next,
  blogId,
  recentPosts,
  comments,
  usedIn,
  pdfdata,
}) => {
  // console.log(recentPosts);
  const router = useRouter();
  const [toggle, setToggle] = useState("about");
  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selected, setSelected] = useState("");
  const [heroTag, setHeroTag] = useState("");
  const [newBlogData, setNewBlogData] = useState({
    hero: { heading: "", description: "", image: "" },
    coverimage: "",
    title: "",
    author: "",
    // summary:"",
    layout: [],
    tags: [],
    category: "",
    pdfdata: {
      heading: "Pdf",
      pdf: [],
    },
    team: {
      name: "",
      title: "",
      quote: "",
      image: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      gmail: "",
      youtube: "",
    },
  });
  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState("");
  const [viewIncremented, setViewIncremented] = useState(false);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);

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

  useEffect(() => {}, []);

  const handleLeadSubmit = async (e) => {
    await setFormData((prev) => ({
      ...prev,
      pdfName: pdfName,
    }));
    e.preventDefault();
    // console.log("Form submitted:", formData);
    try {
      // Send POST request
      await axios.post(`${serverUrl}/createLead`, formData);
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

  useEffect(() => {
    if (blogData) {
      setTags(blogData.category);
      setNewBlogData(blogData);
      setTags(blogData.tags);
      setHeroHeading(blogData.hero.heading);
      setDescription(blogData.hero.description);
      setImage(blogData.hero.image);
      setHeroTag(blogData.hero.tag);
      setCategories(blogData.category);
    }
  }, [blogData]);
  // console.log(blogData);
  // console.log("data",newBlogData);

  const getBlogPage = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getBlogPage`);
      setAllTags(data.blogPageData.tags);
      setAllCategories(data.blogPageData.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogPage();
  }, []);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleTagClick = (tag) => {
    router.push(`/blogs?tag=${tag}`);
  };

  const handleSelected = (tag) => {
    router.push(`/blogs?category=${tag}`);
  };

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const truncateText = (text, maxWords) => {
    // Split the text into words
    const words = text.split(" ");
    // Return the first `maxWords` words joined back together
    return words.slice(0, maxWords).join(" ");
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const container = containerRef.current;
    if (!sidebar || !container) return;

    setSidebarWidth(sidebar.offsetWidth);
    const handleScroll = () => {
      const isLargeScreen = window.innerWidth >= 768;
      if (!isLargeScreen) {
        resetSidebarStyle(sidebar);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const headerOffset = 20;
      const containerTop = containerRect.top + scrollTop;

      // Get the container's bottom position relative to viewport
      const containerBottom = containerRect.bottom;
      const sidebarHeight = sidebarRect.height;

      if (scrollTop + headerOffset >= containerTop) {
        // Check if sidebar would overflow the container
        if (containerBottom <= sidebarHeight + headerOffset) {
          // Stop the sidebar at container bottom
          sidebar.style.position = "absolute";
          sidebar.style.top = `${container.clientHeight - sidebarHeight}px`;
        } else {
          // Normal sticky behavior
          sidebar.style.position = "fixed";
          sidebar.style.top = `${headerOffset}px`;
        }
        sidebar.style.width = `${sidebarWidth}px`;
        sidebar.style.maxHeight = "calc(100vh - 40px)";
        sidebar.style.overflowY = "auto";
        setIsSticky(true);
      } else {
        resetSidebarStyle(sidebar);
        setIsSticky(false);
      }
    };

    const resetSidebarStyle = (sidebar) => {
      sidebar.style.position = "relative";
      sidebar.style.top = "auto";
      sidebar.style.width = "100%";
      sidebar.style.maxHeight = "none";
      sidebar.style.overflowY = "visible";
    };

    const handleResize = () => {
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth);
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarWidth]);

  // Add custom scrollbar styles
  const scrollbarStyles = {
    scrollbarWidth: "thin",
    scrollbarColor: "#888 #f1f1f1",
    WebkitOverflowScrolling: "touch",
  };

  const sidebarCustomStyles = {
    ...scrollbarStyles,
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  };

  const truncatedDescription = truncateText(description, 25);
  return (
    <div
      className={`w-full flex flex-col overflow-y-scroll ${
        isIOS ? "pb-[60px]" : "pb-[0px]"
      }`}
    >
      {showRequestCallback && (
        <SidebarFab
          showRequestCallback={showRequestCallback}
          setShowRequestCallback={setShowRequestCallback}
        />
      )}

      {showRequestBrochure && (
        <SideBarBrochureFab
          setShowRequestBrochure={setShowRequestBrochure}
          showRequestBrochure={showRequestBrochure}
        />
      )}

      {!showRequestCallback && !showRequestBrochure && usedIn !== "admin" && (
        <Fab
          show={show}
          showRequestCallback={showRequestCallback}
          setShowRequestCallback={setShowRequestCallback}
          setShowRequestBrochure={setShowRequestBrochure}
          showRequestBrochure={showRequestBrochure}
        />
      )}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Header setIsOpen={setIsOpen} setIsHover={setIsHover} isHover={isHover} />
      {/* <div
        className="w-full  min-h-[195px] md:min-h-[335px] bg-cover bg-center px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative pb-[16px]"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-[58px] md:w-[115px] h-[22px] md:h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms]">
            <span className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(heroTag)}
            </span>
          </button>
          <span
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0 ${
              show ? "opacity-100" : "opacity-0"
            } duration-500 animate-fade-in`}
          >
            {Parser(heroHeading)}
          </span>
          <p
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] mt-[7px] text-justify block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(description)}
          </p>
        </div>
      </div> */}

      <div className="pl-[20px] sm2:pl-[30px] md2:pl-[50px] pr-[20px] sm2:pr-[30px] xl:pl-[130px] pt-[20px] sm2:pt-[80px] xl:pr-[87px] sm2:flex sm2:gap-[50px] lg:gap-[80px]">
        <div className="flex-1">
          <FullBlog
            usedIn={usedIn}
            date={newBlogData.date}
            author={newBlogData.author}
            comments={newBlogData.comments}
            views={newBlogData.views}
            tags={tags}
            coverimage={newBlogData.coverimage}
            layout={newBlogData.layout}
            title={newBlogData.title}
            previous={previous}
            next={next}
            blogId={blogId}
            comment={comments}
            recentPosts={recentPosts}
            data={newBlogData}
          />
          {/* PDF Section moved below FullBlog with null check */}
          {newBlogData?.pdfdata?.pdf && newBlogData.pdfdata.pdf.length > 0 && (
            <div className="w-full flex flex-col pt-[50px] pb-[84px]">
              <div className="font-[700] text-[20px] xsm2:text-[22px] md:text-[26px] md4:text-[32px] pr-[30px] sm2:pr-[0px] mb-[10px] sm2:mb-[18px]">
                {Parser(newBlogData.pdfdata?.heading || "")}
              </div>
              <div className="overflow-y-scroll ">
                {newBlogData.pdfdata?.pdf.map((pdf, index) => (
                  <PDFItem
                    key={index}
                    pdf={pdf}
                    index={index}
                    setShowLeadGen={setShowLeadGen}
                    setPdfName={setPdfName}
                    setOpenPdf={setOpenPdf}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <CenterModal
          onModal={showLeadGen}
          onClick={() => setShowLeadGen(false)}
          borderTopWidth="0px"
          marginTop="0.8rem"
          marginBottom="-0.3rem"
        >
          <div className="space-y-6">
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
        {/* Categories Sidebar */}
        {usedIn !== "admin" && (
          <div
            className="hidden w-[34.7%] sm2:flex flex-col pb-[40px]"
            ref={containerRef}
          >
            <div
              ref={sidebarRef}
              className={`transition-all duration-300 ${
                isSticky ? "bg-white" : ""
              }`}
              style={{
                ...sidebarCustomStyles,
                paddingRight: isSticky ? "10px" : "0",
              }}
            >
              <div className="space-y-6">
                {/* Search Section */}
                <div className="sticky top-0 bg-white z-10 pb-4">
                  <div className="w-full h-[40px] rounded-[10px] bg-[#FAFAFAED] border border-[#CACACA] px-[10.67px] flex items-center">
                    <div className="w-full flex gap-[8px] items-center justify-center">
                      <IoSearch className="text-[#88888C] text-[20px]" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-[37px] font-[500] text-[17px] outline-none text-[#3C3C4399] bg-[#FAFAFAED]"
                      />
                    </div>
                  </div>
                </div>

                {/* Categories Section */}
                <div>
                  <p className="text-[20px] font-[600] mb-4">Category</p>
                  <div className="flex flex-col gap-[10px]">
                    {allCategories?.map((d, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleSelected(d)}
                      >
                        <span
                          className={`text-[18px] font-[500] ${
                            categories === d
                              ? "text-[#335BF5]"
                              : "text-[#555555]"
                          }`}
                        >
                          {Parser(d)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Posts Section */}
                <div>
                  <p className="text-[20px] font-[600] mb-4">Recent Posts</p>
                  <div className="flex flex-col gap-[22px] lg:gap-[16px]">
                    {recentPosts?.map((d, i) => (
                      <RecentPostcard
                        id={d._id}
                        key={i}
                        img={d.coverimage}
                        title={d.title}
                        date={d.date}
                      />
                    ))}
                  </div>
                </div>

                {/* Tags Section */}
                <div>
                  <p className="text-[20px] font-[600] mb-4">Popular Tags</p>
                  <div className="flex flex-wrap gap-x-[8px] gap-y-[8px]">
                    {allTags?.map((tag, index) => (
                      <div
                        key={index}
                        className={`py-[8px] px-[20px] border border-[#9D9D9D4D] rounded-[8px] cursor-pointer ${
                          tags.includes(tag) ? "bg-[#F5F5F5]" : ""
                        }`}
                        onClick={() => handleTagClick(tag)}
                      >
                        <span
                          className={`font-[400] text-[18px] leading-[27px] ${
                            tags.includes(tag)
                              ? "text-[#000]"
                              : "text-[#555555]"
                          }`}
                        >
                          {Parser(tag)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {usedIn !== "admin" && <Footer />}
    </div>
  );
};

export default SingleBlog;
