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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { serverUrl } from "@/config";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { isIOS } from "react-device-detect";
import Loader from "../UI/Loader";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import BrochureCard from "../UI/BrochureCard";
import Parser from "../UI/Parser";
import { SideBarBrochureFab } from "../UI/BrochureSidebarFab";

//   {
//     img: "https://s3-alpha-sig.figma.com/img/df19/a167/b9155556eefe83fd82058185dbc7794e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IJHUaiGXnMaLwl3Zj63E9oam77mWHBpZWDxxsjjZyMXQ1VrXZRZJfLjwn7GgvyByDvTTXUXzeUnN~p0wcOv9iUeRUe1hmyr29Myf9OrRQMepT1~rFHfXcqwSvwzHvFWkhXE3KSjEgKbV7UMy5siqOrYF6GQ2CsD0ZH-6XcsgLass7KH7Gdv~HfaiEsDuZFTu3ZRiSfmts~d6jUaomode9I67K592-oR2MF9SPR6eGSd7jaHLJo7OHAJUJCujDU8OMpj5ZyqOLj7r~Zz0C6xQXCzTR~rO6v0rRks2EoGn~WBCNCaL5nQ9uedFHE49kzf4oVDNINVjCsZ85EAw3zeJow__",
//     title: "Best Learning platforms for business ?",
//     desc: "Quisque nec non amet quis. Varius tellus justo odio parturient d cras purus. At eget euismod cursus non. Molestie dignissised volutpat feugiat vel.",
//   },
//   {
//     img: "https://s3-alpha-sig.figma.com/img/df19/a167/b9155556eefe83fd82058185dbc7794e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IJHUaiGXnMaLwl3Zj63E9oam77mWHBpZWDxxsjjZyMXQ1VrXZRZJfLjwn7GgvyByDvTTXUXzeUnN~p0wcOv9iUeRUe1hmyr29Myf9OrRQMepT1~rFHfXcqwSvwzHvFWkhXE3KSjEgKbV7UMy5siqOrYF6GQ2CsD0ZH-6XcsgLass7KH7Gdv~HfaiEsDuZFTu3ZRiSfmts~d6jUaomode9I67K592-oR2MF9SPR6eGSd7jaHLJo7OHAJUJCujDU8OMpj5ZyqOLj7r~Zz0C6xQXCzTR~rO6v0rRks2EoGn~WBCNCaL5nQ9uedFHE49kzf4oVDNINVjCsZ85EAw3zeJow__",
//     title: "Best Learning platforms for business ?",
//     desc: "Quisque nec non amet quis. Varius tellus justo odio parturient d cras purus. At eget euismod cursus non. Molestie dignissised volutpat feugiat vel.",
//   },
//   {
//     img: "https://s3-alpha-sig.figma.com/img/df19/a167/b9155556eefe83fd82058185dbc7794e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IJHUaiGXnMaLwl3Zj63E9oam77mWHBpZWDxxsjjZyMXQ1VrXZRZJfLjwn7GgvyByDvTTXUXzeUnN~p0wcOv9iUeRUe1hmyr29Myf9OrRQMepT1~rFHfXcqwSvwzHvFWkhXE3KSjEgKbV7UMy5siqOrYF6GQ2CsD0ZH-6XcsgLass7KH7Gdv~HfaiEsDuZFTu3ZRiSfmts~d6jUaomode9I67K592-oR2MF9SPR6eGSd7jaHLJo7OHAJUJCujDU8OMpj5ZyqOLj7r~Zz0C6xQXCzTR~rO6v0rRks2EoGn~WBCNCaL5nQ9uedFHE49kzf4oVDNINVjCsZ85EAw3zeJow__",
//     title: "Best Learning platforms for business ?",
//     desc: "Quisque nec non amet quis. Varius tellus justo odio parturient d cras purus. At eget euismod cursus non. Molestie dignissised volutpat feugiat vel.",
//   },
// ];

