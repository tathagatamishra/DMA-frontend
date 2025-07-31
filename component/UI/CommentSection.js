import Image from "next/image";
import React, { useState } from "react";
import Reply from "./Reply";



function extractInitials(name) {
  // Split the name into words
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    // If there's only one word, return the first two letters capitalized
    return words[0].slice(0, 2).toUpperCase();
  } else if (words.length == 2) {
    // If there are two or more words, return the first letter of each word capitalized
    return words.map((word) => word[0].toUpperCase()).join("");
  } else {
    const first = words[0].slice(0, 1).toUpperCase();
    const second = words[1].slice(0, 1).toUpperCase();
    return first+second
  }
}

const CommentSection = ({comments}) => {
  console.log(comments);
  const [visibleReplyId, setVisibleReplyId] = useState(null);
  const [parent , setParent] = useState(false);

  const handleReplyClick = (replyId) => {
    console.log(replyId);
    // Show the clicked reply component or hide it if already visible
    setVisibleReplyId(visibleReplyId === replyId ? null : replyId);
  };
  return (
    <div>
      {comments.map((data, index) => (
        <div key={index}>
          <div className="hidden sm2:block w-full border border-[#EDEDED] mt-[14.48px]"></div>
          <div className="flex gap-[13px] sm2:gap-[14.48px] mt-[16px] sm2:mt-[14.48px]">
            <div className="min-h-[43.45px] min-w-[43.45px] h-[43.45px] w-[43.45px] rounded-full object-cover flex items-center justify-center bg-[#335BF5]">
              <p className="font-[600] text-[16px] text-[#FFF]">
                {extractInitials(data.name)}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full gap-[5.79px]">
                <div className="flex justify-between">
                  <p className="text-[16px] font-[600] ">{data.name}</p>
                  <p className="text-[12px] sm2:text-[14px] font-[500] text-[#555555]">
                    {data.date}
                  </p>
                </div>
                <p className="text-[14px] font-[500] text-[#555555]">
                  {data.content}
                </p>
                <div
                  className="flex gap-[5.79px] items-center"
                  onClick={() => handleReplyClick(data._id)}
                >
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.02924 1.05967C5.04724 1.05175 5.06694 1.04848 5.08653 1.05016C5.10612 1.05184 5.12498 1.05841 5.14137 1.06928C5.15775 1.08015 5.17114 1.09497 5.18031 1.11237C5.18948 1.12976 5.19412 1.14919 5.19382 1.16885V2.10828C5.19382 2.21633 5.23674 2.31995 5.31314 2.39635C5.38954 2.47275 5.49316 2.51567 5.60121 2.51567C6.14466 2.51567 7.24134 2.51974 8.28996 3.18541C9.09169 3.69383 9.91135 4.61941 10.4043 6.34347C9.57322 5.54255 8.62401 5.10828 7.79295 4.8777C7.28212 4.73661 6.75715 4.65298 6.22777 4.62838C6.01108 4.61886 5.79403 4.62103 5.57758 4.63489H5.56699L5.56291 4.63571H5.5621L5.60121 5.04146L5.56047 4.63571C5.45991 4.64581 5.3667 4.69294 5.29894 4.76792C5.23119 4.84291 5.19372 4.9404 5.19382 5.04146V5.9809C5.19382 6.06889 5.1042 6.1243 5.02924 6.09008L1.78318 3.70035C1.77216 3.69218 1.76074 3.68456 1.74896 3.67754C1.73125 3.66689 1.71659 3.65184 1.70641 3.63385C1.69623 3.61586 1.69088 3.59554 1.69088 3.57487C1.69088 3.55421 1.69623 3.53389 1.70641 3.5159C1.71659 3.49791 1.73125 3.48286 1.74896 3.47221C1.76075 3.46519 1.77217 3.45758 1.78318 3.4494L5.02924 1.05967ZM6.00859 5.43744C6.064 5.43744 6.12511 5.43989 6.19029 5.44233C6.5439 5.45863 7.03276 5.5124 7.5754 5.66314C8.65579 5.96297 9.93498 6.64249 10.7856 8.17264C10.8316 8.25523 10.9049 8.31926 10.9929 8.35374C11.081 8.38822 11.1782 8.39102 11.2681 8.36164C11.358 8.33226 11.4348 8.27255 11.4855 8.19273C11.5361 8.11291 11.5575 8.01795 11.5458 7.92413C11.1677 4.90132 10.0091 3.31089 8.72668 2.49774C7.71228 1.85407 6.66775 1.73023 6.00859 1.7066V1.16885C6.00867 1.00106 5.96345 0.836366 5.87772 0.692138C5.79198 0.54791 5.6689 0.429499 5.52147 0.349399C5.37403 0.269299 5.20771 0.230481 5.04005 0.237041C4.8724 0.2436 4.70961 0.295294 4.56889 0.386668L1.31469 2.7821C1.18015 2.86608 1.0692 2.98291 0.992281 3.1216C0.91536 3.26029 0.875 3.41628 0.875 3.57487C0.875 3.73347 0.91536 3.88945 0.992281 4.02814C1.0692 4.16684 1.18015 4.28367 1.31469 4.36765L4.56889 6.76308C4.70961 6.85445 4.8724 6.90615 5.04005 6.91271C5.20771 6.91927 5.37403 6.88045 5.52147 6.80035C5.6689 6.72025 5.79198 6.60184 5.87772 6.45761C5.96345 6.31338 6.00867 6.14869 6.00859 5.9809V5.43744Z"
                      fill="#1A1A1A"
                    />
                  </svg>
                  <p className="font-[600] text-[14px]">Reply</p>
                </div>
                {visibleReplyId === data._id && <Reply parent={data._id} blogId={data.blogId} setVisibleReplyId={setVisibleReplyId}/>}
              </div>
              {data.replies.length != 0 &&
                data.replies.map((d, index) => (
                  <div key={index}>
                    <div className="hidden sm2:block  w-full border border-[#EDEDED] mt-[14.48px]"></div>
                    <div className="flex gap-[14.48px] mt-[14.48px]">
                      <div className="min-h-[43.45px] min-w-[43.45px] h-[43.45px] w-[43.45px] rounded-full object-cover flex items-center justify-center bg-[#335BF5]">
                        <p className="font-[600] text-[16px] text-[#FFF]">
                          {extractInitials(d.name)}
                        </p>
                      </div>
                      <div className="flex flex-col w-full gap-[5.79px]">
                        <div className="flex justify-between">
                          <p className="text-[16px] font-[600]">{d.name}</p>
                          <p className="text-[14px] font-[500] text-[#555555]">
                            {d.date}
                          </p>
                        </div>
                        <p className="text-[14px] font-[500] text-[#555555]">
                          {d.content}
                        </p>
                        <div
                          className="flex gap-[5.79px] items-center"
                          onClick={() => handleReplyClick(d._id)}
                        >
                          <svg
                            width="12"
                            height="9"
                            viewBox="0 0 12 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.02924 1.05967C5.04724 1.05175 5.06694 1.04848 5.08653 1.05016C5.10612 1.05184 5.12498 1.05841 5.14137 1.06928C5.15775 1.08015 5.17114 1.09497 5.18031 1.11237C5.18948 1.12976 5.19412 1.14919 5.19382 1.16885V2.10828C5.19382 2.21633 5.23674 2.31995 5.31314 2.39635C5.38954 2.47275 5.49316 2.51567 5.60121 2.51567C6.14466 2.51567 7.24134 2.51974 8.28996 3.18541C9.09169 3.69383 9.91135 4.61941 10.4043 6.34347C9.57322 5.54255 8.62401 5.10828 7.79295 4.8777C7.28212 4.73661 6.75715 4.65298 6.22777 4.62838C6.01108 4.61886 5.79403 4.62103 5.57758 4.63489H5.56699L5.56291 4.63571H5.5621L5.60121 5.04146L5.56047 4.63571C5.45991 4.64581 5.3667 4.69294 5.29894 4.76792C5.23119 4.84291 5.19372 4.9404 5.19382 5.04146V5.9809C5.19382 6.06889 5.1042 6.1243 5.02924 6.09008L1.78318 3.70035C1.77216 3.69218 1.76074 3.68456 1.74896 3.67754C1.73125 3.66689 1.71659 3.65184 1.70641 3.63385C1.69623 3.61586 1.69088 3.59554 1.69088 3.57487C1.69088 3.55421 1.69623 3.53389 1.70641 3.5159C1.71659 3.49791 1.73125 3.48286 1.74896 3.47221C1.76075 3.46519 1.77217 3.45758 1.78318 3.4494L5.02924 1.05967ZM6.00859 5.43744C6.064 5.43744 6.12511 5.43989 6.19029 5.44233C6.5439 5.45863 7.03276 5.5124 7.5754 5.66314C8.65579 5.96297 9.93498 6.64249 10.7856 8.17264C10.8316 8.25523 10.9049 8.31926 10.9929 8.35374C11.081 8.38822 11.1782 8.39102 11.2681 8.36164C11.358 8.33226 11.4348 8.27255 11.4855 8.19273C11.5361 8.11291 11.5575 8.01795 11.5458 7.92413C11.1677 4.90132 10.0091 3.31089 8.72668 2.49774C7.71228 1.85407 6.66775 1.73023 6.00859 1.7066V1.16885C6.00867 1.00106 5.96345 0.836366 5.87772 0.692138C5.79198 0.54791 5.6689 0.429499 5.52147 0.349399C5.37403 0.269299 5.20771 0.230481 5.04005 0.237041C4.8724 0.2436 4.70961 0.295294 4.56889 0.386668L1.31469 2.7821C1.18015 2.86608 1.0692 2.98291 0.992281 3.1216C0.91536 3.26029 0.875 3.41628 0.875 3.57487C0.875 3.73347 0.91536 3.88945 0.992281 4.02814C1.0692 4.16684 1.18015 4.28367 1.31469 4.36765L4.56889 6.76308C4.70961 6.85445 4.8724 6.90615 5.04005 6.91271C5.20771 6.91927 5.37403 6.88045 5.52147 6.80035C5.6689 6.72025 5.79198 6.60184 5.87772 6.45761C5.96345 6.31338 6.00867 6.14869 6.00859 5.9809V5.43744Z"
                              fill="#1A1A1A"
                            />
                          </svg>
                          <p className="font-[600] text-[14px]">Reply</p>
                        </div>
                        {visibleReplyId === d._id && <Reply keyy={d.email} parent={data._id} blogId={d.blogId} setVisibleReplyId={setVisibleReplyId}/>}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
