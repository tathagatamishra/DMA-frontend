"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import AdminUpload from "../AdminUi/AdminUpload";
import About from "@/component/About/About";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Loader from "@/component/UI/Loader";

export default function EditAbout() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const [hideSections, setHideSections] = useState({
    hero: false,
    overview: false,
    value: false,
    message: false,
  });

  const [aboutData, setAboutData] = useState({
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    overview: {
      heading: "",
      description: "",
      image: "",
      section: [{ title: "", description: "" }],
      phone: "",
    },
    value: [{ title: "", value: "" }],
    message: {
      heading: "",
      description: "",
      image: "",
      name: "",
      designation: "",
      links: [""],
      quote: "",
    },
  });

  const [isManualUrl, setIsManualUrl] = useState({
    hero: false,
    overview: false,
    message: false,
  });

  const handleInputChange = (section, field, value) => {
    setAboutData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleArrayInputChange = (section, index, field, value) => {
    const newArray = [...aboutData[section]];
    newArray[index][field] = value;
    setAboutData((prevData) => ({
      ...prevData,
      [section]: newArray,
    }));
  };

  const handleNestedArrayInputChange = (
    section,
    subSection,
    index,
    field,
    value
  ) => {
    const newArray = [...aboutData[section][subSection]];
    newArray[index][field] = value;
    setAboutData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [subSection]: newArray,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.put(`${serverUrl}/editAbout`, aboutData);
      console.log("Edited");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getAbout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${serverUrl}/getAbout`);
      setAboutData(data.aboutData);
      setIsManualUrl({
        hero: !!data.aboutData.hero.image,
        overview: !!data.aboutData.overview.image,
        message: !!data.aboutData.message.image,
      });
      console.log(data.aboutData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAbout();
  }, []);

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const uploadToFirebase = async (file, section) => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `aboutPage/${section}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleUpload = async (e, section) => {
    setIsLoading(true);
    if (e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const url = await uploadToFirebase(file, section);
        handleInputChange(section, "image", url);
        setIsManualUrl((prev) => ({ ...prev, [section]: false }));
        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    setIsLoading(false);
  };

  const handleManualUrlChange = (section, value) => {
    handleInputChange(section, "image", value);
    setIsManualUrl((prev) => ({ ...prev, [section]: true }));
  };

  const handleDelete = async (section) => {
    try {
      let updatedAboutData = { ...aboutData };
      if (!isManualUrl[section] && aboutData[section].image) {
        const fileRef = ref(storage, aboutData[section].image);
        await deleteObject(fileRef);
      }
      updatedAboutData[section].image = "";
      setIsManualUrl((prev) => ({ ...prev, [section]: false }));
      await axios.put(`${serverUrl}/editAbout`, updatedAboutData);
      console.log("Image deleted successfully");
      setAboutData(updatedAboutData);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      {isLoading && <Loader />}
      <AdminNav page="EDIT ABOUT" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <About aboutData={aboutData} />
          </div>
        )}

        <div className="AdminForm">
          {/* Hero Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Hero</p>
              {hideSections.hero ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, hero: false }))
                  }
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, hero: true }))
                  }
                />
              )}
            </div>

            {!hideSections.hero && (
              <>
                <AdminInput
                  label="Tag"
                  className="w-full"
                  type="edit"
                  value={aboutData.hero.tag}
                  onChange={(e) =>
                    handleInputChange("hero", "tag", e)
                  }
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={aboutData.hero.heading}
                  onChange={(e) =>
                    handleInputChange("hero", "heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={aboutData.hero.description}
                  onChange={(e) =>
                    handleInputChange("hero", "description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Hero Image"
                  type="image"
                  crossBtn={true}
                  value={aboutData.hero.image}
                  handleDelete={() => handleDelete("hero")}
                  handleUpload={(e) => handleUpload(e, "hero")}
                  onChange={(e) =>
                    handleManualUrlChange("hero", e.target.value)
                  }
                />
                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          {/* Overview Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Overview</p>
              {hideSections.overview ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, overview: false }))
                  }
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, overview: true }))
                  }
                />
              )}
            </div>

            {!hideSections.overview && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={aboutData.overview.heading}
                  onChange={(e) =>
                    handleInputChange("overview", "heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={aboutData.overview.description}
                  onChange={(e) =>
                    handleInputChange("overview", "description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Overview Image"
                  type="image"
                  crossBtn={true}
                  value={aboutData.overview.image}
                  handleDelete={() => handleDelete("overview")}
                  handleUpload={(e) => handleUpload(e, "overview")}
                  onChange={(e) =>
                    handleManualUrlChange("overview", e.target.value)
                  }
                />
                {aboutData.overview.section.map((sec, index) => (
                  <div key={index}>
                    <AdminInput
                      label={`Section ${index + 1} Title`}
                      className="w-full"
                      type="edit"
                      value={sec.title}
                      onChange={(e) =>
                        handleNestedArrayInputChange(
                          "overview",
                          "section",
                          index,
                          "title",
                          e
                        )
                      }
                    />
                    <AdminInput
                      label={`Section ${index + 1} Description`}
                      className="w-full"
                      type="edit"
                      value={sec.description}
                      onChange={(e) =>
                        handleNestedArrayInputChange(
                          "overview",
                          "section",
                          index,
                          "description",
                          e
                        )
                      }
                    />
                  </div>
                ))}
                <AdminInput
                  label="Phone"
                  className="w-full"
                  type="input"
                  value={aboutData.overview.phone}
                  onChange={(e) =>
                    handleInputChange("overview", "phone", e.target.value)
                  }
                />
                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          {/* Value Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Value</p>
              {hideSections.value ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, value: false }))
                  }
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, value: true }))
                  }
                />
              )}
            </div>

            {!hideSections.value && (
              <>
                {aboutData.value.map((val, index) => (
                  <div key={index}>
                    <AdminInput
                      label={`Value ${index + 1} Title`}
                      className="w-full"
                      type="input"
                      value={val.title}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "value",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <AdminInput
                      label={`Value ${index + 1} Description`}
                      className="w-full"
                      type="edit"
                      value={val.value}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "value",
                          index,
                          "value",
                          e
                        )
                      }
                    />
                  </div>
                ))}
                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          {/* Message Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Message</p>
              {hideSections.message ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, message: false }))
                  }
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() =>
                    setHideSections((prev) => ({ ...prev, message: true }))
                  }
                />
              )}
            </div>

            {!hideSections.message && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={aboutData.message.heading}
                  onChange={(e) =>
                    handleInputChange("message", "heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={aboutData.message.description}
                  onChange={(e) =>
                    handleInputChange("message", "description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Message Image"
                  type="image"
                  crossBtn={true}
                  value={aboutData.message.image}
                  handleDelete={() => handleDelete("message")}
                  handleUpload={(e) => handleUpload(e, "message")}
                  onChange={(e) =>
                    handleManualUrlChange("message", e.target.value)
                  }
                />
                <AdminInput
                  label="Name"
                  className="w-full"
                  type="edit"
                  value={aboutData.message.name}
                  onChange={(e) =>
                    handleInputChange("message", "name", e)
                  }
                />
                <AdminInput
                  label="Designation"
                  className="w-full"
                  type="edit"
                  value={aboutData.message.designation}
                  onChange={(e) =>
                    handleInputChange("message", "designation", e)
                  }
                />
                <AdminInput
                  label="Quote"
                  className="w-full"
                  type="edit"
                  value={aboutData.message.quote}
                  onChange={(e) =>
                    handleInputChange("message", "quote", e)
                  }
                />
                {aboutData.message.links.map((link, index) => (
                  <AdminInput
                    key={index}
                    crossBtn={true}
                    label={`Link ${index + 1}`}
                    className="w-full mb-[10px] grow"
                    type="input"
                    value={link}
                    onChange={(e) => {
                      const newLinks = [...aboutData.message.links];
                      newLinks[index] = e.target.value;
                      setAboutData((prevData) => ({
                        ...prevData,
                        message: { ...prevData.message, links: newLinks },
                      }));
                    }}
                    onClick={() => {
                      const newLinks = aboutData.message.links.filter(
                        (_, i) => i !== index
                      );
                      setAboutData((prevData) => ({
                        ...prevData,
                        message: { ...prevData.message, links: newLinks },
                      }));
                    }}
                  />
                ))}

                <div className="flex flex-row justify-between">
                  <AdminBtn
                    text="add"
                    className="w-full flex flex-row justify-start"
                    onClick={() => {
                      setAboutData((prevData) => ({
                        ...prevData,
                        message: {
                          ...prevData.message,
                          links: [...aboutData.message.links, ""],
                        },
                      }));
                    }}
                  />
                  <AdminBtn
                    text="save"
                    className="w-full flex flex-row justify-end"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
