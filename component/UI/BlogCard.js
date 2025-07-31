import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Parser from "./Parser";

const BlogCard = (props) => {
  const router = useRouter();
  return (
    <div
      className="h-fit min-w-[258px]  xsm1:min-w-[318.68px] sm:min-w-[416px] flex flex-col gap-[18.39px] sm:gap-[24px] cursor-pointer xl:px-[32px] px-[22px]"
      onClick={() => {
        router.push(`/blogs/${props.id}`);
      }}
    >
      <img
        alt="img"
        src={`${props.img}`}
        className="w-full h-[180px] xsm1:h-[229.82px] sm:h-[300px]  object-[initial] rounded-[12px]"
      />
      <div className="flex flex-col gap-[6.13px] sm:gap-[8px]">
        <p className="font-[600] text-[10.72px] sm:text-[14px] leading-[16.09px] sm:leading-[21px]">
          {Parser(props.category)}
        </p>
        <p
          className="font-[700] text-[18.39px] sm:text-[24px] leading-[25.74px] sm:leading-[33.6px]"
          style={{
            display: "-webkit-box",
            webkitLineClamp: "1",
            webkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {Parser(props.title)}
        </p>
        <p
          className="font-[400] text-[12.26px] sm:text-[16px] leading-[18.39px] sm:leading-[24px]"
          style={{
            display: "-webkit-box",
            webkitLineClamp: "2",
            webkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {Parser(props.content)}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
