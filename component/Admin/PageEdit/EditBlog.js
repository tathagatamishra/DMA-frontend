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
import Blogs from "@/component/Blogs/Blogs";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Loader from "@/component/UI/Loader";

export default function EditBlog() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hideHero, setHideHero] = useState(false);
  const [hideCategory, setHideCategory] = useState(false);
  const [hideTags, setHideTags] = useState(false);
  const [recentPosts, setRecentPosts] = useState({});
  const [blogPageData, setBlogPageData] = useState({
    dataType: "blogPage",
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    category: [],
    tags: [],
  });
  const [isManualHeroUrl, setIsManualHeroUrl] = useState(false);

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

  const recentPost = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/getAllBlogs?limit=4&page=1`
      );
      setRecentPosts(data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogPage = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getBlogPage`);
      setBlogPageData(data.blogPageData);
      setIsManualHeroUrl(!!data.blogPageData.hero.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    recentPost();
    getBlogPage();
    setIsLoading(false);
  }, []);

  const handleHeroInputChange = (field, value) => {
    setBlogPageData((prevData) => ({
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

  const uploadToFirebase = async (file) => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `blogPage/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleUpload = async (e) => {
    setIsLoading(true);
    if (e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const url = await uploadToFirebase(file);
        handleHeroInputChange("image", url);
        setIsManualHeroUrl(false);
        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    setIsLoading(false);
  };

  const handleManualUrlChange = (value) => {
    handleHeroInputChange("image", value);
    setIsManualHeroUrl(true);
  };

  const handleDelete = async () => {
    try {
      let updatedBlogPageData = { ...blogPageData };
      if (!isManualHeroUrl && blogPageData.hero.image) {
        const fileRef = ref(storage, blogPageData.hero.image);
        await deleteObject(fileRef);
      }
      updatedBlogPageData.hero.image = "";
      setIsManualHeroUrl(false);
      await axios.put(`${serverUrl}/editBlogPage`, updatedBlogPageData);
      console.log("Image deleted successfully");
      setBlogPageData(updatedBlogPageData);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.put(`${serverUrl}/editBlogPage`, blogPageData);
      console.log("Blog page updated successfully");
      getBlogPage();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const addTag = () => {
    setBlogPageData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, ""],
    }));
  };

  const updateTag = (index, value) => {
    setBlogPageData((prevData) => {
      const newTags = [...prevData.tags];
      newTags[index] = value;
      return { ...prevData, tags: newTags };
    });
  };

  const removeTag = (index) => {
    setBlogPageData((prevData) => {
      const newTags = prevData.tags.filter((_, i) => i !== index);
      return { ...prevData, tags: newTags };
    });
  };

  const addCategory = () => {
    setBlogPageData((prevData) => ({
      ...prevData,
      category: [...prevData.category, ""],
    }));
  };

  const updateCategory = (index, value) => {
    setWarning(index);
    setBlogPageData((prevData) => {
      const newCategories = [...prevData.category];
      newCategories[index] = value;
      return { ...prevData, category: newCategories };
    });
  };

  const removeCategory = (index) => {
    setBlogPageData((prevData) => {
      const newCategories = prevData.category.filter((_, i) => i !== index);
      return { ...prevData, category: newCategories };
    });
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none relative">
      {isLoading && <Loader />}

      <AdminNav page="EDIT BLOG FRONT PAGE" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Blogs blogPageData={blogPageData} recentPosts={recentPosts} usedIn="admin" />
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
                  value={blogPageData.hero.tag}
                  onChange={(e) => handleHeroInputChange("tag", e)}
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={blogPageData.hero.heading}
                  onChange={(e) =>
                    handleHeroInputChange("heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={blogPageData.hero.description}
                  onChange={(e) =>
                    handleHeroInputChange("description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Hero Image"
                  type="image"
                  crossBtn={true}
                  value={blogPageData.hero.image}
                  handleDelete={handleDelete}
                  handleUpload={handleUpload}
                  onChange={(e) => handleManualUrlChange(e.target.value)}
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
              <p className="mb-[10px]">Categories</p>
              {hideCategory ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideCategory(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideCategory(true)}
                />
              )}
            </div>
            {!hideCategory && (
              <>
                {blogPageData.category.map((category, index) => (
                  <div key={index} className="flex flex-col mb-[10px]">
                    <AdminInput
                      crossBtn={true}
                      className="w-full"
                      type="edit"
                      value={category}
                      onClick={() => removeCategory(index)}
                      onChange={(e) => updateCategory(index, e)}
                      warningMsg="If you delete this, it will delete all blogs associated
                      with this category!"
                    />
                    {warning === index && (
                      <p className="text-[#ff3636] text-sm mt-[5px]">
                        Be careful! This category will be assigned to all
                        associated blogs.
                      </p>
                    )}
                  </div>
                ))}

                <div className="w-full flex flex-row justify-between">
                  <AdminBtn text="Add Category" onClick={addCategory} />
                  <AdminBtn text="Save" onClick={handleSubmit} />
                </div>
              </>
            )}
          </div>

          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Tags</p>
              {hideTags ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideTags(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideTags(true)}
                />
              )}
            </div>
            {!hideTags && (
              <>
                {blogPageData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center mb-[10px]">
                    <AdminInput
                      crossBtn={true}
                      className="w-full"
                      type="input"
                      value={tag}
                      onClick={() => removeTag(index)}
                      onChange={(e) => updateTag(index, e.target.value)}
                      warningMsg="Are you sure you want to delete this tag?"
                    />
                  </div>
                ))}

                <div className="w-full flex flex-row justify-between">
                  <AdminBtn text="Add Tag" onClick={addTag} />
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
