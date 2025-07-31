import React, { useState } from 'react'
import { IoMdPlay } from "react-icons/io";
const VideoCard = ({ytCode}) => {
    const [isPlaying, setIsPlaying] = useState(false);

//   const thumbnailUrl = `https://img.youtube.com/vi/MHf6awe89xw/maxresdefault.jpg`;

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };
  return (
    <div
    className="w-[597px] h-full rounded-[14px] flex items-center justify-center"
    style={{ backgroundImage: isPlaying ? '' : `url(https://img.youtube.com/vi/${ytCode}/maxresdefault.jpg)` ,
    backgroundSize: 'cover',   
    backgroundPosition: 'center' }}
  >
    {isPlaying ? (
      <iframe
        width="100%"
        height="100%"
        className="rounded-[14px]"
        src={`https://www.youtube.com/embed/${ytCode}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : (
      <div
        className="w-[55px] h-[55px] rounded-full flex items-center justify-center bg-[#335BF5]"
        onClick={handlePlayButtonClick}
      >
        <IoMdPlay className="text-[16px] text-[#FFF]" />
      </div>
    )}
  </div> 
  )
}

export default VideoCard
