"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import Footer from "@/component/Footer/Footer";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import AdminUpload from "../AdminUi/AdminUpload";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Loader from "@/component/UI/Loader";

export default function EditFooter() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [windowWidth, setWindowWidth] = useState(0);

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

  const [isLoading, setIsLoading] = useState(true);
  const [hideHero, setHideHero] = useState(false);
  const [hideContact, setHideContact] = useState(false);
  const [hideFirstSection, setHideFirstSection] = useState(false);
  const [hideSecondSection, setHideSecondSection] = useState(false);
  const [hideThirdSection, setHideThirdSection] = useState(false);

  const [footerData, setFooterData] = useState({
    heading: "",
    description: "",
    newsletter: "",
    contact: {
      heading: "",
      description: "",
      links: [""],
    },
    copyright: "",
    firstSection: {
      heading: "",
      link: [],
    },
    secondSection: {
      heading: "",
      link: [],
    },
    thirdSection: {
      heading: "",
      link: [],
    },
  });

  const handleInputChange = (field, value) => {
    setFooterData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleContactInputChange = (field, value) => {
    setFooterData((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [field]: value,
      },
    }));
  };

  const handleSectionInputChange = (section, field, value) => {
    setFooterData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSectionLinkChange = (section, index, field, value) => {
    setFooterData((prevData) => {
      const newLinks = [...prevData[section].link];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          link: newLinks,
        },
      };
    });
  };

  const addSectionLink = (section) => {
    setFooterData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        link: [...prevData[section].link, { title: "", url: "" }],
      },
    }));
  };

  const removeSectionLink = (section, index) => {
    setFooterData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        link: prevData[section].link.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editFooter`, footerData);
      console.log("Edited");
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getFooter = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getFooter`);
      setFooterData(data.footerData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFooter();
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

  const handleImageUpload = async (file, index) => {
    setIsLoading(true);
    try {
      const fileName = generateRandomString(10) + "_" + file.name;
      const storageRef = ref(storage, `footer/${Date.now()}_${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setFooterData((prevData) => ({
        ...prevData,
        image: url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      {isLoading && <Loader />}

      <AdminNav page="EDIT FOOTER" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Footer footerData={footerData} />
          </div>
        )}

        <div className="AdminForm">
          {/* Hero Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Hero</p>
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
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={footerData.heading}
                  onChange={(e) => handleInputChange("heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={footerData.description}
                  onChange={(e) =>
                    handleInputChange("description", e)
                  }
                />
                <AdminInput
                  label="Newsletter"
                  className="w-full"
                  type="edit"
                  value={footerData.newsletter}
                  onChange={(e) =>
                    handleInputChange("newsletter", e)
                  }
                />
                <AdminInput
                  label="Image URL"
                  className="w-full"
                  type="input"
                  value={footerData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
                <AdminUpload
                  label="Image"
                  type="image"
                  value={footerData.image}
                  onChange={(value) => handleInputChange("image", value)}
                  handleUpload={(e) =>
                    handleImageUpload(e.target.files[0], "image")
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

          {/* Contact Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Contact</p>{" "}
              {hideContact ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideContact(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideContact(true)}
                />
              )}
            </div>

            {!hideContact && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={footerData.contact.heading}
                  onChange={(e) =>
                    handleContactInputChange("heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={footerData.contact.description}
                  onChange={(e) =>
                    handleContactInputChange("description", e)
                  }
                />
                {footerData.contact.links.map((link, index) => (
                  <AdminInput
                    key={index}
                    crossBtn={true}
                    label={`Link ${index + 1}`}
                    className="w-full mb-[10px] grow"
                    type="input"
                    value={link}
                    onChange={(e) => {
                      const newLinks = [...footerData.contact.links];
                      newLinks[index] = e.target.value;
                      setFooterData((prevData) => ({
                        ...prevData,
                        contact: { ...prevData.contact, links: newLinks },
                      }));
                    }}
                    onClick={() => {
                      const newLinks = footerData.contact.links.filter(
                        (_, i) => i !== index
                      );
                      setFooterData((prevData) => ({
                        ...prevData,
                        contact: { ...prevData.contact, links: newLinks },
                      }));
                    }}
                  />
                ))}
                <div className="flex flex-row justify-between">
                  <AdminBtn
                    text="Add link"
                    className="w-full flex flex-row justify-start"
                    onClick={() => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        contact: {
                          ...prevData.contact,
                          links: [...footerData.contact.links, ""],
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

          {/* First Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">First Section</p>
              {hideFirstSection ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideFirstSection(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideFirstSection(true)}
                />
              )}
            </div>

            {!hideFirstSection && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={footerData.firstSection.heading}
                  onChange={(e) =>
                    handleSectionInputChange(
                      "firstSection",
                      "heading",
                      e
                    )
                  }
                />
                {footerData.firstSection.link.map((link, index) => (
                  <div key={index} className="flex flex-row space-x-2">
                    <AdminInput
                      label={`Link ${index + 1} Title`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={link.title}
                      onChange={(e) =>
                        handleSectionLinkChange(
                          "firstSection",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <AdminInput
                      label={`Link ${index + 1} URL`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={link.url}
                      onChange={(e) =>
                        handleSectionLinkChange(
                          "firstSection",
                          index,
                          "url",
                          e.target.value
                        )
                      }
                    />
                    <AdminBtn
                      text="✕"
                      btnColor="red"
                      className="mt-[20px]"
                      onClick={() => removeSectionLink("firstSection", index)}
                    />
                  </div>
                ))}
                <div className="flex flex-row justify-between">
                  <AdminBtn
                    text="Add Link"
                    className="w-full flex flex-row justify-start"
                    onClick={() => addSectionLink("firstSection")}
                  />
                  <AdminBtn
                    text="Save"
                    className="w-full flex flex-row justify-end"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            )}
          </div>

          {/* Second Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Second Section</p>
              {hideSecondSection ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideSecondSection(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideSecondSection(true)}
                />
              )}
            </div>

            {!hideSecondSection && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={footerData.secondSection.heading}
                  onChange={(e) =>
                    handleSectionInputChange(
                      "secondSection",
                      "heading",
                      e
                    )
                  }
                />
                {footerData.secondSection.link.map((link, index) => (
                  <div key={index} className="flex flex-row space-x-2">
                    <AdminInput
                      label={`Link ${index + 1} Title`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={link.title}
                      onChange={(e) =>
                        handleSectionLinkChange(
                          "secondSection",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <AdminInput
                      label={`Link ${index + 1} URL`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={link.url}
                      onChange={(e) =>
                        handleSectionLinkChange(
                          "secondSection",
                          index,
                          "url",
                          e.target.value
                        )
                      }
                    />
                    <AdminBtn
                      text="✕"
                      btnColor="red"
                      className="mt-[20px]"
                      onClick={() => removeSectionLink("secondSection", index)}
                    />
                  </div>
                ))}
                <div className="flex flex-row justify-between">
                  <AdminBtn
                    text="Add Link"
                    className="w-full flex flex-row justify-start"
                    onClick={() => addSectionLink("secondSection")}
                  />
                  <AdminBtn
                    text="Save"
                    className="w-full flex flex-row justify-end"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            )}
          </div>

          {/* Third Section */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Third Section</p>
              {hideThirdSection ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideThirdSection(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideThirdSection(true)}
                />
              )}
            </div>

            {!hideThirdSection && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={footerData.thirdSection.heading}
                  onChange={(e) =>
                    handleSectionInputChange(
                      "thirdSection",
                      "heading",
                      e
                    )
                  }
                />
                {footerData.thirdSection.link.map((link, index) => (
                  <div key={index} className="flex flex-row space-x-2">
                    <AdminInput
                      label={`Link ${index + 1} Title`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={link.title}
                      onChange={(e) =>
                        handleSectionLinkChange(
                          "thirdSection",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <AdminInput
                      label={`Link ${index + 1} URL`}
                      className="w-full mb-[10px] grow"
                      type="input"
                      value={link.url}
                      onChange={(e) =>
                        handleSectionLinkChange(
                          "thirdSection",
                          index,
                          "url",
                          e.target.value
                        )
                      }
                    />
                    <AdminBtn
                      text="✕"
                      btnColor="red"
                      className="mt-[20px]"
                      onClick={() => removeSectionLink("thirdSection", index)}
                    />
                  </div>
                ))}
                <div className="flex flex-row justify-between">
                  <AdminBtn
                    text="Add Link"
                    className="w-full flex flex-row justify-start"
                    onClick={() => addSectionLink("thirdSection")}
                  />
                  <AdminBtn
                    text="Save"
                    className="w-full flex flex-row justify-end"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            )}
          </div>

          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Copyright</p>
            </div>

            <AdminInput
              label="Copyright"
              className="w-full"
              type="edit"
              value={footerData.copyright}
              onChange={(e) => handleInputChange("copyright", e)}
            />

            <AdminBtn
              text="save"
              className="w-full flex flex-row justify-end"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
