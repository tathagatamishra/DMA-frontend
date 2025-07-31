"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import Testimonials from "@/component/Testimonial/Testimonials";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import AdminUpload from "../AdminUi/AdminUpload";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "@/component/UI/Loader";

export default function EditTestimonials() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Section visibility states
  const [hideHero, setHideHero] = useState(false);
  const [hideClient, setHideClient] = useState(false);
  const [hideService, setHideService] = useState(false);

  // Main testimonial data state
  const [testimonialData, setTestimonialData] = useState({
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: ""
    },
    client: {
      heading: "",
      video: []
    },
    service: {
      heading: "",
      video: []
    }
  });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle hero section changes
  const handleHeroChange = (field, value) => {
    setTestimonialData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }));
  };

  // Handle section changes (client/service)
  const handleSectionChange = (section, field, value) => {
    setTestimonialData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle video URL changes
  const handleVideoChange = (section, index, value) => {
    setTestimonialData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        video: prev[section].video.map((v, i) => i === index ? value : v)
      }
    }));
  };

  // Add new video field
  const addVideo = (section) => {
    setTestimonialData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        video: [...prev[section].video, ""]
      }
    }));
  };

  // Remove video field
  const removeVideo = (section, index) => {
    setTestimonialData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        video: prev[section].video.filter((_, i) => i !== index)
      }
    }));
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    setIsLoading(true);
    try {
      const fileName = Date.now() + "_" + file.name;
      const storageRef = ref(storage, `testimonials/${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      handleHeroChange("image", url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  // Save changes
  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editTestimonial`, testimonialData);
      console.log("Testimonials updated successfully");
    } catch (error) {
      console.error("Error updating testimonials:", error);
    }
  };

  // Fetch initial data
  const getTestimonialData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getTestimonial`);
      setTestimonialData(data.testimonialData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching testimonial data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTestimonialData();
  }, []);

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      {isLoading && <Loader />}

      <AdminNav page="EDIT TESTIMONIALS" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Testimonials testimonialData={testimonialData} usedIn="admin" />
          </div>
        )}

        <div className="AdminForm">
          {/* Hero Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Hero Section</p>
              {hideHero ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideHero(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideHero(true)}
                />
              )}
            </div>

            {!hideHero && (
              <>
                <AdminInput
                  label="Tag"
                  className="w-full"
                  type="input"
                  value={testimonialData.hero.tag}
                  onChange={(e) => handleHeroChange("tag", e.target.value)}
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={testimonialData.hero.heading}
                  onChange={(e) => handleHeroChange("heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={testimonialData.hero.description}
                  onChange={(e) => handleHeroChange("description", e)}
                />
                <AdminUpload
                  label="Background Image"
                  type="image"
                  value={testimonialData.hero.image}
                  onChange={(value) => handleHeroChange("image", value)}
                  handleUpload={(e) => handleImageUpload(e.target.files[0])}
                />
              </>
            )}
          </div>

          {/* Client Videos Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Client Videos</p>
              {hideClient ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideClient(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideClient(true)}
                />
              )}
            </div>

            {!hideClient && (
              <>
                <AdminInput
                  label="Section Heading"
                  className="w-full"
                  type="edit"
                  value={testimonialData.client.heading}
                  onChange={(e) => handleSectionChange("client", "heading", e)}
                />
                {testimonialData.client.video.map((video, index) => (
                  <div key={index} className="flex flex-row space-x-2">
                    <AdminInput
                      label={`Video URL ${index + 1}`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={video}
                      onChange={(e) => handleVideoChange("client", index, e.target.value)}
                    />
                    <AdminBtn
                      text="✕"
                      btnColor="red"
                      className="mt-[20px]"
                      onClick={() => removeVideo("client", index)}
                    />
                  </div>
                ))}
                <AdminBtn
                  text="Add Video"
                  className="w-full flex flex-row justify-start"
                  onClick={() => addVideo("client")}
                />
              </>
            )}
          </div>

          {/* Service Videos Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Service Videos</p>
              {hideService ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideService(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideService(true)}
                />
              )}
            </div>

            {!hideService && (
              <>
                <AdminInput
                  label="Section Heading"
                  className="w-full"
                  type="edit"
                  value={testimonialData.service.heading}
                  onChange={(e) => handleSectionChange("service", "heading", e)}
                />
                {testimonialData.service.video.map((video, index) => (
                  <div key={index} className="flex flex-row space-x-2">
                    <AdminInput
                      label={`Video URL ${index + 1}`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={video}
                      onChange={(e) => handleVideoChange("service", index, e.target.value)}
                    />
                    <AdminBtn
                      text="✕"
                      btnColor="red"
                      className="mt-[20px]"
                      onClick={() => removeVideo("service", index)}
                    />
                  </div>
                ))}
                <AdminBtn
                  text="Add Video"
                  className="w-full flex flex-row justify-start"
                  onClick={() => addVideo("service")}
                />
              </>
            )}
          </div>

          {/* Save Button */}
          <div className="w-full flex justify-end mt-4">
            <AdminBtn
              text="Save All Changes"
              className="w-1/3"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}