const Blogs = ({ blogPageData, recentPosts, usedIn }) => {
  const param = useSearchParams();
  const category = param.get("category");
  const tag = param.get("tag");
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [selected, setSelected] = useState("");
  const blogPage = blogPageData;
  const [toggle, setToggle] = useState("about");
  const [sideBarName, setSideBarName] = useState("");
  const [sideBarNo, setSideBarNo] = useState("");
  const [sideBarMessage, setSideBarMessage] = useState("");
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showRequestBrochure, setShowRequestBrochure] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [sidebarTop, setSidebarTop] = useState(0);

  const AllBlogs = async () => {
    setIsLoading(true);
    try {
      if (category) {
        setSelected(category);
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?category=${category}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } else if (tag) {
        setSelectedTag(tag);
        const { data } = await axios.get(`${serverUrl}/getAllBlogs?tag=${tag}`);
        setData(data.blogs);
        setIsLoading(false);
      } else {
        const { data } = await axios.get(`${serverUrl}/getAllBlogs`);
        setData(data.blogs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const targetedBlogs = async () => {
    setIsLoading(true);
    if (selectedTag == "" && selected != "") {
      try {
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?category=${selected}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else if (selectedTag != "" && selected == "") {
      try {
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?tag=${selectedTag}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else if (selectedTag != "" && selected != "") {
      try {
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?tag=${selectedTag}&category=${selected}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      await AllBlogs();
    }
  };

  const searchTargetBlogs = async (value) => {
    setIsLoading(true);
    if (selectedTag == "" && selected != "") {
      try {
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?category=${selected}&search=${value}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else if (selectedTag != "" && selected == "") {
      try {
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?tag=${selectedTag}&search=${value}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else if (selectedTag != "" && selected != "") {
      try {
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?tag=${selectedTag}&category=${selected}&search=${value}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.get(
          `${serverUrl}/getAllBlogs?search=${value}`
        );
        setData(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    AllBlogs();
  }, []);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag("");
    } else {
      setSelectedTag(tag);
    }
  };

  const handleSelected = (tag) => {
    if (selected === tag) {
      setSelected("");
    } else {
      setSelected(tag);
    }
  };

  useEffect(() => {
    targetedBlogs();
  }, [selected, selectedTag]);

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

  // const handleSearch = (e) => {
  //   if (e.key === 'Enter') {
  //     onSearch(searchValue);
  //   }
  // };

  return (
    <div
      className={`w-full flex flex-col overflow-y-scroll ${
        isIOS ? "pb-[60px]" : "pb-[0px]"
      }`}
    >
      {isLoading && <Loader />}
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
        className="w-full  min-h-[195px] md:min-h-[335px] bg-cover bg-center pb-[16px] px-[20px] md:px-[40px] lg:px-[70px] xl:px-[130px] pt-[16px] md:pt-[27px] relative"
        style={{
          backgroundImage: `url('${blogPage.hero?.image}')`,
        }}
      >
        <div className="bg-[#00000099] absolute w-full h-full top-0 left-0"></div>
        <div className="flex flex-col gap-[6.17px] md:gap-[33px]">
          <button className="z-10 w-[58px] md:w-[115px] h-[22px] md:h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B] hover:scale-[103%] transition-[300ms]">
            <p className="text-[12.22px] md:text-[20px] font-[600] text-[#FFF]">
              {Parser(blogPage.hero?.tag)}
            </p>
          </button>
          <span
            className={`z-10 text-[20px] md:text-[36px] font-[700] text-[#FFF] leading-[28px] mx-auto md:static md:mx-0  ${
              show ? "opacity-100" : "opacity-0"
            }  duration-500 animate-fade-in`}
          >
            {Parser(blogPage.hero?.heading)}
          </span>
          <p
            className={`z-10 text-[14px] md:text-[18px] font-[500] text-[#FFF] text-justify mt-[7px] block ${
              show
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            } duration-500 transition-transform ease-out`}
          >
            {Parser(blogPage.hero?.description)}
          </p>
        </div>
      </div> */}
      <div className="pl-[20px] sm2:pl-[30px] md2:pl-[50px] pr-[20px] sm2:pr-[30px] xl:pl-[130px] pt-[24px] sm2:pt-[80px] xl:pr-[87px] flex flex-col sm2:flex-row sm2:gap-[50px] lg:gap-[80px]">
        <div className="flex flex-col w-full sm2:w-[58.6%] gap-[28px] sm2:gap-[69px] pb-[0px] sm2:pb-[78px]">
          {currentData?.map((d, index) => (
            <BlogCardForBlogPage
              key={index}
              id={d._id}
              img={d.coverimage}
              title={d.title}
              desc={d.layout.filter((item) => item.story)[0]?.story}
              date={d.date}
              author={d.author}
              // summary={d.summary}
              comments={d.comments}
              views={d.views}
            />
          ))}
          <div className="flex items-center mt-3 sm2:mt-4 overflow-x-auto w-full">
            <div className="flex flex-nowrap gap-[8.58px] sm2:gap-[12px] items-center mx-auto">
              <div
                onClick={handlePrevious}
                className="flex-shrink-0 w-[34px] h-[34px] sm2:w-[48px] sm2:h-[48px] rounded-full border-[1px] border-[#EAEAEA] flex items-center justify-center cursor-pointer"
              >
                <MdKeyboardArrowLeft className="text-[20px] text-[#000]" />
              </div>
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(index + 1)}
                  className={`flex-shrink-0 w-[34px] h-[34px] sm2:w-[48px] sm2:h-[48px] rounded-full ${
                    currentPage === index + 1
                      ? "bg-[#000]"
                      : "border-[1px] border-[#EAEAEA]"
                  } flex items-center justify-center cursor-pointer`}
                >
                  <p
                    className={`font-[500] text-[12.88px] sm2:text-[18px] ${
                      currentPage === index + 1 ? "text-[#FFF]" : "text-[#000]"
                    }`}
                  >
                    {index + 1}
                  </p>
                </div>
              ))}
              <div
                onClick={handleNext}
                className="flex-shrink-0 w-[34px] h-[34px] sm2:w-[48px] sm2:h-[48px] rounded-full border-[1px] border-[#EAEAEA] flex items-center justify-center cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-[20px] text-[#000]" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden w-[34.7%] sm2:flex flex-col pb-[40px]"
        >
          <div
            ref={sidebarRef}
            className={`transition-all duration-300 ${isSticky ? 'bg-white' : ''}`}
            style={{
              ...sidebarCustomStyles,
              paddingRight: isSticky ? '10px' : '0'
            }}
          >
            <div className="space-y-6">
              {/* Search Section */}
              <div className="relative w-full mb-8">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchTargetBlogs(searchValue);
                    }
                  }}
                  type="text"
                  placeholder="Search"
                  className="w-full h-[37px] font-[500] text-[17px] outline-none text-[#3C3C4399] bg-[#FAFAFAED] rounded-lg px-4"
                />
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

              {/* Categories Section */}
              {/* <div className="mb-8">
                <h3 className="font-[600] text-[20px] mb-4">Category</h3>
                <div className="flex flex-col gap-2">
                  {blogPage.category?.map((d, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelected(d)}
                      className="cursor-pointer text-[#5E5E5E] hover:text-[#335BF5] transition-colors"
                    >
                      {Parser(d)}
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Tags Section */}
              {/* <div>
                <h3 className="font-[600] text-[20px] mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blogPage.tags?.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1 bg-[#F5F5F5] rounded-full text-[#5E5E5E] hover:bg-[#335BF5] hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-[82px] mt-5 md:mb-[80px] md:px-[25px] md22:px-[40px]">
        <BrochureCard />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Blogs;
