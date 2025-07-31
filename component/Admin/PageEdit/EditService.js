"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/config";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import AdminNav from "../AdminUi/AdminNav";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import Services from "@/component/Services/Services";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import AdminUpload from "../AdminUi/AdminUpload";
import Loader from "@/component/UI/Loader";

export default function EditService() {
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
  const [hideBody, setHideBody] = useState(false);

  const [serviceData, setServiceData] = useState({
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    coverimage: "",
    title: "",
    description: "",
  });

  const [serviceList, setServiceList] = useState({});

  const [isManualHeroUrl, setIsManualHeroUrl] = useState(false);
  const [isManualCoverUrl, setIsManualCoverUrl] = useState(false);

  const getServiceData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getServicePage`);
      setServiceData(data.servicePageData);
      setIsManualHeroUrl(!!data.servicePageData.hero.image);
      setIsManualCoverUrl(!!data.servicePageData.coverimage);
    } catch (error) {
      console.log(error);
    }
  };

  const getServiceList = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getServiceList`);
      setServiceList(data.serviceList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceData();
    getServiceList();
    setIsLoading(false);
  }, []);

  const handleInputChange = (field, value) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleHeroInputChange = (field, value) => {
    setServiceData((prevData) => ({
      ...prevData,
      hero: {
        ...prevData.hero,
        [field]: value,
      },
    }));
  };

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

  const uploadToFirebase = async (file, folder) => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `servicePage/${folder}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editServicePage`, serviceData);
      console.log("Service page updated successfully");
      getServiceData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (e, field) => {
    if (e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const folder = field === "hero.image" ? "hero" : "cover";
        const url = await uploadToFirebase(file, folder);

        if (field === "hero.image") {
          handleHeroInputChange("image", url);
          setIsManualHeroUrl(false);
        } else {
          handleInputChange("coverimage", url);
          setIsManualCoverUrl(false);
        }

        console.log(`${field} uploaded successfully`);
      } catch (error) {
        console.error(`Error uploading ${field}:`, error);
      }
    }
  };

  const handleManualUrlChange = (field, value) => {
    if (field === "hero.image") {
      handleHeroInputChange("image", value);
      setIsManualHeroUrl(true);
    } else if (field === "coverimage") {
      handleInputChange("coverimage", value);
      setIsManualCoverUrl(true);
    }
  };

  const handleDelete = async (field) => {
    try {
      let updatedServiceData = { ...serviceData };
      if (field === "hero.image" && !isManualHeroUrl) {
        if (serviceData.hero.image) {
          const fileRef = ref(storage, serviceData.hero.image);
          await deleteObject(fileRef);
        }
      } else if (field === "coverimage" && !isManualCoverUrl) {
        if (serviceData.coverimage) {
          const fileRef = ref(storage, serviceData.coverimage);
          await deleteObject(fileRef);
        }
      }

      if (field === "hero.image") {
        updatedServiceData.hero.image = "";
        setIsManualHeroUrl(false);
      } else {
        updatedServiceData.coverimage = "";
        setIsManualCoverUrl(false);
      }

      await axios.put(`${serverUrl}/editServicePage`, updatedServiceData);
      console.log("Image deleted successfully");
      setServiceData(updatedServiceData);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      {isLoading && <Loader />}

      <AdminNav page="EDIT SERVICE" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Services
              serviceList={serviceList}
              serviceData={serviceData}
              usedIn="admin"
            />
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
                  value={serviceData.hero.tag}
                  onChange={(e) => handleHeroInputChange("tag", e)}
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={serviceData.hero.heading}
                  onChange={(e) =>
                    handleHeroInputChange("heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={serviceData.hero.description}
                  onChange={(e) =>
                    handleHeroInputChange("description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Hero Image"
                  type="image"
                  crossBtn={true}
                  value={serviceData.hero.image}
                  handleDelete={() => handleDelete("hero.image")}
                  handleUpload={(e) => handleUpload(e, "hero.image")}
                  onChange={(e) =>
                    handleManualUrlChange("hero.image", e.target.value)
                  }
                />
                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end mt-[10px]"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Body</p>
              {hideBody ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideBody(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideBody(true)}
                />
              )}
            </div>

            {!hideBody && (
              <>
                <AdminInput
                  label="Title"
                  className="w-full"
                  type="edit"
                  value={serviceData.title}
                  onChange={(e) => handleInputChange("title", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={serviceData.description}
                  onChange={(e) =>
                    handleInputChange("description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Cover Image"
                  type="image"
                  crossBtn={true}
                  value={serviceData.coverimage}
                  handleDelete={() => handleDelete("coverimage")}
                  handleUpload={(e) => handleUpload(e, "coverimage")}
                  onChange={(e) =>
                    handleManualUrlChange("coverimage", e.target.value)
                  }
                />
                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end mt-[10px]"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
