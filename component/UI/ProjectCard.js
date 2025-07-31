import Image from "next/image";
import React from "react";
import project1 from "@/component/assets/project1.png";

const ProjectCard = () => {
  return (
    <div className="max-w-[387px] h-fit rounded-[16px] relative">
      <Image
        alt="img"
        src={project1}
        className="max-w-[387px] h-[241px] rounded-[16px] object-cover"
      />
      <div
        className="w-[267px] h-[125px] rounded-[10px] flex flex-col items-center absolute left-[15%] top-[75%] bg-[#FFF]"
        style={{ boxShadow: "1px 2px 10px 0px #00000040" }}
      >
        <p className="font-[600] text-[10px] text-[#9D9D9D] mt-[12px]">
          Made Financial Planning
        </p>
        <p className="font-[600] text-[20px] text-[#000000] mt-[14px] flex items-center justify-center">
          Add Project
        </p>
        <p className="font-[600] text-[20px] text-[#000000] flex items-center justify-center">
          Title
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
