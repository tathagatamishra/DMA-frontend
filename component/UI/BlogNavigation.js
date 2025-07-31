import React, { useState, useEffect } from "react";
import Parser from "./Parser";

const BlogNavigation = ({ ids, titles, indices }) => {
  const [previousPost, setPreviousPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    const totalPosts = Object.keys(indices).length;

    Object.keys(indices).forEach((currentIndex) => {
      const idx = parseInt(currentIndex);

      if (idx > 0) {
        setPreviousPost({
          _id: ids[idx - 1],
          title: titles[idx - 1],
        });
      }

      if (idx < totalPosts - 1) {
        setNextPost({
          _id: ids[idx + 1],
          title: titles[idx + 1],
        });
      }
    });
  }, [ids, titles, indices]);

  return (
    <div className="mt-8 sm:mt-[40px]">
      <h2 className="font-semibold text-xl sm:text-[20px] leading-[30px] xsm:text-[24px] !text-[20px]">
        Recent Blogs
      </h2>
      <div className="sm:flex flex-col gap-4 mt-4">
        <div className="border-t border-[#EDEDED]" />
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previousPost && (
            <div
              className="flex flex-col cursor-pointer"
              onClick={() =>
                (window.location.href = `/blogs/${previousPost._id}`)
              }
            >
              <span className="font-semibold text-sm sm:text-base text-[#335BF5]">
                Previous
              </span>
              <p className="font-semibold text-base sm:text-lg text-black">
                {Parser(
                  previousPost.title.length > 40
                    ? previousPost.title.slice(0, 40) + "..."
                    : previousPost.title
                )}
              </p>
            </div>
          )}

          <div className="hidden sm:block h-16 border-l border-[#EDEDED]" />

          {nextPost && (
            <div
              className="flex flex-col items-end cursor-pointer"
              onClick={() => (window.location.href = `/blogs/${nextPost._id}`)}
            >
              <span className="font-semibold text-sm sm:text-base text-[#335BF5]">
                Next
              </span>
              <p className="font-semibold text-base sm:text-lg text-black text-right">
                {Parser(
                  nextPost.title.length > 40
                    ? nextPost.title.slice(0, 40) + "..."
                    : nextPost.title
                )}
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-[#EDEDED]" />
      </div>
    </div>
  );
};

export default BlogNavigation;
