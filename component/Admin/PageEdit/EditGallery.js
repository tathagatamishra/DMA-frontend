"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import AdminUpload from "../AdminUi/AdminUpload";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Gallery from "@/component/Gallery/Gallery";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function EditGallery() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const [hideHero, setHideHero] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  const [hideImage, setHideImage] = useState(false);
  const [isManualHeroUrl, setIsManualHeroUrl] = useState(false);

  const [galleryData, setGalleryData] = useState({
    dataType: "gallery",
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    video: {
      heading: "",
      video: [],
    },
    image: {
      heading: "",
      image: [],
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

  const getGallery = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getGallery`);
      setGalleryData(data.galleryData);
      setIsManualHeroUrl(!!data.galleryData.hero.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  const handleInputChange = (section, field, value) => {
    setGalleryData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleVideoChange = (index, value) => {
    setGalleryData((prevData) => {
      const newVideos = [...prevData.video.video];
      newVideos[index] = value;
      return {
        ...prevData,
        video: {
          ...prevData.video,
          video: newVideos,
        },
      };
    });
  };

  const addVideo = () => {
    setGalleryData((prevData) => ({
      ...prevData,
      video: {
        ...prevData.video,
        video: [...prevData.video.video, ""],
      },
    }));
  };

  const removeVideo = (index) => {
    setGalleryData((prevData) => {
      const newVideos = prevData.video.video.filter((_, i) => i !== index);
      return {
        ...prevData,
        video: {
          ...prevData.video,
          video: newVideos,
        },
      };
    });
  };

  const handleImageChange = (index, field, value) => {
    setGalleryData((prevData) => {
      const newImages = [...prevData.image.image];
      newImages[index][field === "url" ? 0 : field === "title" ? 1 : 2] = value;
      return {
        ...prevData,
        image: {
          ...prevData.image,
          image: newImages,
        },
      };
    });
  };

  const addImage = () => {
    setGalleryData((prevData) => ({
      ...prevData,
      image: {
        ...prevData.image,
        image: [...prevData.image.image, ["", "", ""]],
      },
    }));
  };

  const removeImage = (index) => {
    setGalleryData((prevData) => {
      const newImages = prevData.image.image.filter((_, i) => i !== index);
      return {
        ...prevData,
        image: {
          ...prevData.image,
          image: newImages,
        },
      };
    });
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

  const uploadToFirebase = async (file, folder = "galleryPage") => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleUpload = async (e, index = null) => {
    if (e.target.files[0]) {
      try {
        const file = e.target.files[0];
        let url;
        if (index !== null) {
          url = await uploadToFirebase(file, "galleryPage/images");
          handleImageChange(index, "url", url);
        } else {
          url = await uploadToFirebase(file, "galleryPage");
          handleInputChange("hero", "image", url);
          setIsManualHeroUrl(false);
        }
        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleManualUrlChange = (value) => {
    handleInputChange("hero", "image", value);
    setIsManualHeroUrl(true);
  };

  const handleDelete = async (index = null) => {
    try {
      let updatedGalleryData = { ...galleryData };
      if (index !== null) {
        const imageUrl = galleryData.image.image[index][0];
        const fileRef = ref(storage, imageUrl);
        await deleteObject(fileRef);
        updatedGalleryData.image.image[index][0] = "";
      } else {
        if (!isManualHeroUrl && galleryData.hero.image) {
          const fileRef = ref(storage, galleryData.hero.image);
          await deleteObject(fileRef);
        }
        updatedGalleryData.hero.image = "";
        setIsManualHeroUrl(false);
      }
      await axios.put(`${serverUrl}/editGallery`, updatedGalleryData);
      console.log("Image deleted successfully");
      setGalleryData(updatedGalleryData);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editGallery`, galleryData);
      console.log("Gallery page updated successfully");
      getGallery();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="EDIT GALLERY" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Gallery galleryData={galleryData} />
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
                  value={galleryData.hero.tag}
                  onChange={(e) =>
                    handleInputChange("hero", "tag", e)
                  }
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={galleryData.hero.heading}
                  onChange={(e) =>
                    handleInputChange("hero", "heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={galleryData.hero.description}
                  onChange={(e) =>
                    handleInputChange("hero", "description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Hero Image"
                  type="image"
                  crossBtn={true}
                  value={galleryData.hero.image}
                  handleDelete={handleDelete}
                  handleUpload={handleUpload}
                  onChange={(e) => handleManualUrlChange(e.target.value)}
                />
              </>
            )}
          </div>

          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Video</p>
              {hideVideo ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideVideo(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideVideo(true)}
                />
              )}
            </div>

            {!hideVideo && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={galleryData.video.heading}
                  onChange={(e) =>
                    handleInputChange("video", "heading", e)
                  }
                />
                {galleryData.video.video.map((video, index) => (
                  <div key={index} className="flex items-center mb-[10px]">
                    <AdminInput
                      crossBtn={true}
                      label={`Video ${index + 1}`}
                      className="w-full"
                      type="input"
                      value={video}
                      onChange={(e) => handleVideoChange(index, e.target.value)}
                      onClick={() => removeVideo(index)}
                      warningMsg="Are you sure you want to delete this video?"
                    />
                  </div>
                ))}
                <div className="w-full flex flex-row justify-between">
                  <AdminBtn text="Add Video" onClick={addVideo} />
                  <AdminBtn text="Save" onClick={handleSubmit} />
                </div>
              </>
            )}
          </div>

          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Image</p>
              {hideImage ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideImage(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideImage(true)}
                />
              )}
            </div>

            {!hideImage && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full mb-[20px]"
                  type="edit"
                  value={galleryData.image.heading}
                  onChange={(e) =>
                    handleInputChange("image", "heading", e)
                  }
                />
                {galleryData.image.image.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col mb-[20px] gap-[10px]"
                  >
                    <AdminInput
                      label={`Image ${index + 1} Title`}
                      className="w-full"
                      type="input"
                      value={image[1]}
                      onChange={(e) =>
                        handleImageChange(index, "title", e.target.value)
                      }
                    />
                    <AdminInput
                      label={`Image ${index + 1} Category`}
                      className="w-full"
                      type="input"
                      value={image[2]}
                      onChange={(e) =>
                        handleImageChange(index, "category", e.target.value)
                      }
                    />
                    <AdminUpload
                      label={`Image ${index + 1} URL`}
                      type="image"
                      crossBtn={true}
                      value={image[0]}
                      handleDelete={() => handleDelete(index)}
                      handleUpload={(e) => handleUpload(e, index)}
                      onChange={(e) =>
                        handleImageChange(index, "url", e.target.value)
                      }
                      onClick={() => removeImage(index)}
                      warningMsg="Are you sure you want to delete this image?"
                    />
                  </div>
                ))}

                <div className="w-full flex flex-row justify-between">
                  <AdminBtn text="Add Image" onClick={addImage} />
                  <AdminBtn text="Save" onClick={handleSubmit} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
