"use client";
import Founder from "@/component/Founder/Founder";
import React, { useEffect, useState } from "react";
import AdminNav from "../AdminUi/AdminNav";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminUpload from "../AdminUi/AdminUpload";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

const EditFounder = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [hideHero, setHideHero] = useState(false);
  const [hideMain, setHideMain] = useState(false);
  const [hideFounder, setHideFounder] = useState(false);

  const [founderData, setFounderData] = useState({
    dataType: "founder",
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    main: {
      title: "",
      description: "",
      url: "",
    },
    founderCard: {
      image: "",
      name: "",
      status: "",
      message: "",
      social: [{ logo: "", value: "" }],
      instagram:"",
      twitter:"",
      mail:"",
      linkedin:"",
      facebook:"",
      youtube:""
    },
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

  const handleInputChange = (section, field, value) => {
    setFounderData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editFounder`, founderData);
      console.log("Edited");
      getFounderData();
    } catch (error) {
      console.log(error);
    }
  };

  const getFounderData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getFounder`);
      setFounderData(data.founderData);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getFounderData();
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

  const uploadToFirebase = async (file, folder = "founderPage") => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleUpload = async (e, section) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const file = e.target.files[0];

      try {
        const url = await uploadToFirebase(file, "founder/images");
        // console.log(url)
        if (section === "hero") {
          handleInputChange("hero", "image", url);
        } else if (section === "founderCard") {
          handleInputChange("founderCard", "image", url);
        }
        console.log("Image uploaded successfully:");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.warn("No file selected for upload");
    }
  };

  const removeReasonCard = (index) => {
    const newCards = founderData.founderCard?.social?.filter((_, i) => i !== index);
    handleInputChange("founderCard", "social", newCards);
  };

  const addReasonCard = () => {
    const newCards = [
      ...(founderData.founderCard?.social || []),
      { logo: "",value: "" },
    ];
    handleInputChange("founderCard", "social", newCards);
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="EDIT FOUNDER" />
      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Founder founderData={founderData} usedIn="admin" />
          </div>
        )}

        <div className="AdminForm">
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
                  label="Tag"
                  className="w-full"
                  type="edit"
                  value={founderData.hero.tag}
                  onChange={(e) => handleInputChange("hero", "tag", e)}
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={founderData.hero.heading}
                  onChange={(e) => handleInputChange("hero", "heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={founderData.hero.description}
                  onChange={(e) => handleInputChange("hero", "description", e)}
                />
                <AdminUpload
                  label="Hero Image"
                  type="image"
                  value={founderData.hero.image}
                  handleUpload={(e) => handleUpload(e, "hero")}
                  handleDelete={() => handleDelete("hero")}
                  onChange={(e) =>
                    handleInputChange("hero", "image", e.target.value)
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
          {/* Main Section */}
          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Main</p>
              {hideMain ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideMain(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideMain(true)}
                />
              )}
            </div>

            {!hideMain && (
              <>
                <AdminInput
                  label="Title"
                  className="w-full"
                  type="edit"
                  value={founderData.main.title}
                  onChange={(e) => handleInputChange("main", "title", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={founderData.main.description}
                  onChange={(e) => {
                    handleInputChange("main", "description", e);
                  }}
                />

                <AdminInput
                  label="Video"
                  className="w-full"
                  type="input"
                  value={founderData.main.url}
                  onChange={(e) =>
                    handleInputChange("main", "url", e.target.value)
                  }
                />

                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>
          {/* Founder Section */}
          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Founder</p>
              {hideFounder ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideFounder(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideFounder(true)}
                />
              )}
            </div>

            {!hideFounder && (
              <>
                <AdminUpload
                  label="Founder Image"
                  type="image"
                  value={founderData.founderCard.image}
                  handleUpload={(e) => handleUpload(e, "founderCard")}
                  handleDelete={() => handleDelete("founderCard")}
                  onChange={(e) =>
                    handleInputChange("founderCard", "image", e.target.value)
                  }
                />
                <AdminInput
                  label="Name"
                  className="w-full"
                  type="edit"
                  value={founderData.founderCard.name}
                  onChange={(e) => handleInputChange("founderCard", "name", e)}
                />
                <AdminInput
                  label="Status"
                  className="w-full"
                  type="edit"
                  value={founderData.founderCard.status}
                  onChange={(e) => {
                    handleInputChange("founderCard", "status", e);
                  }}
                />

                <AdminInput
                  label="Message"
                  className="w-full"
                  type="edit"
                  value={founderData.founderCard.message}
                  onChange={(e) =>
                    handleInputChange("founderCard", "message", e)
                  }
                />
                <AdminInput
                  label="Instagram"
                  className="w-full"
                  type="input"
                  value={founderData.founderCard.instagram}
                  onChange={(e) =>
                    handleInputChange("founderCard", "instagram", e.target.value)
                  }
                />
                <AdminInput
                  label="Gmail"
                  className="w-full"
                  type="input"
                  value={founderData.founderCard.mail}
                  onChange={(e) =>
                    handleInputChange("founderCard", "mail", e.target.value)
                  }
                />
                <AdminInput
                  label="Facebook"
                  className="w-full"
                  type="input"
                  value={founderData.founderCard.facebook}
                  onChange={(e) =>
                    handleInputChange("founderCard", "facebook", e.target.value)
                  }
                />
                <AdminInput
                  label="Twitter"
                  className="w-full"
                  type="input"
                  value={founderData.founderCard.twitter}
                  onChange={(e) =>
                    handleInputChange("founderCard", "twitter", e.target.value)
                  }
                />
                <AdminInput
                  label="Linkedin"
                  className="w-full"
                  type="input"
                  value={founderData.founderCard.linkedin}
                  onChange={(e) =>
                    handleInputChange("founderCard", "linkedin", e.target.value)
                  }
                />
                <AdminInput
                  label="Youtube"
                  className="w-full"
                  type="input"
                  value={founderData.founderCard.youtube}
                  onChange={(e) =>
                    handleInputChange("founderCard", "youtube", e.target.value)
                  }
                />
                {/* {founderData.founderCard?.social?.map((card, index) => (
                  <div key={index} className="mb-[20px] border-b pb-[10px]">
                    <AdminUpload
                      label={`Social ${index + 1} Logo`}
                      type="image"
                      value={card.logo}
                      handleUpload={(e) => handleUpload(e, "social", index)}
                      handleDelete={() => handleDelete("social", index)}
                      onChange={(e) => {
                        const newCards = [...founderData.founderCard.social];
                        newCards[index].logo = e.target.value;
                        handleInputChange("founder", "social", newCards);
                      }}
                    />
                    <AdminInput
                      label={`Social ${index + 1} Value`}
                      className="w-full"
                      type="input"
                      value={card.value}
                      onChange={(e) => {
                        const newCards = [...founderData.founderCard.social];
                        newCards[index].value = e.target.value;
                        handleInputChange("founder", "social", newCards);
                      }}
                    />
                    <AdminBtn
                      text="Remove Social"
                      onClick={() => removeReasonCard(index)}
                    />
                  </div>
                ))}
                <AdminBtn text="Add Social Card" onClick={addReasonCard} /> */}

                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFounder;
