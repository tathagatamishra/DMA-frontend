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
import BrochureCard from "@/component/UI/BrochureCard";
import AdminUpload from "../AdminUi/AdminUpload";

export default function EditBrochure() {
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

  const [brochureData, setBrochureData] = useState({
    heading: "",
    description: "",
    title: "",
    url: "",
  });

  const [pdf, setPdf] = useState(null);
  const [isManualUrl, setIsManualUrl] = useState(false);

  useEffect(() => {
    getBrochure();
  }, []);

  const getBrochure = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getBrochure`);
      setBrochureData(data.brochureData);
      setIsManualUrl(!!data.brochureData.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (field, value) => {
    setBrochureData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setPdf(e.target.files[0]);
      console.log("Uploaded file name:",brochureData.url ); // Log the file name
    }
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

  const uploadToFirebase = async (file) => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `pdfs/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    try {
      let updatedBrochureData = { ...brochureData };

      if (pdf) {
        const url = await uploadToFirebase(pdf);
        updatedBrochureData.url = url;
        setPdf(null); // Clear the selected file after upload
      }

      await axios.put(`${serverUrl}/editBrochure`, updatedBrochureData);
      console.log("Brochure updated successfully");
      getBrochure(); // Refresh the brochure data
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (brochureData.url && !isManualUrl) {
      try {
        const fileRef = ref(storage, brochureData.url);
        await deleteObject(fileRef);
      } catch (error) {
        console.error("Error deleting file from Firebase:", error);
      }
    }

    try {
      brochureData.url = "";
      const updatedBrochureData = { ...brochureData, url: "" };
      await axios.put(`${serverUrl}/editBrochure`, updatedBrochureData);
      console.log("PDF/URL deleted successfully");
      getBrochure(); // Refresh the brochure data
    } catch (error) {
      console.error("Error updating brochure data:", error);
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="EDIT BROCHURE" />

      <div className="AdminContainer">
        <div className="AdminForm">
          <div className="AdminEditCard">
            {/* {windowWidth > 800 && ( */}
            <div
              className="AdminPreview mb-[20px]"
              style={{ borderRadius: "15px" }}
            >
              <BrochureCard brochure={brochureData} />
            </div>
            {/* )} */}

            <AdminInput
              label="Heading"
              className="w-full"
              type="edit"
              value={brochureData.heading}
              onChange={(e) => handleInputChange("heading", e)}
            />
            <AdminInput
              label="Description"
              className="w-full"
              type="edit"
              value={brochureData.description}
              onChange={(e) => handleInputChange("description", e)}
            />
            <AdminInput
              label="Title"
              className="w-full"
              type="edit"
              value={brochureData.title}
              onChange={(e) => handleInputChange("title", e)}
            />

            <AdminUpload
              className="mt-[10px]"
              label="Upload Document"
              type="pdf"
              crossBtn={true}
              value={brochureData.url}
              handleDelete={handleDelete}
              handleUpload={handleUpload }
              onChange={(e) => handleInputChange("url", e.target.value)}
            />

            <AdminBtn
              text="Save"
              className="w-full flex flex-row justify-end mt-[10px]"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
