import Image from "next/image";
import React from "react";
import blogcard1 from "@/component/assets/blogcard1.png";
import { useRouter } from "next/navigation";
import Parser from "./Parser";

const BlogCardForBlogPage = (props) => {
  const router = useRouter();
  return (
    <div
      className="w-full h-fit cursor-pointer"
      onClick={() => {
        router.push(`/blogs/${props.id}`);
      }}
    >
      <img
        alt="img"
        src={props.img}
        className="w-full h-auto aspect-[16/9] sm2:h-[331px] rounded-[20px] object-[initial]"
      />
      <div className="flex flex-wrap gap-[16px] mt-[10.08px] sm2:mt-[12px]">
        <div className="flex gap-[4px]  items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="flex items-center justify-center"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33464 3.33366C3.33464 1.86033 4.52797 0.666992 6.0013 0.666992C7.47464 0.666992 8.66797 1.86033 8.66797 3.33366C8.66797 4.80699 7.47464 6.00033 6.0013 6.00033C4.52797 6.00033 3.33464 4.80699 3.33464 3.33366Z"
              fill="black"
            />
            <path
              d="M0.667969 9.33366C0.667969 7.56033 4.2213 6.66699 6.0013 6.66699C7.7813 6.66699 11.3346 7.56033 11.3346 9.33366V11.3337H0.667969V9.33366Z"
              fill="black"
            />
          </svg>
          <p className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px] whitespace-nowrap">
            {Parser(props.author)}
          </p>
        </div>
        <div className="hidden sm2:flex gap-[4px] items-center justify-center">
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            className="flex items-center justify-center"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.332 2.00033H11.6654V0.666992H10.332V2.00033H3.66536V0.666992H2.33203V2.00033H1.66536C0.932031 2.00033 0.332031 2.60033 0.332031 3.33366V14.0003C0.332031 14.7337 0.932031 15.3337 1.66536 15.3337H12.332C13.0654 15.3337 13.6654 14.7337 13.6654 14.0003V3.33366C13.6654 2.60033 13.0654 2.00033 12.332 2.00033ZM12.332 14.0003H1.66536V5.33366H12.332V14.0003Z"
              fill="black"
            />
          </svg>

          <p className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px]  whitespace-nowrap">
            {Parser(props.date)}
          </p>
        </div>
        <div className="flex gap-[4px] items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="flex items-center justify-center"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.332 0.333008H1.66536C0.932031 0.333008 0.332031 0.933008 0.332031 1.66634V13.6663L2.9987 10.9997H12.332C13.0654 10.9997 13.6654 10.3997 13.6654 9.66634V1.66634C13.6654 0.933008 13.0654 0.333008 12.332 0.333008Z"
              fill="black"
            />
          </svg>

          <p className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px] whitespace-nowrap">
            {props.comments} Comments
          </p>
        </div>
        <div className="flex gap-[4px] items-center justify-center">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            className="flex items-center justify-center"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.389 5.77219C17.3644 5.71664 16.7688 4.39547 15.4448 3.07148C13.6807 1.30734 11.4525 0.375 8.99999 0.375C6.54749 0.375 4.31929 1.30734 2.55515 3.07148C1.23117 4.39547 0.632806 5.71875 0.611009 5.77219C0.579026 5.84413 0.5625 5.92198 0.5625 6.0007C0.5625 6.07943 0.579026 6.15728 0.611009 6.22922C0.635618 6.28477 1.23117 7.60523 2.55515 8.92922C4.31929 10.6927 6.54749 11.625 8.99999 11.625C11.4525 11.625 13.6807 10.6927 15.4448 8.92922C16.7688 7.60523 17.3644 6.28477 17.389 6.22922C17.421 6.15728 17.4375 6.07943 17.4375 6.0007C17.4375 5.92198 17.421 5.84413 17.389 5.77219ZM8.99999 10.5C6.83577 10.5 4.94507 9.7132 3.37992 8.16211C2.73774 7.52344 2.19137 6.79519 1.75781 6C2.1912 5.20471 2.73759 4.47643 3.37992 3.83789C4.94507 2.2868 6.83577 1.5 8.99999 1.5C11.1642 1.5 13.0549 2.2868 14.6201 3.83789C15.2635 4.47633 15.8111 5.20459 16.2457 6C15.7387 6.94641 13.5302 10.5 8.99999 10.5ZM8.99999 2.625C8.33248 2.625 7.67996 2.82294 7.12494 3.19379C6.56993 3.56464 6.13735 4.09174 5.8819 4.70844C5.62645 5.32514 5.55962 6.00374 5.68984 6.65843C5.82007 7.31312 6.14151 7.91448 6.61351 8.38649C7.08551 8.85849 7.68688 9.17993 8.34156 9.31015C8.99625 9.44038 9.67485 9.37354 10.2915 9.11809C10.9083 8.86265 11.4354 8.43007 11.8062 7.87505C12.1771 7.32003 12.375 6.66751 12.375 6C12.3741 5.10518 12.0182 4.24728 11.3855 3.61454C10.7527 2.98181 9.89481 2.62593 8.99999 2.625ZM8.99999 8.25C8.55499 8.25 8.11997 8.11804 7.74996 7.87081C7.37995 7.62357 7.09156 7.27217 6.92126 6.86104C6.75097 6.4499 6.70641 5.9975 6.79323 5.56105C6.88004 5.12459 7.09433 4.72368 7.409 4.40901C7.72367 4.09434 8.12458 3.88005 8.56104 3.79323C8.9975 3.70642 9.4499 3.75097 9.86103 3.92127C10.2722 4.09157 10.6236 4.37996 10.8708 4.74997C11.118 5.11998 11.25 5.55499 11.25 6C11.25 6.59674 11.0129 7.16903 10.591 7.59099C10.169 8.01295 9.59673 8.25 8.99999 8.25Z"
              fill="black"
            />
          </svg>

          <p className="font-[500] sm2:font-[400] text-[11.23px] sm2:text-[16px] whitespace-nowrap">
            {props.views}
          </p>
        </div>
      </div>
      <p className="font-[600] text-[15.5px] sm2:text-[24px] mt-[12.88px] sm2:mt-[19px]">
        {Parser(props.title)}
      </p>
      {/* <div className="flex gap-4">
  <div className="w-[2px] bg-black mt-[6.88px] sm2:mt-[19px]"></div>
  <div>
    <p className="font-[600] text-[12.5px] sm2:text-[20px] mt-[6.88px] sm2:mt-[19px] italic">
      {props.summary}
    </p>
    <p className="font-[700] sm2:font-[700] text-[11.23px] sm2:text-[20px] whitespace-nowrap mt-[10px]">
      {props?.author}
    </p>
  </div>
</div> */}
      <p className="font-[400] text-[14px] sm2:text-[18px] text-[#555555] mt-[8px] sm2:mt-[20px]">
        {Parser(props.desc)}
      </p>
      <p
        className="font-[600] text-[14px] sm2:text-[18px] leading-[27px] underline underline-offset-[6px] mt-[3px] sm2:mt-[4px] cursor-pointer"
        onClick={() => {
          router.push(`/blogs/${props.id}`);
        }}
      >
        Read More
      </p>
    </div>
  );
};

export default BlogCardForBlogPage;
