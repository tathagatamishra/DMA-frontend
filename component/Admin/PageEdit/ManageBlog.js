"use client";
import React, { useState, useEffect } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import AdminUpload from "../AdminUi/AdminUpload";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Loader from "@/component/UI/Loader";
import SingleBlog from "@/component/SingleBlog/SingleBlog";
import Parser from "../../UI/Parser";

export default function ManageBlog() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [blogPageData, setBlogPageData] = useState({
    category: [],
    tags: [],
  });
  const [newBlog, setNewBlog] = useState({
    hero: {
      heading: "",
      description: "",
      image: "",
    },
    coverimage: "",
    title: "",
    author: "",
    // summary:"",
    layout: [],
    tags: [],
    category: "",
    pdfdata: {
      heading: "Pdf",
      pdf: [],
    },
    faqdata: {
      heading: "Frequently Asked Questions",
      faq: [],
    },
    team: {
      name: "",
      title: "",
      quote: "",
      image: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      gmail: "",
      youtube: "",
    },
  });
  const [existingBlogs, setExistingBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [hideManage, setHideManage] = useState(true);
  const [hideExist, setHideExist] = useState(false);
  const [showPointsDropdown, setShowPointsDropdown] = useState(false);
  const [showPointsDropdownExist, setShowPointsDropdownExist] = useState(false);
  const [pointesShowIndex, setPointesShowIndex] = useState(null);
  const [popup, setPopup] = useState(false);

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

  const fetchBlogPageData = async () => {
    // setIsLoading(true);
    try {
      const { data } = await axios.get(`${serverUrl}/getBlogPage`);
      setBlogPageData(data.blogPageData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blog page data:", error);
      setIsLoading(false);
    }
  };

  const fetchExistingBlogs = async () => {
    // setIsLoading(true);
    try {
      const { data } = await axios.get(`${serverUrl}/getAllBlogs`);
      setExistingBlogs(data.blogs);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching existing blogs:", error);
      setIsLoading(false);
    }
  };

  const fetchSelectedBlog = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${serverUrl}/getBlog/${id}`);
      // console.log(data.blogData);
      setSelectedBlog(data.blogData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching existing blogs:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPageData();
    fetchExistingBlogs();
  }, []);

  useEffect(() => {
    fetchBlogPageData();
    fetchExistingBlogs();
  }, [selectedBlog]);

  const handleNewBlogChange = (field, value) => {
    setNewBlog((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleNewBlogUpdate = (field, value) => {
    setSelectedBlog((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHeroChange = (field, value) => {
    setNewBlog((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const handleNewTeam = (field, value) => {
    setNewBlog((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [field]: value,
      },
    }));
  };
  const handleChangeTeam = (field, value) => {
    setSelectedBlog((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [field]: value,
      },
    }));
  };
  const handleHeroUpdate = (field, value) => {
    setSelectedBlog((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

    // Add a helper function to safely handle points array
    const getPointsString = (points) => {
      if (!points) return "";
      if (Array.isArray(points)) return points.join("\n");
      if (typeof points === "string") return points;
      return "";
    };

  const handlePointTypeSelectExisting = (selectedType, index) => {
    setSelectedBlog((prev) => {
      const newLayout = [...prev.layout];
      newLayout.splice(index + 1, 0, {
        points: {
          type: selectedType,
          value: [],
        },
      });
      return {
        ...prev,
        layout: newLayout,
      };
    });
    setShowPointsDropdownExist(false);
  };

  const addLayoutItem = (type) => {
    setNewBlog((prev) => ({
      ...prev,
      layout: [...prev.layout, { [type]: type === "image" ? [] : "" }],
    }));
  };

  const updateLayoutItem = (index, type, value) => {
    setNewBlog((prev) => {
      const newLayout = [...prev.layout];
      newLayout[index] = { [type]: value };
      return { ...prev, layout: newLayout };
    });
  };

  const removeLayoutItem = (index) => {
    setNewBlog((prev) => ({
      ...prev,
      layout: prev.layout.filter((_, i) => i !== index),
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

  const handleImageUpload = async (file, field, index) => {
    setIsLoading(true);
    try {
      const fileName = generateRandomString(10) + "_" + file.name;
      const storageRef = ref(
        storage,
        `mainService/images/${Date.now()}_${fileName}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      if (field === "hero") {
        handleHeroChange("image", url);
        handleHeroUpdate("image", url);
      } else if (field === "coverimage") {
        handleNewBlogChange("coverimage", url);
        handleNewBlogUpdate("coverimage", url);
      } else if (field === "layout") {
        updateLayoutItem(index, "image", url);
        handleEditLayoutChange(index, "image", url);

        // const index = newMainService.layout.findIndex(
        //   (item) => Object.keys(item)[0] === "image"
        // );
        // if (index !== -1) {
        //   updateLayoutItem(index, "image", [
        //     ...newMainService.layout[index].image,
        //     url,
        //   ]);
        // }
      } else if (field === "team") {
        handleChangeTeam("image", url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  const handlePdfUpload = async (event, index) => {
    setIsLoading(true);
    try {
      const file = event.target.files[0];

      if (!file) {
        console.error("No file selected");
        return;
      }

      console.log("File being uploaded:", file.name);

      const fileName = generateRandomString(10) + "_" + file.name;
      const storageRef = ref(storage, `pdfs/${fileName}`);

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Update both states simultaneously
      setSelectedBlog((prev) => {
        const updatedPdfList = [...(prev.pdfdata?.pdf || [])];
        if (index !== null) {
          updatedPdfList[index] = url;
        } else {
          updatedPdfList.push(url);
        }
        return {
          ...prev,
          pdfdata: {
            ...prev.pdfdata,
            heading: prev.pdfdata?.heading || "PDF",
            pdf: updatedPdfList,
          },
        };
      });

      // Update newMainService state as well
      setNewBlog((prev) => {
        const updatedPdfList = [...(prev.pdfdata?.pdf || [])];
        if (index !== null) {
          updatedPdfList[index] = url;
        } else {
          updatedPdfList.push(url);
        }
        return {
          ...prev,
          pdfdata: {
            ...prev.pdfdata,
            heading: prev.pdfdata?.heading || "PDF",
            pdf: updatedPdfList,
          },
        };
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
    setIsLoading(false);
  };

  // Update heading change handler to modify both states
  const handleHeadingChange = (value) => {
    // Update serviceData state
    setSelectedBlog((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        heading: value,
      },
    }));

    // Update newMainService state
    setNewBlog((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        heading: value,
      },
    }));
  };

  const addPdfItem = () => {
    setSelectedBlog((prev) => ({
      ...prev,
      pdfdata: {
        ...prev?.pdfdata,
        heading: prev?.pdfdata?.heading || "PDF",
        pdf: [...(prev?.pdfdata?.pdf || []), ""],
      },
    }));

    setNewBlog((prev) => ({
      ...prev,
      pdfdata: {
        ...prev?.pdfdata,
        heading: prev?.pdfdata?.heading || "PDF",
        pdf: [...(prev?.pdfdata?.pdf || []), ""],
      },
    }));
  };

  const removePdfItem = (index) => {
    setSelectedBlog((prev) => ({
      ...prev,
      pdfdata: {
        ...prev?.pdfdata,
        pdf: prev?.pdfdata?.pdf?.filter((_, i) => i !== index) || [],
      },
    }));

    setNewBlog((prev) => ({
      ...prev,
      pdfdata: {
        ...prev?.pdfdata,
        pdf: prev?.pdfdata?.pdf?.filter((_, i) => i !== index) || [],
      },
    }));
  };

  const handleSubmitNewBlog = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${serverUrl}/addBlog`, newBlog);
      console.log("New blog created successfully");
      setNewBlog({
        hero: { heading: "", description: "", image: "" },
        coverimage: "",
        title: "",
        author: "",
        // summary:"",
        layout: [],
        tags: [],
        category: "",
        pdfdata: {
          heading: "Pdf",
          pdf: [],
        },
        faqdata: {
          heading: "Frequently Asked Questions",
          faq: [],
        },
        team: {
          name: "",
          title: "",
          quote: "",
          image: "",
          whatsapp: "",
          facebook: "",
          instagram: "",
          linkedin: "",
          gmail: "",
          youtube: "",
        },
      });
      fetchExistingBlogs();
    } catch (error) {
      console.error("Error creating new blog:", error);
    }
    setIsLoading(false);
  };

  const handleEditBlog = async () => {
    if (!selectedBlog) return;
    setIsLoading(true);
    try {
      // console.log('Before sending:', selectedBlog);
      const response = await axios.put(
        `${serverUrl}/editBlog/${selectedBlog._id}`,
        selectedBlog
      );
      // console.log('Response:', response.data);
      console.log("Blog updated successfully");
      fetchExistingBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
    setIsLoading(false);
  };
  // console.log("existing",selectedBlog)
  const handleDeleteBlog = async () => {
    if (!selectedBlog) return;
    setIsLoading(true);
    try {
      await axios.delete(`${serverUrl}/deleteBlog/${selectedBlog._id}`);
      console.log("Blog deleted successfully");
      setSelectedBlog(null);
      fetchExistingBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setIsLoading(false);
  };

  const handleEditHeroChange = (field, value) => {
    setSelectedBlog((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value.target ? value.target.value : value,
      },
    }));
  };

  const handleEditBlogChange = (field, value) => {
    setSelectedBlog((prev) => ({
      ...prev,
      [field]: value.target ? value.target.value : value,
    }));
  };

  const handleEditLayoutChange = (index, type, value) => {
    setSelectedBlog((prev) => {
      const newLayout = [...prev.layout];
      newLayout[index] = { [type]: value };
      return { ...prev, layout: newLayout };
    });
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none relative">
      {isLoading && <Loader />}

      <AdminNav page="MANAGE BLOGS" />

      <div className="AdminContainer">
        {windowWidth > 800 && !hideManage && hideExist && (
          <div className="AdminPreview">
            <SingleBlog blogData={newBlog} usedIn="admin" />
          </div>
        )}
        {windowWidth > 800 && !hideExist && hideManage && (
          <div className="AdminPreview">
            <SingleBlog blogData={selectedBlog} usedIn="admin" />
          </div>
        )}

        <div className="AdminForm">
          {/* create blog */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Create New Blog</p>
              {hideManage ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => {
                    setHideManage(false);
                    setHideExist(true);
                  }}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideManage(true)}
                />
              )}
            </div>

            {!hideManage && (
              <>
                <div className="mt-4">
                  {/* <h3 className="font-bold mb-2">Hero</h3>
                  <AdminInput
                    label="Heading"
                    type="edit"
                    value={newBlog.hero.heading}
                    onChange={(e) => handleHeroChange("heading", e)}
                  /> */}
                  {/* <AdminInput
                    label="Description"
                    type="edit"
                    value={newBlog.hero.description}
                    onChange={(e) => handleHeroChange("description", e)}
                  /> */}
                  {/* <AdminUpload
                    label="Hero Image"
                    type="image"
                    value={newBlog.hero.image}
                    onChange={(e) => handleHeroChange("image", e.target.value)}
                    handleUpload={(e) =>
                      handleImageUpload(e.target.files[0], "hero")
                    }
                  /> */}
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">Info</h3>
                  <AdminInput
                    label="Title"
                    type="edit"
                    value={newBlog.title}
                    onChange={(e) => handleNewBlogChange("title", e)}
                  />
                  <AdminInput
                    label="Author"
                    type="edit"
                    value={newBlog.author}
                    onChange={(e) => handleNewBlogChange("author", e)}
                  />
                  {/* <AdminInput
                    label="summary"
                    type="edit"
                    value={newBlog.summary}
                    onChange={(e) =>
                      handleNewBlogChange("summary", e)
                    }
                  /> */}
                  <AdminUpload
                    label="Cover Image"
                    type="image"
                    value={newBlog.coverimage}
                    onChange={(e) =>
                      handleNewBlogUpdate("coverimage", e.target.value)
                    }
                    handleUpload={(e) =>
                      handleImageUpload(e.target.files[0], "coverimage")
                    }
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">Category</h3>
                  <select
                    className="AdminInput"
                    value={newBlog.category}
                    onChange={(e) =>
                      handleNewBlogChange("category", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {blogPageData.category.map((cat, index) => (
                      <option key={index} value={cat}>
                        {Parser(cat)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">Tags</h3>
                  {blogPageData.tags.map((tag, index) => (
                    <label
                      key={index}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={newBlog.tags.includes(tag)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleNewBlogChange("tags", [...newBlog.tags, tag]);
                          } else {
                            handleNewBlogChange(
                              "tags",
                              newBlog.tags.filter((t) => t !== tag)
                            );
                          }
                        }}
                      />
                      <span className="ml-2">{tag}</span>
                    </label>
                  ))}
                  <AdminInput
                    label="New Tag"
                    type="input"
                    placeholder="Add a new tag"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleNewBlogChange("tags", [
                          ...newBlog.tags,
                          e.target.value,
                        ]);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>

                <h3 className="font-bold mt-4 mb-2">Layout</h3>
                {newBlog.layout.map((item, index) => (
                  <div key={index} className="mb-4">
                    {Object.keys(item)[0] === "subtitle" && (
                      <AdminInput
                        type="textarea"
                        label="SubTitle"
                        value={item.subtitle}
                        onChange={(e) =>
                          updateLayoutItem(index, "subtitle", e.target.value)
                        }
                      />
                    )}
                    {Object.keys(item)[0] === "story" && (
                      <AdminInput
                        type="textarea"
                        label="Story"
                        value={item.story}
                        onChange={(e) =>
                          updateLayoutItem(index, "story", e.target.value)
                        }
                      />
                    )}
                    {Object.keys(item)[0] === "note" && (
                      <AdminInput
                        type="textarea"
                        label="Note"
                        value={item.note}
                        onChange={(e) =>
                          updateLayoutItem(index, "note", e.target.value)
                        }
                      />
                    )}
                    {Object.keys(item)[0] === "image" && (
                      <AdminUpload
                        label="Image"
                        type="image"
                        value={item.image}
                        onChange={(e) =>
                          updateLayoutItem(index, "image", e.target.value)
                        }
                        handleUpload={(e) =>
                          handleImageUpload(e.target.files[0], "layout", index)
                        }
                      />
                    )}
                    {Object.keys(item)[0] === "also" && (
                      <select
                        className="AdminInput"
                        value={item.also.id}
                        onChange={(e) =>
                          updateLayoutItem(index, "also", {
                            id: e.target.value,
                            title: existingBlogs.find(
                              (blog) => blog._id === e.target.value
                            )?.title,
                          })
                        }
                      >
                        <option value="">Select Related Blog</option>
                        {existingBlogs.map((blog) => (
                          <option key={blog._id} value={blog._id}>
                            {Parser(blog.title)}
                          </option>
                        ))}
                      </select>
                    )}
                    <AdminBtn
                      btnColor="red"
                      text="Remove"
                      onClick={() => removeLayoutItem(index)}
                    />
                  </div>
                ))}

                <div className="flex flex-wrap gap-[10px] border-t-2 pt-[20px]">
                  <AdminBtn
                    text="Add SubTitle"
                    onClick={() => addLayoutItem("subtitle")}
                  />
                  <AdminBtn
                    text="Add Story"
                    onClick={() => addLayoutItem("story")}
                  />
                  <AdminBtn
                    text="Add Note"
                    onClick={() => addLayoutItem("note")}
                  />
                  <AdminBtn
                    text="Add Image"
                    onClick={() => addLayoutItem("image")}
                  />
                  <AdminBtn
                    text="Add Also"
                    onClick={() => addLayoutItem("also")}
                  />
                </div>
                <hr className="mt-4 bg-black h-[2px]" />
                <div className="mt-8">
                  <h3 className="font-bold text-[20px] mb-2">Profile Card</h3>
                  <AdminInput
                    label="Name"
                    type="input"
                    value={newBlog.team.name}
                    onChange={(e) => handleNewTeam("name", e.target.value)}
                  />
                  <AdminInput
                    label="Title"
                    type="input"
                    value={newBlog.team.title}
                    onChange={(e) => handleNewTeam("title", e.target.value)}
                  />
                  <AdminInput
                    label="Quote"
                    type="textarea"
                    value={newBlog.team.quote}
                    onChange={(e) => handleNewTeam("quote", e.target.value)}
                  />
                  <AdminUpload
                    label="Hero Image"
                    type="image"
                    value={newBlog.team.image}
                    onChange={(e) => handleNewTeam("image", e.target.value)}
                    handleUpload={(e) =>
                      handleImageUpload(e.target.files[0], "team")
                    }
                  />
                  <AdminInput
                    label="Whatsapp"
                    type="input"
                    value={newBlog.team.whatsapp}
                    onChange={(e) => handleNewTeam("whatsapp", e.target.value)}
                  />
                  <AdminInput
                    label="Facebook"
                    type="input"
                    value={newBlog.team.facebook}
                    onChange={(e) => handleNewTeam("facebook", e.target.value)}
                  />
                  <AdminInput
                    label="Instagram"
                    type="input"
                    value={newBlog.team.instagram}
                    onChange={(e) => handleNewTeam("instagram", e.target.value)}
                  />
                  <AdminInput
                    label="Linkedin"
                    type="input"
                    value={newBlog.team.linkedin}
                    onChange={(e) => handleNewTeam("linkedin", e.target.value)}
                  />
                  <AdminInput
                    label="Gmail"
                    type="input"
                    value={newBlog.team.gmail}
                    onChange={(e) => handleNewTeam("gmail", e.target.value)}
                  />
                  <AdminInput
                    label="Youtube"
                    type="input"
                    value={newBlog.team.youtube}
                    onChange={(e) => handleNewTeam("youtube", e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="font-bold mt-4 mb-2">
                    Frequently Asked Questions
                  </h3>
                  {newBlog.faqdata &&
                    newBlog.faqdata.faq.map((faq, index) => (
                      <div key={index} className="mb-4">
                        <AdminInput
                          type="input"
                          label="Question"
                          value={faq[0]}
                          onChange={(e) => {
                            const newFaq = [...newBlog.faqdata.faq];
                            newFaq[index][0] = e.target.value;
                            setNewBlog((prev) => ({
                              ...prev,
                              faqdata: { ...prev.faqdata, faq: newFaq },
                            }));
                          }}
                        />
                        <AdminInput
                          type="input"
                          label="Answer"
                          value={faq[1]}
                          onChange={(e) => {
                            const newFaq = [...newBlog.faqdata.faq];
                            newFaq[index][1] = e.target.value;
                            setNewBlog((prev) => ({
                              ...prev,
                              faqdata: { ...prev.faqdata, faq: newFaq },
                            }));
                          }}
                        />

                        <div className="flex gap-x-4">
                          {index !== newBlog.faqdata.faq.length - 1 && (
                            <AdminBtn
                              btnColor="green"
                              text="Add FAQ"
                              onClick={() => {
                                const newFaq = [...newBlog.faqdata.faq];
                                newFaq.splice(index + 1, 0, ["", ""]);
                                setNewBlog((prev) => ({
                                  ...prev,
                                  faqdata: { ...prev.faqdata, faq: newFaq },
                                }));
                              }}
                            />
                          )}

                          <AdminBtn
                            btnColor="red"
                            text="Remove"
                            onClick={() => {
                              const newFaq = newBlog.faqdata.faq.filter(
                                (_, i) => i !== index
                              );
                              setNewBlog((prev) => ({
                                ...prev,
                                faqdata: { ...prev.faqdata, faq: newFaq },
                              }));
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  <AdminBtn
                    text="Add FAQ"
                    onClick={() =>
                      setNewBlog((prev) => ({
                        ...prev,
                        faqdata: {
                          ...prev.faqdata,
                          faq: [...prev.faqdata.faq, ["", ""]],
                        },
                      }))
                    }
                  />
                </div>
                <div className="mt-4">
                  <AdminInput
                    label="PDF Section Heading"
                    type="text"
                    value={newBlog?.pdfdata?.heading || "PDF"}
                    onChange={(e) => handleHeadingChange(e.target.value)}
                    className="mb-4"
                  />
                  {newBlog?.pdfdata?.pdf?.map((pdf, index) => (
                    <div key={index} className="mb-4">
                      <AdminUpload
                        label="PDF"
                        type="pdf"
                        value={pdf} // Display the URL
                        handleUpload={(event) => handlePdfUpload(event, index)}
                        onChange={(e) => {
                          setNewBlog((prev) => {
                            const newPdf = [...prev.pdfdata.pdf];
                            newPdf[index][field === "pdf" ? 0 : 1] = e; // Update based on the field
                            return {
                              ...prev,
                              pdfdata: {
                                ...prev.pdfdata,
                                pdf: newPdf,
                              },
                            };
                          });
                        }}
                      />

                      <AdminBtn
                        btnColor="red"
                        text="Remove"
                        onClick={() => removePdfItem(index)}
                      />
                    </div>
                  ))}

                  <AdminBtn text="Add PDF" onClick={addPdfItem} />
                </div>

                <AdminBtn
                  text="Create Blog"
                  className="mt-4"
                  onClick={handleSubmitNewBlog}
                />
              </>
            )}
          </div>

          {/* edit blog */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Manage Existing Blogs</p>
              {hideExist ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => {
                    setHideExist(false);
                    setHideManage(true);
                  }}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideExist(true)}
                />
              )}
            </div>

            {!hideExist && (
              <>
                <h3 className="font-bold mt-4 mb-2">Select a blog to edit</h3>
                <select
                  className="AdminInput"
                  value={selectedBlog ? selectedBlog._id : ""}
                  onChange={(e) => {
                    setHideManage(true);
                    fetchSelectedBlog(e.target.value);
                  }}
                >
                  <option value="">Click to Select a blog to edit</option>
                  {existingBlogs.map((blog) => (
                    <option key={blog._id} value={blog._id}>
                      {Parser(blog.title)}
                    </option>
                  ))}
                </select>

                {selectedBlog && (
                  <>
                    {/* <h3 className="font-bold mt-4 mb-2">Hero</h3> */}
                    {selectedBlog.hero && (
                      <>
                        {/* <AdminInput
                          type="edit"
                          label="Heading"
                          value={selectedBlog.hero.heading}
                          onChange={(value) =>
                            handleEditHeroChange("heading", value)
                          }
                        /> */}
                        {/* <AdminInput
                          type="edit"
                          label="Description"
                          value={selectedBlog.hero.description}
                          onChange={(value) =>
                            handleEditHeroChange("description", value)
                          }
                        /> */}
                        {/* <AdminUpload
                          label="Hero Image"
                          type="image"
                          value={selectedBlog.hero.image}
                          onChange={(value) =>
                            handleEditHeroChange("image", value)
                          }
                          handleUpload={(e) =>
                            handleImageUpload(e.target.files[0], "hero")
                          }
                        /> */}
                      </>
                    )}

                    <h3 className="font-bold mt-4 mb-2">Info</h3>
                    <AdminInput
                      label="Title"
                      type="edit"
                      value={selectedBlog.title}
                      onChange={(value) => handleEditBlogChange("title", value)}
                    />
                    <AdminInput
                      label="Author"
                      type="edit"
                      value={selectedBlog.author}
                      onChange={(value) =>
                        handleEditBlogChange("author", value)
                      }
                    />
                    {/* <AdminInput
                      label="summary"
                      type="edit"
                      value={selectedBlog.summary}
                      onChange={(value) =>
                        handleEditBlogChange("summary", value)
                      }
                    /> */}
                    <AdminUpload
                      label="Cover Image"
                      type="image"
                      value={selectedBlog.coverimage}
                      onChange={(value) =>
                        handleEditBlogChange("coverimage", value)
                      }
                      handleUpload={(e) =>
                        handleImageUpload(e.target.files[0], "coverimage")
                      }
                    />

                    <h3 className="font-bold mt-4 mb-2">Select Category</h3>
                    <select
                      className="AdminInput"
                      value={selectedBlog.category}
                      onChange={(e) =>
                        handleEditBlogChange("category", e.target.value)
                      }
                    >
                      <option value="">Select Category</option>
                      {blogPageData.category.map((cat, index) => (
                        <option key={index} value={cat}>
                          {Parser(cat)}
                        </option>
                      ))}
                    </select>

                    <div className="mt-4">
                      <h3 className="font-bold mb-2">Tags</h3>
                      {blogPageData.tags.map((tag, index) => (
                        <label
                          key={index}
                          className="inline-flex items-center mr-4"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={selectedBlog.tags.includes(tag)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleEditBlogChange("tags", [
                                  ...selectedBlog.tags,
                                  tag,
                                ]);
                              } else {
                                handleEditBlogChange(
                                  "tags",
                                  selectedBlog.tags.filter((t) => t !== tag)
                                );
                              }
                            }}
                          />
                          <span className="ml-2">{tag}</span>
                        </label>
                      ))}
                    </div>

                    <h3 className="font-bold mt-4 mb-2">Layout</h3>
                    {selectedBlog?.layout?.map((item, index) => (
                      <div key={index} className="mb-4 gap-[8px] flex flex-col">
                        {Object.keys(item)[0] === "subtitle" && (
                          <AdminInput
                            type="edit"
                            label="subTitle"
                            value={item.subtitle}
                            onChange={(e) =>
                              handleEditLayoutChange(index, "subtitle", e)
                            }
                          />
                        )}
                        {Object.keys(item)[0] === "story" && (
                          <AdminInput
                            type="edit"
                            label="description"
                            value={item.story}
                            onChange={(e) =>
                              handleEditLayoutChange(index, "story", e)
                            }
                          />
                        )}
                        {Object.keys(item)[0] === "note" && (
                          <AdminInput
                            type="edit"
                            label="summary"
                            value={item.note}
                            onChange={(e) =>
                              handleEditLayoutChange(index, "note", e)
                            }
                          />
                        )}
                        {Object.keys(item)[0] === "points" && (
                          <div>
                            {item.points.type && (
                              <p className="text-sm text-gray-600 mb-2">
                                Type: {item.points.type}
                              </p>
                            )}
                            <AdminInput
                              type="edit"
                              label="Points (one per line)"
                              value={getPointsString(item.points?.type ? item.points?.value : item?.points)}
                              onChange={(e) => {
                                const newLayout = [...selectedBlog.layout];
                                newLayout[index] = {
                                  points: {
                                    type: item.points.type, // Preserve the existing type
                                    value: e
                                      .split("\n")
                                      .filter((point) => point.trim()), // Update only the value array
                                  },
                                };
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />
                          </div>
                        )}
                        {Object.keys(item)[0] === "image" && (
                          <AdminUpload
                            label="Image"
                            type="image"
                            value={item.image}
                            onChange={(e) =>
                              handleEditLayoutChange(
                                index,
                                "image",
                                e.target.value
                              )
                            }
                            handleUpload={(e) => {
                              console.log("uploading");

                              handleImageUpload(
                                e.target.files[0],
                                "layout",
                                index
                              );
                            }}
                          />
                        )}

                        {Object.keys(item)[0] === "also" && (
                          <select
                            className="AdminInput"
                            value={item.also.id}
                            onChange={(e) =>
                              handleEditLayoutChange(index, "also", {
                                id: e.target.value,
                                title: existingBlogs.find(
                                  (blog) => blog._id === e.target.value
                                )?.title,
                              })
                            }
                          >
                            <option value="">Select Related Blog</option>
                            {existingBlogs.map((blog) => (
                              <option key={blog._id} value={blog._id}>
                                {Parser(blog.title)}
                              </option>
                            ))}
                          </select>
                        )}
                        <AdminBtn
                          btnColor="red"
                          text="Remove"
                          onClick={() => {
                            const newLayout = selectedBlog.layout.filter(
                              (_, i) => i !== index
                            );
                            handleEditBlogChange("layout", newLayout);
                          }}
                        />
                        {index !== selectedBlog.layout.length - 1 && (
                          <div className="flex flex-wrap gap-[10px] border-t-2 pt-[20px]">
                            <AdminBtn
                              text="Add SubTitle"
                              onClick={() => {
                                const newLayout = [...selectedBlog.layout];
                                newLayout.splice(index + 1, 0, {
                                  subtitle: "",
                                });
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />
                            <AdminBtn
                              text="Add Description"
                              onClick={() => {
                                const newLayout = [...selectedBlog.layout];
                                newLayout.splice(index + 1, 0, { story: "" });
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />
                            <AdminBtn
                              text="Add Summary"
                              onClick={() => {
                                const newLayout = [...selectedBlog.layout];
                                newLayout.splice(index + 1, 0, { note: "" });
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />

                            <AdminBtn
                              text="Add Image"
                              onClick={() => {
                                const newLayout = [...selectedBlog.layout];
                                newLayout.splice(index + 1, 0, { image: [] });
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />

                            {/* <AdminBtn
                              text="Add Points"
                              onClick={() => {
                                const newLayout = [...selectedBlog.layout];
                                newLayout.splice(index + 1, 0, { points: [] });
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            /> */}
                            <AdminBtn
                              text="Add Points"
                              onClick={() => {
                                setShowPointsDropdownExist(true);
                                setPointesShowIndex(index);
                              }}
                            />
                            {showPointsDropdownExist &&
                              pointesShowIndex === index && (
                                <div className="relative mb-4">
                                  <div className="absolute z-10 w-48 bg-white shadow-lg rounded-md border">
                                    <div
                                      className="p-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() =>
                                        handlePointTypeSelectExisting(
                                          "default",
                                          index
                                        )
                                      }
                                    >
                                      Default
                                    </div>
                                    <div
                                      className="p-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() =>
                                        handlePointTypeSelectExisting(
                                          "bullet",
                                          index
                                        )
                                      }
                                    >
                                      Bullet
                                    </div>
                                    <div
                                      className="p-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() =>
                                        handlePointTypeSelectExisting(
                                          "checkmark",
                                          index
                                        )
                                      }
                                    >
                                      Checkmark
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex flex-wrap gap-[10px] border-t-2 pt-[20px]">
                      <AdminBtn
                        text="Add SubTitle"
                        onClick={() =>
                          handleEditBlogChange("layout", [
                            ...selectedBlog.layout,
                            { subtitle: "" },
                          ])
                        }
                      />
                      {console.log("test", selectedBlog)}
                      <AdminBtn
                        text="Add Description"
                        onClick={() =>
                          handleEditBlogChange("layout", [
                            ...selectedBlog.layout,
                            { story: "" },
                          ])
                        }
                      />
                      <AdminBtn
                        text="Add Summary"
                        onClick={() =>
                          handleEditBlogChange("layout", [
                            ...selectedBlog.layout,
                            { note: "" },
                          ])
                        }
                      />
                      <AdminBtn
                        text="Add Image"
                        onClick={() =>
                          handleEditBlogChange("layout", [
                            ...selectedBlog.layout,
                            { image: [] },
                          ])
                        }
                      />
                      {/* <AdminBtn
                        text="Add Points"
                        onClick={() =>
                          handleEditBlogChange("layout", [
                            ...selectedBlog.layout,
                            { points: [] },
                          ])
                        }
                      /> */}
                      <AdminBtn
                        text="Add Also"
                        onClick={() =>
                          handleEditBlogChange("layout", [
                            ...selectedBlog.layout,
                            { also: { id: "", title: "" } },
                          ])
                        }
                      />

                      <AdminBtn
                        text="Add Points"
                        onClick={() => setShowPointsDropdownExist(true)}
                      />
                      {showPointsDropdownExist && (
                        <div className="relative mb-4">
                          <div className="absolute z-10 w-48 bg-white shadow-lg rounded-md border">
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handlePointTypeSelectExisting("default")
                              }
                            >
                              Default
                            </div>
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handlePointTypeSelectExisting("bullet")
                              }
                            >
                              Bullet
                            </div>
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handlePointTypeSelectExisting("checkmark")
                              }
                            >
                              Checkmark
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <hr className="mt-4 bg-black h-[2px]" />
                    <div className="mt-4">
                      <h3 className="font-bold text-[20px] mb-2">
                        Profile Card
                      </h3>
                      <AdminInput
                        label="Name"
                        type="input"
                        value={selectedBlog?.team?.name}
                        onChange={(e) =>
                          handleChangeTeam("name", e.target.value || "")
                        }
                      />
                      <AdminInput
                        label="Title"
                        type="input"
                        value={selectedBlog?.team?.title}
                        onChange={(e) =>
                          handleChangeTeam("title", e.target.value || "")
                        }
                      />
                      <AdminInput
                        label="Quote"
                        type="textarea"
                        value={selectedBlog?.team?.quote}
                        onChange={(e) =>
                          handleChangeTeam("quote", e.target.value || "")
                        }
                      />
                      <AdminUpload
                        label="Hero Image"
                        type="image"
                        value={selectedBlog?.team?.image}
                        onChange={(e) =>
                          handleChangeTeam("image", e.target.value || "")
                        }
                        handleUpload={(e) =>
                          handleImageUpload(e.target.files[0], "team")
                        }
                      />
                      <AdminInput
                        label="Whatsapp"
                        type="input"
                        value={selectedBlog?.team?.whatsapp}
                        onChange={(e) =>
                          handleChangeTeam("whatsapp", e.target.value || "")
                        }
                      />
                      <AdminInput
                        label="Facebook"
                        type="input"
                        value={selectedBlog?.team?.facebook}
                        onChange={(e) =>
                          handleChangeTeam("facebook", e.target.value || "")
                        }
                      />
                      <AdminInput
                        label="Instagram"
                        type="input"
                        value={selectedBlog?.team?.instagram}
                        onChange={(e) =>
                          handleChangeTeam("instagram", e.target.value || "")
                        }
                      />
                      <AdminInput
                        label="Linkedin"
                        type="input"
                        value={selectedBlog?.team?.linkedin}
                        onChange={(e) =>
                          handleChangeTeam("linkedin", e.target.value || "")
                        }
                      />
                      <AdminInput
                        label="Gmail"
                        type="input"
                        value={selectedBlog?.team?.gmail}
                        onChange={(e) =>
                          handleChangeTeam("gmail", e.target.value || "")
                        }
                      />
                      <AdminInput
                        label="Youtube"
                        type="input"
                        value={selectedBlog?.team?.youtube}
                        onChange={(e) =>
                          handleChangeTeam("youtube", e.target.value || "")
                        }
                      />
                    </div>

                    <div className="mt-2">
                      <h3 className="font-bold mt-2 mb-2">
                        Frequently Asked Questions
                      </h3>
                      {selectedBlog.faqdata &&
                        selectedBlog.faqdata.faq.map((faq, index) => (
                          <div key={index} className="mb-4">
                            <AdminInput
                              type="edit"
                              label="Question"
                              value={faq[0]}
                              onChange={(e) => {
                                const newFaq = [...selectedBlog.faqdata.faq];
                                newFaq[index][0] = e;
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  faqdata: { ...prev.faqdata, faq: newFaq },
                                }));
                              }}
                            />
                            <AdminInput
                              type="edit"
                              label="Answer"
                              value={faq[1]}
                              onChange={(e) => {
                                const newFaq = [...selectedBlog.faqdata.faq];
                                newFaq[index][1] = e;
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  faqdata: { ...prev.faqdata, faq: newFaq },
                                }));
                              }}
                            />

                            <div className="flex gap-x-4">
                              {index !==
                                selectedBlog.faqdata.faq.length - 1 && (
                                <AdminBtn
                                  btnColor="green"
                                  text="Add FAQ"
                                  onClick={() => {
                                    const newFaq = [
                                      ...selectedBlog.faqdata.faq,
                                    ];
                                    newFaq.splice(index + 1, 0, ["", ""]);
                                    setSelectedBlog((prev) => ({
                                      ...prev,
                                      faqdata: { ...prev.faqdata, faq: newFaq },
                                    }));
                                  }}
                                />
                              )}

                              <AdminBtn
                                btnColor="red"
                                text="Remove"
                                onClick={() => {
                                  const newFaq =
                                    selectedBlog.faqdata.faq.filter(
                                      (_, i) => i !== index
                                    );
                                  setSelectedBlog((prev) => ({
                                    ...prev,
                                    faqdata: { ...prev.faqdata, faq: newFaq },
                                  }));
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      <AdminBtn
                        text="Add FAQ"
                        onClick={() =>
                          setSelectedBlog((prev) => ({
                            ...prev,
                            faqdata: {
                              ...prev.faqdata,
                              faq: [...(prev?.faqdata?.faq || []), ["", ""]],
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="mt-4">
                      {/* Add input for heading */}
                      <AdminInput
                        label="PDF Section Heading"
                        type="text"
                        value={selectedBlog.pdfdata?.heading || "PDF"}
                        onChange={(e) => handleHeadingChange(e.target.value)}
                        className="mb-4"
                      />

                      {selectedBlog.pdfdata?.pdf &&
                        selectedBlog.pdfdata.pdf.map((pdf, index) => (
                          <div key={index} className="mb-4">
                            <AdminUpload
                              label="PDF"
                              type="pdf"
                              value={pdf}
                              handleUpload={(event) =>
                                handlePdfUpload(event, index)
                              }
                              onChange={(e) => {
                                const newPdf = [...selectedBlog.pdfdata.pdf];
                                newPdf[index] = e.target.value;
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  pdfdata: {
                                    ...prev.pdfdata,
                                    pdf: newPdf,
                                  },
                                }));
                              }}
                            />

                            {/* Remove Button */}
                            <AdminBtn
                              btnColor="red"
                              text="Remove"
                              onClick={() => {
                                const newPdf = selectedBlog.pdfdata.pdf.filter(
                                  (_, i) => i !== index
                                );
                                setSelectedBlog((prev) => ({
                                  ...prev,
                                  pdfdata: {
                                    ...prev.pdfdata,
                                    pdf: newPdf,
                                  },
                                }));
                              }}
                            />
                          </div>
                        ))}

                      {/* Add New PDF */}
                      <AdminBtn
                        text="Add PDF"
                        onClick={() =>
                          setSelectedBlog((prev) => ({
                            ...prev,
                            pdfdata: {
                              ...prev.pdfdata,
                              heading: prev.pdfdata?.heading || "PDF", // Preserve the heading
                              pdf: [...(prev.pdfdata?.pdf || []), ""],
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-[10px] mt-4 border-t-2 pt-[20px]">
                      <AdminBtn
                        width="100%"
                        className="w-full"
                        btnColor="green"
                        text="Update Blog"
                        onClick={handleEditBlog}
                      />
                      <AdminBtn
                        width="100%"
                        btnColor="red"
                        className="w-full"
                        text="Delete Blog"
                        onClick={() => setPopup(true)}
                      />
                    </div>

                    {popup && (
                      <div className="w-full h-fit flex flex-col gap-[10px] mt-[10px] bg-white rounded-[15px]">
                        <p className="text-[#ff3636] pl-[2px]">
                          Are you sure you want to delete this?
                        </p>
                        <div className="flex gap-[10px]">
                          <AdminBtn
                            text="Cancel"
                            onClick={() => setPopup(false)}
                          />
                          <AdminBtn
                            text="Delete"
                            btnColor="#f6dbdb"
                            onClick={handleDeleteBlog}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
