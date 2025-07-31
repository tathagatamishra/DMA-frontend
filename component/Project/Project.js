"use client";
import React, { useState } from "react";
import ProjectCard from "../UI/ProjectCard";
import Image from "next/image";
import abc from "@/component/assets/abc.png";
import project1 from "@/component/assets/project1.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const Project = () => {
  const [review, setReview] = useState("1");
  const [isOpen , setIsOpen] = useState(false);
  return (
    <div className="w-screen flex flex-col items-center overflow-y-scroll">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Header setIsOpen={setIsOpen}/>
      <div
        className="w-full h-[335px] bg-cover bg-center px-[130px] pt-[27px]"
        style={{
          backgroundImage: `url('projects.png')`,
        }}
      >
        <div className="flex flex-col gap-[33px]">
          <button className="w-[115px] h-[36px] rounded-[18px] flex items-center justify-center bg-[#D9D9D92B]">
            <p className="text-[20px] font-[600] text-[#FFF]">Project</p>
          </button>
          <p className="text-[36px] font-[700] text-[#FFF]">Projects</p>
          <p className="text-[18px] font-[500] text-[#FFF] mt-[7px] text-justify">
            Quisque nec non amet quis. Varius tellus justo odio parturient
            mauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifend
            luctus ut. Id sed faucibus bibendum augue id cras purus. At eget
            euismod cursus non. Molestie dignissim sed volutpat feugiat vel. s
            ut. Id sed faucibus bibendum augue id cras purus. At eget euismod
            cursus non. Molestie dignissim sed volutpat feugiat vel.
          </p>
        </div>
      </div>
      <div className="flex gap-[28px] items-center justify-center pt-[48px]">
        <div className="h-fit px-[17px] w-fit bg-[#335BF5] rounded-[50px]">
           <p className="font-[600] text-[16px] text-[#FFF] flex items-center justify-center">All</p>
        </div>
        <p className="font-[600] text-[16px] text-[#747474] flex items-center justify-center">Project title</p>
        <p className="font-[600] text-[16px] text-[#747474] flex items-center justify-center">Project title</p>
        <p className="font-[600] text-[16px] text-[#747474] flex items-center justify-center">Project title</p>
        <p className="font-[600] text-[16px] text-[#747474] flex items-center justify-center">Project title</p>
      </div>
      <div className="flex flex-wrap justify-between gap-y-[114px] px-[115px] h-fit pt-[50px] pb-[163px]">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>

      {/* <div className="w-full pt-[60px] px-[130px] flex justify-between">
        <div className="w-[60%]">
          <p className="font-[700] text-[32px]">
            E-Commerce Platform Development
          </p>
          <p className="font-[500] text-[18px] mt-[30px]">
            Our objective for this project was to develop a comprehensive
            financial management platform that provided users with a centralized
            dashboard for managing their finances. We wanted to create a
            platform that was user-friendly, easy to navigate, and offered a
            range of features to help users track their spend
          </p>
          <div className="flex w-full justify-between mt-[40px]">
            <div className="flex flex-col gap-[22px] justify-center">
              <p className="font-[600] text-[36.15px]">4.3K</p>
              <p className="font-[400] text-[15.82px]">Business Setup Growth</p>
            </div>
            <div className="flex flex-col gap-[22px] justify-center">
              <p className="font-[600] text-[36.15px]">1.77K</p>
              <p className="font-[400] text-[15.82px]">Business Setup Growth</p>
            </div>
            <div className="flex flex-col gap-[22px] justify-center">
              <p className="font-[600] text-[36.15px]">245K</p>
              <p className="font-[400] text-[15.82px]">Business Setup Growth</p>
            </div>
          </div>
        </div>

        <div
          className="w-[32%] h-[274px] border border-[#DEDEDE] rounded-[12px] pl-[20px] pr-[16px] pt-[18px]"
          style={{ boxShadow: "1px 2px 26px 0px #00000021" }}
        >
          <p className="font-[600] text-[20px]">Project Information</p>
          <div className="flex justify-between items-center mt-[20px]">
            <p className="font-[600] text-[16px] leading-[32px]">Client</p>
            <p className="font-[400] text-[16px] text-[#787878] leading-[32px]">
              Maverick Nguyen
            </p>
          </div>
          <div className="w-full border border-[#DEDEDE] mt-[6px]"></div>
          <div className="flex justify-between items-center mt-[12px]">
            <p className="font-[600] text-[16px] leading-[32px]">
              Completed Date
            </p>
            <p className="font-[400] text-[16px] text-[#787878] leading-[32px]">
              24/05/2024
            </p>
          </div>
          <div className="w-full border border-[#DEDEDE] mt-[6px]"></div>
          <div className="flex justify-between items-center mt-[12px]">
            <p className="font-[600] text-[16px] leading-[32px]">Manager</p>
            <p className="font-[400] text-[16px] text-[#787878] leading-[32px]">
              John Doe
            </p>
          </div>
          <div className="w-full border border-[#DEDEDE] mt-[6px]"></div>
          <div className="flex justify-between items-center mt-[12px]">
            <p className="font-[600] text-[16px] leading-[32px]">Location</p>
            <p className="font-[400] text-[16px] text-[#787878] leading-[32px]">
              New York, Usa
            </p>
          </div>
        </div>
      </div>

      <div className="w-full pt-[65px] px-[130px] flex justify-between">
        <div className="w-[53%] h-[386px] rounded-[20px]">
          <Image
            src={project1}
            className="w-full h-[386px] rounded-[20px] object-cover"
          ></Image>
        </div>
        <div className="w-[42%]">
          <p className="font-[600] text-[32px] mt-[32px]">How We Did It</p>
          <p className="font-[500] text-[18px] mt-[17px]">
            We began by conducting extensive market research to identify the key
            pain points of existing e-commerce platforms. Based on our findings,
            we developed a
          </p>
          <div className="flex flex-col gap-[19px] mt-[20px]">
            <div className="flex gap-[8px] items-center ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect
                  width="28"
                  height="28"
                  fill="url(#pattern0_19_1148)"
                  className="flex items-center justify-center"
                />
                <defs>
                  <pattern
                    id="pattern0_19_1148"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use href="#image0_19_1148" transform="scale(0.0111111)" />
                  </pattern>
                  <image
                    id="image0_19_1148"
                    width="90"
                    height="90"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFK0lEQVR4nO2dS4hcRRSGT4xP4mMjjI9x7jl3WoVsBKMrlRHxQUBRFyqoEd8IEcYYRF0I7oyuQkBXgiu3OsZFRHduFB/EGGh04WPhgziv6D3n9gzM5ErVbSXJTE96uqtunXu7fjjQ9MxUV33U1K1z6tRpgKioqKioqKioqKioqKh+VWwFkhuB+CkgeQuIZwDleyD+CUgWAHnZmnlt3it/NgMkb9q/SeUG20bUOmrJOCTyAqB8DCh/A0kxlKEcB+SDgDIN43IljLTGiwsAeRegfAbEq0PD7Wm8AiifAmWPQlKcDyOj7cWFdqYR/+4Pbs+Z/heQvA7pwiXQWO0ozgHkl4BkvnLAa20eKNtr+9QoUX4LoBxVAPh0+wEoux1qL7MmIr8NxCcUQO1hpm98AFrFeVBLJR0E4i/Dg5R+7VuY7LSgVjL/ji62aVSxmW1hmt0GtVAi9wNxJzg0GhS2cYjyh0C1UJ71uyeWioxXAfkZUKlE7rPOQXBI4hB2/iCoklnXkJfCwxG3VsZV7gQVSpeuruWDj/qFLceh1ZkMC9nsPc22KDQM8g77m7D7bOuMKABBVRgfCOdWq/b4xDXoE4D5VLWQp4qzAeVI+MFLtWbiNZUGosooXDGitqe6eDLJnIIBF4FszjLwLuSXFQy2CGvZXv9hT5I/wg9UQtuf9ijOm5AfUzDIQoWl2cMeQZuDVAWDJBV2yF9KQBMic8hL9jmT8GXWzOsyT2STbfEKTPDl7kGbvIsmQE5455qxpfzKgG0+7x60SW6pN+RlILln3bFRNjZYu/yBjzStxUZCNrpKrhiw7UW36Wc2F65hy8XJIn514PYnZQc4U5lw2EzICe8c6tAi5SccgjZZnQ1bLoyQ7xr6IBnlDXAm4o+CgyOFkJ0/EOsUEsUKlotT7bA70MS/BgdI2mby/zP6Z4egVWSAFvog2zV61h3ogVzUEYBM3aVKJWjkzyGR56z7ivx1Dddkj6BdnaigvA9QbDnt7PHd2kJ2vnQQ/+KkU0kH1zZenDUQbA2QnT8MnWzveBW2F+eu/wGbhK0Gsvvt3YyTTqUb5R73CVsXZMcOiysXHPlHuOafSweGrQ6ytX1ag0pte7LRG/YWQH5H1RZuI0v4cb1hUpQjm5rZOmdyaRN8vfbAf7uvma11JnsJ/JeDOei8o9jPzObrVM5kP0dZdos37aWzeCbYWiFb2+2cc3mu5u2OSnvjZUTVcvHfbF7ZdJ/7H5ypEuCt8+2+Ox4css8EmnKAuzx3vn1G2Doge04Js0mO3ss/tHvC1gLZe5JjVUnoaGIr2dgpn0t8t54rdvmL4F3Xzl5UyYkLyjFAfs16XiTvqcn7M2HRsWIbVCKTiB16wBQM9DRUJhOwJ/luBCEfrb5qTZrfHK+/VSVzyTH0LKOqjPdDMJlru+b6buOXDP6q9+lQZbA7k/ZiemgY5M0WYaJDoEJJdqsSR6JwPJOXgbI7QJVQ7m1cYRTKHwCVMuVxtDgWNBTkFSB+GlSrLPnTqfetrVxZiZ8NS//U8gG5aJ83tRLmCRB/Ua8qM53AJX2GKgVknBr1JTP3h98nu3LXUeGtAdOnNL8JGqUpG4jaY8OM4QHP2iic6VNjNVZs6xbq/i0A4GO2UHdr7mIYGSXmWCx7BEg+8evo2LYP2TO+kSo9v55MlQBzA4D4w/LbKIYGvNBta7e/lIDaq9hq89mIn7SZmiYbyOQgl18PMn/S14PMd9873P2dffYWq82Fi18PEhUVFRUVFRUVFRUVFRUVBf3qX6uHapopQMBDAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>

              <p className="text-[#2F2F2F] text-[20px] font-[600]">
                Identification Of Monthly Income
              </p>
            </div>
            <div className="flex gap-[8px] items-center ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect
                  width="28"
                  height="28"
                  fill="url(#pattern0_19_1148)"
                  className="flex items-center justify-center"
                />
                <defs>
                  <pattern
                    id="pattern0_19_1148"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use href="#image0_19_1148" transform="scale(0.0111111)" />
                  </pattern>
                  <image
                    id="image0_19_1148"
                    width="90"
                    height="90"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFK0lEQVR4nO2dS4hcRRSGT4xP4mMjjI9x7jl3WoVsBKMrlRHxQUBRFyqoEd8IEcYYRF0I7oyuQkBXgiu3OsZFRHduFB/EGGh04WPhgziv6D3n9gzM5ErVbSXJTE96uqtunXu7fjjQ9MxUV33U1K1z6tRpgKioqKioqKioqKioqKh+VWwFkhuB+CkgeQuIZwDleyD+CUgWAHnZmnlt3it/NgMkb9q/SeUG20bUOmrJOCTyAqB8DCh/A0kxlKEcB+SDgDIN43IljLTGiwsAeRegfAbEq0PD7Wm8AiifAmWPQlKcDyOj7cWFdqYR/+4Pbs+Z/heQvA7pwiXQWO0ozgHkl4BkvnLAa20eKNtr+9QoUX4LoBxVAPh0+wEoux1qL7MmIr8NxCcUQO1hpm98AFrFeVBLJR0E4i/Dg5R+7VuY7LSgVjL/ji62aVSxmW1hmt0GtVAi9wNxJzg0GhS2cYjyh0C1UJ71uyeWioxXAfkZUKlE7rPOQXBI4hB2/iCoklnXkJfCwxG3VsZV7gQVSpeuruWDj/qFLceh1ZkMC9nsPc22KDQM8g77m7D7bOuMKABBVRgfCOdWq/b4xDXoE4D5VLWQp4qzAeVI+MFLtWbiNZUGosooXDGitqe6eDLJnIIBF4FszjLwLuSXFQy2CGvZXv9hT5I/wg9UQtuf9ijOm5AfUzDIQoWl2cMeQZuDVAWDJBV2yF9KQBMic8hL9jmT8GXWzOsyT2STbfEKTPDl7kGbvIsmQE5455qxpfzKgG0+7x60SW6pN+RlILln3bFRNjZYu/yBjzStxUZCNrpKrhiw7UW36Wc2F65hy8XJIn514PYnZQc4U5lw2EzICe8c6tAi5SccgjZZnQ1bLoyQ7xr6IBnlDXAm4o+CgyOFkJ0/EOsUEsUKlotT7bA70MS/BgdI2mby/zP6Z4egVWSAFvog2zV61h3ogVzUEYBM3aVKJWjkzyGR56z7ivx1Dddkj6BdnaigvA9QbDnt7PHd2kJ2vnQQ/+KkU0kH1zZenDUQbA2QnT8MnWzveBW2F+eu/wGbhK0Gsvvt3YyTTqUb5R73CVsXZMcOiysXHPlHuOafSweGrQ6ytX1ag0pte7LRG/YWQH5H1RZuI0v4cb1hUpQjm5rZOmdyaRN8vfbAf7uvma11JnsJ/JeDOei8o9jPzObrVM5kP0dZdos37aWzeCbYWiFb2+2cc3mu5u2OSnvjZUTVcvHfbF7ZdJ/7H5ypEuCt8+2+Ox4css8EmnKAuzx3vn1G2Doge04Js0mO3ss/tHvC1gLZe5JjVUnoaGIr2dgpn0t8t54rdvmL4F3Xzl5UyYkLyjFAfs16XiTvqcn7M2HRsWIbVCKTiB16wBQM9DRUJhOwJ/luBCEfrb5qTZrfHK+/VSVzyTH0LKOqjPdDMJlru+b6buOXDP6q9+lQZbA7k/ZiemgY5M0WYaJDoEJJdqsSR6JwPJOXgbI7QJVQ7m1cYRTKHwCVMuVxtDgWNBTkFSB+GlSrLPnTqfetrVxZiZ8NS//U8gG5aJ83tRLmCRB/Ua8qM53AJX2GKgVknBr1JTP3h98nu3LXUeGtAdOnNL8JGqUpG4jaY8OM4QHP2iic6VNjNVZs6xbq/i0A4GO2UHdr7mIYGSXmWCx7BEg+8evo2LYP2TO+kSo9v55MlQBzA4D4w/LbKIYGvNBta7e/lIDaq9hq89mIn7SZmiYbyOQgl18PMn/S14PMd9873P2dffYWq82Fi18PEhUVFRUVFRUVFRUVFRUVBf3qX6uHapopQMBDAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>

              <p className="text-[#2F2F2F] text-[20px] font-[600]">
                Identification Of Monthly Income
              </p>
            </div>
            <div className="flex gap-[8px] items-center ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect
                  width="28"
                  height="28"
                  fill="url(#pattern0_19_1148)"
                  className="flex items-center justify-center"
                />
                <defs>
                  <pattern
                    id="pattern0_19_1148"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use href="#image0_19_1148" transform="scale(0.0111111)" />
                  </pattern>
                  <image
                    id="image0_19_1148"
                    width="90"
                    height="90"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFK0lEQVR4nO2dS4hcRRSGT4xP4mMjjI9x7jl3WoVsBKMrlRHxQUBRFyqoEd8IEcYYRF0I7oyuQkBXgiu3OsZFRHduFB/EGGh04WPhgziv6D3n9gzM5ErVbSXJTE96uqtunXu7fjjQ9MxUV33U1K1z6tRpgKioqKioqKioqKioqKh+VWwFkhuB+CkgeQuIZwDleyD+CUgWAHnZmnlt3it/NgMkb9q/SeUG20bUOmrJOCTyAqB8DCh/A0kxlKEcB+SDgDIN43IljLTGiwsAeRegfAbEq0PD7Wm8AiifAmWPQlKcDyOj7cWFdqYR/+4Pbs+Z/heQvA7pwiXQWO0ozgHkl4BkvnLAa20eKNtr+9QoUX4LoBxVAPh0+wEoux1qL7MmIr8NxCcUQO1hpm98AFrFeVBLJR0E4i/Dg5R+7VuY7LSgVjL/ji62aVSxmW1hmt0GtVAi9wNxJzg0GhS2cYjyh0C1UJ71uyeWioxXAfkZUKlE7rPOQXBI4hB2/iCoklnXkJfCwxG3VsZV7gQVSpeuruWDj/qFLceh1ZkMC9nsPc22KDQM8g77m7D7bOuMKABBVRgfCOdWq/b4xDXoE4D5VLWQp4qzAeVI+MFLtWbiNZUGosooXDGitqe6eDLJnIIBF4FszjLwLuSXFQy2CGvZXv9hT5I/wg9UQtuf9ijOm5AfUzDIQoWl2cMeQZuDVAWDJBV2yF9KQBMic8hL9jmT8GXWzOsyT2STbfEKTPDl7kGbvIsmQE5455qxpfzKgG0+7x60SW6pN+RlILln3bFRNjZYu/yBjzStxUZCNrpKrhiw7UW36Wc2F65hy8XJIn514PYnZQc4U5lw2EzICe8c6tAi5SccgjZZnQ1bLoyQ7xr6IBnlDXAm4o+CgyOFkJ0/EOsUEsUKlotT7bA70MS/BgdI2mby/zP6Z4egVWSAFvog2zV61h3ogVzUEYBM3aVKJWjkzyGR56z7ivx1Dddkj6BdnaigvA9QbDnt7PHd2kJ2vnQQ/+KkU0kH1zZenDUQbA2QnT8MnWzveBW2F+eu/wGbhK0Gsvvt3YyTTqUb5R73CVsXZMcOiysXHPlHuOafSweGrQ6ytX1ag0pte7LRG/YWQH5H1RZuI0v4cb1hUpQjm5rZOmdyaRN8vfbAf7uvma11JnsJ/JeDOei8o9jPzObrVM5kP0dZdos37aWzeCbYWiFb2+2cc3mu5u2OSnvjZUTVcvHfbF7ZdJ/7H5ypEuCt8+2+Ox4css8EmnKAuzx3vn1G2Doge04Js0mO3ss/tHvC1gLZe5JjVUnoaGIr2dgpn0t8t54rdvmL4F3Xzl5UyYkLyjFAfs16XiTvqcn7M2HRsWIbVCKTiB16wBQM9DRUJhOwJ/luBCEfrb5qTZrfHK+/VSVzyTH0LKOqjPdDMJlru+b6buOXDP6q9+lQZbA7k/ZiemgY5M0WYaJDoEJJdqsSR6JwPJOXgbI7QJVQ7m1cYRTKHwCVMuVxtDgWNBTkFSB+GlSrLPnTqfetrVxZiZ8NS//U8gG5aJ83tRLmCRB/Ua8qM53AJX2GKgVknBr1JTP3h98nu3LXUeGtAdOnNL8JGqUpG4jaY8OM4QHP2iic6VNjNVZs6xbq/i0A4GO2UHdr7mIYGSXmWCx7BEg+8evo2LYP2TO+kSo9v55MlQBzA4D4w/LbKIYGvNBta7e/lIDaq9hq89mIn7SZmiYbyOQgl18PMn/S14PMd9873P2dffYWq82Fi18PEhUVFRUVFRUVFRUVFRUVBf3qX6uHapopQMBDAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>

              <p className="text-[#2F2F2F] text-[20px] font-[600]">
                Identification Of Monthly Income
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pl-[128px] pr-[130px] pt-[100px] flex justify-between">
        <div className="w-[54%] flex flex-col mt-[16px]">
          <p className="font-[700] text-[32px]">
            Final Outcome Of This Project
          </p>
          <p className="font-[500] text-[18px] mt-[15px]">
            Online banking allows you to manage your finances from anywhere,
            anytime. You can access your bank account, check your balance, view
            transactions, and transfer money without having to visit a physical
            bank.
          </p>
          <button className="flex items-center justify-center w-[230px] h-[62px] rounded-[37px] bg-[#335BF5] mt-[31px]">
            <p className="font-[700] text-[18px] text-[#FFF]">Start Now</p>
          </button>
        </div>
        <div className="w-[43%] h-[325px] rounded-[20px]">
          <Image
            src={abc}
            className="h-[325px] rounded-[20px] object-cover"
          ></Image>
        </div>
      </div>

      <div className="w-full pl-[128px] pr-[130px] pb-[65px] pt-[93px]">
        <div className="rounded-[20px] h-[368px] min-w-[1182px] bg-[#EFEFEF] flex flex-col items-center">
          <div className="flex flex-col gap-[29px] mt-[55px]">
            <p className="font-[600] text-[32px] flex items-center justify-center">Trusted By Professionals</p>
            <p className="font-[500] text-[24px]">
              “I’ m Extremely Satisfied With Your Services! Your Meticulous
              Financial<br className="text-center"/> Planning Helped Me Manage My Assets Efficiently &
              Achieve <br className="text-center"/>My Financial Goals.”
            </p>
            <p className="font-[600] text-[24px] flex items-center justify-center">
              Maverick Nguyen // Ex-CTO, Dropbox
            </p>
          </div>
          <div className="flex gap-[15px] mt-[31.82px]">
            <div
              className="h-[16px] w-[16px] border-[#000000] border-[0.77px] flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => {
                setReview(1);
              }}
            >
              {review == 1 && (
                <div className="w-[8px] h-[8px] bg-[#000000] rounded-full"></div>
              )}
            </div>
            <div
              className="h-[16px] w-[16px] border-[#000000] border-[0.77px] flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => {
                setReview(2);
              }}
            >
              {review == 2 && (
                <div className="w-[8px] h-[8px] bg-[#000000] rounded-full"></div>
              )}
            </div>
            <div
              className="h-[16px] w-[16px] border-[#000000] border-[0.77px] flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => {
                setReview(3);
              }}
            >
              {review == 3 && (
                <div className="w-[8px] h-[8px] bg-[#000000] rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      </div> */}
      <Footer></Footer>
    </div>
  );
};

export default Project;
