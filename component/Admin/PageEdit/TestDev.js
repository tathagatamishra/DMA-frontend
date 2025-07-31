"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import AdminNav from "../AdminUi/AdminNav";
import AdminUpload from "../AdminUi/AdminUpload";
import AdminInput from "../AdminUi/AdminInput";

export default function TestDev() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [singleImage, setSingleImage] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [singleImageUrl, setSingleImageUrl] = useState("");
  const [multipleImageUrls, setMultipleImageUrls] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");

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

  const handleSingleImageUpload = (e) => {
    if (e.target.files[0]) {
      setSingleImage(e.target.files[0]);
    }
  };

  const handleMultipleImageUpload = (e) => {
    if (e.target.files) {
      setMultipleImages(Array.from(e.target.files));
    }
  };

  const handlePdfUpload = (e) => {
    if (e.target.files[0]) {
      setPdf(e.target.files[0]);
    }
  };

  const uploadToFirebase = async (file, path) => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `${path}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (singleImage) {
      const url = await uploadToFirebase(singleImage, "singleImages");
      setSingleImageUrl(url);
      setSingleImage(null); // Clear the selected file after upload
    }
    if (multipleImages.length > 0) {
      const newUrls = await Promise.all(
        multipleImages.map((image) => uploadToFirebase(image, "multipleImages"))
      );
      setMultipleImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
      setMultipleImages([]); // Clear the selected files after upload
    }
    if (pdf) {
      const url = await uploadToFirebase(pdf, "pdfs");
      setPdfUrl(url);
      setPdf(null); // Clear the selected file after upload
    }
  };

  const handleDelete = async (url, type) => {
    const fileRef = ref(storage, url);
    try {
      await deleteObject(fileRef);
      if (type === "single") {
        setSingleImageUrl("");
      } else if (type === "multiple") {
        setMultipleImageUrls((prevUrls) => prevUrls.filter((u) => u !== url));
      } else if (type === "pdf") {
        setPdfUrl("");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="DEV TOOL" />

      <div className="AdminContainer">
        <div className="AdminForm">
          <div className="AdminEditCard">
            <AdminUpload label="Upload Image" type="image" crossBtn={true} />

            <AdminInput label="Title" className="w-full" type="input" />

            <div>
              <label htmlFor="singleImage">Upload Single Image: </label>
              <input
                id="singleImage"
                type="file"
                onChange={handleSingleImageUpload}
                accept="image/*"
              />
            </div>

            <div>
              <label htmlFor="multipleImages">Upload Multiple Images: </label>
              <input
                id="multipleImages"
                type="file"
                onChange={handleMultipleImageUpload}
                accept="image/*"
                multiple
              />
            </div>

            <div>
              <label htmlFor="pdf">Upload PDF: </label>
              <input
                id="pdf"
                type="file"
                onChange={handlePdfUpload}
                accept=".pdf"
              />
            </div>

            <button onClick={handleSave}>Save</button>

            {singleImageUrl && (
              <div>
                <img src={singleImageUrl} alt="Single uploaded" width={100} />
                <button onClick={() => handleDelete(singleImageUrl, "single")}>
                  Delete
                </button>
              </div>
            )}

            {multipleImageUrls.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Multiple uploaded ${index}`} width={100} />
                <button onClick={() => handleDelete(url, "multiple")}>
                  Delete
                </button>
              </div>
            ))}

            {pdfUrl && (
              <div>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
                <button onClick={() => handleDelete(pdfUrl, "pdf")}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
