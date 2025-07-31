import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Style/yt.css";

import { EffectCoverflow, Pagination, Navigation, EffectCreative } from "swiper/modules";
import YTiframe from "../UI/YTiframe";

function App({videoArr}) {
  const [isPlaying, setIsPlaying] = useState(false);
    console.log(videoArr)

    const getYoutubeVideoId = (data) => {
      if (typeof data === "string" && data) {
        let videoId = "";
        if (data.includes("youtu.be/")) {
          videoId = data.split("youtu.be/")[1].split("?")[0];
        } else if (data.includes("watch?v=")) {
          videoId = data.split("watch?v=")[1].split("&")[0];
        } else if (data.includes("embed/")) {
          videoId = data.split("embed/")[1];
        }
  
       return videoId;
      }
    };
    
  //   const thumbnailUrl = `https://img.youtube.com/vi/MHf6awe89xw/maxresdefault.jpg`;

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };
  const unsplashImageLinks = [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1496449903673-56d8f5e98571?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1481013540098-16052f52dc0d?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1507097782897-650c184e8b83?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=300&h=200&fit=crop"
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="container hidden md2:block">
        <Swiper
          // effect={"coverflow"}
          effect={"creative"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          // coverflowEffect={{
          //   rotate: 0,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 2.5,
          // }}
          creativeEffect={{
            prev: {
              translate: ["-120%", 0, -500],
            },
            next: {
              translate: ["120%", 0, -500],
            },
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCreative, Pagination, Navigation]}
          className="swiper_container mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
         
        >
          {
            videoArr.map((link,index)=>{
              const videoUrl = getYoutubeVideoId(link)
              return (
                <SwiperSlide key={index} >
                <div 
                  className="absolute inset-0 z-10" 
                  style={{ pointerEvents: activeIndex === index ? 'none' : 'auto' }}
                />
                <YTiframe
                  link={`https://youtube.com/embed/${videoUrl}`}
                  radius="10px"
                  width="37rem"
                  height="21rem"
                />
                
              </SwiperSlide>
              )
            })
          }

          <div className="slider-controler">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
      <div className="container block md2:hidden">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container mySwiper block sm2:hidden"
        >
          {
            videoArr.map((link,index)=>{
              const videoUrl = getYoutubeVideoId(link)
              return (
                <SwiperSlide key={index} >
                <YTiframe
                  link={`https://youtube.com/embed/${videoUrl}`}
                  radius="10px"
                  width="20rem"
                  height="11rem"
                />
              </SwiperSlide>
              )
            })
          }
         
         
          <div className="slider-controler">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default App;
